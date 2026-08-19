const CACHE_NAME = 'subedit-v2.3';

// دۆزینەوەی خۆکاری ناوی بوخچەی GitHub Pages
const GH_PATH = self.location.pathname.replace(/\/sw\.js$/, '');

const ASSETS_TO_CACHE = [
    GH_PATH + '/',
    GH_PATH + '/index.html',
    GH_PATH + '/fonts.css',
    GH_PATH + '/KurdForest.ttf'
];

// 1. Install Event - پاشەکەوتکردنی پارێزراو
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then(async (cache) => {
            for (const asset of ASSETS_TO_CACHE) {
                try {
                    await cache.add(asset);
                } catch (err) {
                    console.warn('نەتوانرا فایل پاشەکەوت بکرێت:', asset);
                }
            }
        })
    );
    self.skipWaiting();
});

// 2. Activate Event - پاککردنەوەی مێمۆری کۆن
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) {
                        return caches.delete(key);
                    }
                })
            );
        })
    );
    self.clients.claim();
});

// 3. Fetch Event - کارکردنی تەواو بەبێ ئینتەرنێت
self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then((cachedResponse) => {
            if (cachedResponse) {
                return cachedResponse;
            }
            return fetch(event.request).then((networkResponse) => {
                if (networkResponse && networkResponse.status === 200 && networkResponse.type === 'basic') {
                    const responseClone = networkResponse.clone();
                    caches.open(CACHE_NAME).then((cache) => {
                        cache.put(event.request, responseClone);
                    });
                }
                return networkResponse;
            }).catch(() => {
                // کاتێک بەبێ ئینتەرنێتیت ڕاستەوخۆ ماڵپەڕەکە بکاتەوە
                if (event.request.mode === 'navigate') {
                    return caches.match(GH_PATH + '/index.html') || caches.match(GH_PATH + '/');
                }
            });
        })
    );
});
