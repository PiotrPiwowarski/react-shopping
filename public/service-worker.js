self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/api/items/") || event.request.url.includes("/api/users/")) {
    event.respondWith(
      caches.open("shopply-pwa-api-cache").then((cache) =>
        fetch(event.request)
          .then((response) => {
            cache.put(event.request, response.clone());
            return response;
          })
          .catch(() => {
            return cache.match(event.request);
          })
      )
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
