self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  if (url.pathname.startsWith("/api/")) {
    event.respondWith(
      caches.open("shopply-pwa-api-cache").then((cache) => {
        return fetch(event.request)
          .then((response) => {
            if (response.status === 200) {
              cache.put(event.request, response.clone());
            }
            return response;
          })
          .catch(() => {
            return cache.match(event.request).then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse;
              }
              return new Response(JSON.stringify({ error: "Brak danych w cache" }), {
                status: 503,
                headers: { "Content-Type": "application/json" },
              });
            });
          });
      })
    );
  } else {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) return response;
        return fetch(event.request);
      })
    );
  }
});

self.addEventListener("activate", (event) => {
  console.log("[SW] Activate event");
  const cacheWhitelist = ["shopply-pwa-api-cache"];
  
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            console.log(`[SW] Deleting cache: ${cacheName}`);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener("push", (event) => {
  console.log("[SW] Push event");
  const data = event.data?.json() || {};
  const title = data.title || "Nowa informacja!";
  const options = {
    body: data.body || "Otrzymałeś wiadomość.",
    icon: "/icon192x192.png",
    badge: "/badge.png",
    tag: data.tag || "general",
    actions: data.actions || [],
    data: data.data || {},
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

