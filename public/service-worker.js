const STATIC_CACHE = "static-cache-v1";
const DYNAMIC_CACHE = "dynamic-cache-v1";

const STATIC_FILES = [
  "/",                       // Strona główna
  "/index.html",    // Główne CSS
  "/icon192x192.png",        // Ikona PWA
  "/icon512x512.png",        // Ikona PWA
];

// Instalacja Service Workera
self.addEventListener("install", (event) => {
  console.log("[SW] Install event");
  event.waitUntil(
    caches.open(STATIC_CACHE).then((cache) => {
      return cache.addAll(STATIC_FILES).catch((error) => {
        console.error("[SW] Error caching static files:", error);
      });
    })
  );
});

// Aktywacja Service Workera
self.addEventListener("activate", (event) => {
  console.log("[SW] Activate event");
  const cacheWhitelist = [STATIC_CACHE, DYNAMIC_CACHE];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log(`[SW] Deleting old cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Obsługa żądań (Fetch)
self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.pathname.startsWith("/api/")) {
    // Obsługa API: Pobieranie z internetu, a w przypadku braku sieci — cache
    event.respondWith(
      caches.open(DYNAMIC_CACHE).then((cache) => {
        return fetch(event.request)
          .then((response) => {
            if (response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          })
          .catch(() => {
            console.warn("[SW] No internet, serving from cache");
            return cache.match(event.request).then((cachedResponse) => {
              if (cachedResponse) return cachedResponse;
              return new Response(JSON.stringify({ error: "Brak danych w cache" }), {
                status: 503,
                headers: { "Content-Type": "application/json" },
              });
            });
          });
      })
    );
  } else {
    // Obsługa statycznych plików: Cache First
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        return cachedResponse || fetch(event.request).catch(() => {
          console.warn("[SW] No internet and no cache match");
        });
      })
    );
  }
});


