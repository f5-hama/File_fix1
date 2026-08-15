const CACHE_NAME = 'subedit-pwa-v9';

const urlsToCache = [
    './',
    './index.html',
    './fonts.css',
    './KurdForest.ttf'
];

// پاشەکەوتکردنی فایلەکان لە کاتی دامەزراندندا
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return Promise.allSettled(
                urlsToCache.map((url) => cache.add(url))
            );
        })
    );
    self.skipWaiting(); 
});

// سڕینەوەی کاشە کۆنەکان بۆ ئەوەی کۆدە نوێیەکان دەستبەجێ کاربکەن
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        return caches.delete(cacheName); 
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// وەڵامدانەوەی داواکارییەکان بەبێ ئینتەرنێت و بە ئۆنلاین
self.addEventListener('fetch', (event) => {
    // تەنها داواکارییە ئاساییەکانی HTTP/HTTPS وەردەگرێت و لە دروستبوونی کێشە لەگەڵ ڤیدیۆ دەپارێزێت
    if (event.request.method !== 'GET' || !event.request.url.startsWith('http')) return;

    event.respondWith(
        caches.match(event.request).then((cachedResponse) => {
            if (cachedResponse) {
                // نوێکردنەوەی کاش لە پاشبنەما بە سەلامەتی
                fetch(event.request).then((networkResponse) => {
                    if (networkResponse && networkResponse.status === 200) {
                        const responseClone = networkResponse.clone();
                        caches.open(CACHE_NAME).then((cache) => cache.put(event.request, responseClone));
                    }
                }).catch(() => {});
                return cachedResponse;
            }

            return fetch(event.request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200) {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            }).catch(() => {
                if (event.request.mode === 'navigate') {
                    return caches.match('./index.html') || caches.match('./');
                }
            });
        })
    );
});
