const PRECACHE = 'precache-v1';
const RUNTIME = 'runtime';

// Lista zasobów, które zawsze mają być cachowane
const PRECACHE_URLS = [
  'index.html',
  './', // Alias dla index.html
  'styles.css',
  '../../styles/main.css',
  'demo.js'
];

// Lista URL API, które mają być cachowane
const API_CACHE_URLS = [
  'api-items', // API z produktami
  'api-users'  // API z użytkownikami
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(PRECACHE)
      .then(cache => cache.addAll(PRECACHE_URLS))
      .then(self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', event => {
  // Sprawdzenie, czy zapytanie dotyczy zasobów statycznych
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        // Zapytania do API
        if (event.request.url.includes('api')) {
          return caches.open(RUNTIME).then(cache => {
            return fetch(event.request).then(response => {
              if (response.ok) {
                // Zapisz odpowiedź z API do cache
                cache.put(event.request, response.clone());
              }
              return response;
            }).catch(() => {
              // W przypadku braku internetu, zwróć dane z cache (jeśli istnieją)
              return caches.match(event.request).then(cachedResponse => {
                if (cachedResponse) {
                  return cachedResponse;
                }
                return new Response('Brak danych w pamięci podręcznej', { status: 503 });
              });
            });
          });
        }

        // Inne zasoby (np. pliki statyczne)
        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            cache.put(event.request, response.clone());
            return response;
          });
        });
      })
    );
  }
});

