/*

const CACHE_NAME = 'my-cache-v1';
const CACHE_URLS = [
  '/',
  '/index.html',
  '/static/js/main.js',
  '/static/css/main.css',
  '/icon192x192.png',
  '/icon512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(CACHE_URLS);
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        if (event.request.url.includes('/api/')) {
          const clonedResponse = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, clonedResponse);
          });
        }
        return response;
      })
      .catch((error) => {
        console.log('Brak połączenia z siecią, próba pobrania danych z cache:', error);
        return caches.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            return cachedResponse;
          }
          return caches.match('/offline.html');
        });
      })
  );
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

*/

self.addEventListener("install", (event) => {
    console.log("[SW] Install event");
    event.waitUntil(
      caches
        .open("shopply-pwa-cache")
        .then((cache) =>
          cache.addAll(["/", "/index.html", "/icon192x192.png", "//icon512x512.png", "/static/js/main.js", "/static/css/main.css", "/manifest.json"])
        )
    );
  });
  
  self.addEventListener("activate", (event) => {
    console.log("[SW] Activate event");
    event.waitUntil(self.clients.claim());
  });
  
  self.addEventListener("fetch", (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) return response;
        return fetch(event.request);
      })
    );
  });
  
  self.addEventListener("push", (event) => {
    console.log("[SW] Push event");
    const data = event.data?.json() || {};
    const title = data.title || "Nowa informacja!";
    const options = {
      body: data.body || "Otrzymałeś wiadomość.",
      icon: "/icon192x192.png",
    };
  
    event.waitUntil(self.registration.showNotification(title, options));
  });
