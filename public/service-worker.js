// public/service-worker.js

const CACHE_NAME = 'my-cache-v1';
const CACHE_URLS = [
  '/',                          // Strona główna
  '/index.html',                 // HTML aplikacji
  '/static/js/main.js',          // JavaScript - może zawierać hasz w nazwie pliku po kompilacji
  '/static/css/main.css',
  '/icon192x192.png',
  '/icon512x512.png'               // Strona offline, którą będziemy wyświetlać, gdy nie ma połączenia
];

self.addEventListener('install', (event) => {
  // Cache'owanie zasobów przy instalacji service workera
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_URLS); // Cache'owanie plików z CACHE_URLS
    })
  );
});

// Obsługa żądań 'fetch' – próba pobrania z sieci lub z cache, jeśli sieć jest niedostępna
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)  // Najpierw próbujemy pobrać z sieci
      .then((response) => {
        // Jeśli jest odpowiedź i zapytanie jest do API, zapisujemy odpowiedź w cache
        if (event.request.url.includes('/api/')) {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clonedResponse); // Zapisz odpowiedź w cache
          });
        }
        return response; // Zwracamy odpowiedź z sieci
      })
      .catch((error) => {
        console.log('Brak połączenia z siecią, próba pobrania danych z cache:', error);
        // Jeśli wystąpi błąd (np. brak internetu), próbujemy pobrać z cache
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse; // Jeśli zasób jest w cache, zwróć go
          }
          // W przypadku braku zasobu w cache, zwróć stronę offline
          return caches.match('/offline.html');
        });
      })
  );
});

// Usuwanie starych cache'ów przy aktywacji nowego service workera
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          // Usuwamy stare cache'y, które nie są w cacheWhitelist
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
