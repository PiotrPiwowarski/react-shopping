let cacheData = 'appV1';

this.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheData).then(cache => {
            cache.addAll([
                '/static/js/main.chunk.js',
                '/static/js/0.chunk.js',
                '/static/js/bundle.js',
                'index.html',
                '/',
                '/static/css/main.chunk.css', 
                '/display-items'
            ]);
        }).catch(error => {
            console.error('Failed to cache resources during install', error);
        })
    );
});

this.addEventListener('fetch', event => {
    if (event.request.method === 'POST') {
        // Pomijamy cache'owanie dla POST
        event.respondWith(fetch(event.request));
    } else if (event.request.url.includes('/api/')) {
        event.respondWith(
            caches.match(event.request).then(resp => {
                return resp || fetch(event.request).then(networkResp => {
                    return caches.open(cacheData).then(cache => {
                        cache.put(event.request, networkResp.clone());
                        return networkResp;
                    });
                });
            }).catch(() => {
                return new Response('Offline: API data unavailable', {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: { 'Content-Type': 'text/plain' }
                });
            })
        );
    } else {
        event.respondWith(
            caches.match(event.request).then(resp => {
                return resp || fetch(event.request).catch(() => {
                    if (event.request.mode === 'navigate') {
                        return caches.match('index.html');
                    }
                    return new Response('Offline: Resource unavailable', {
                        status: 503,
                        statusText: 'Service Unavailable',
                        headers: { 'Content-Type': 'text/plain' }
                    });
                });
            })
        );
    }
});

this.addEventListener('activate', event => {
    const cacheWhitelist = [cacheData];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});


