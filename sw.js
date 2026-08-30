const CACHE_NAME = 'subedit-v4.0009';

// دۆزینەوەی خۆکاری ناوی بوخچەی GitHub Pages
const GH_PATH = self.location.pathname.replace(/\/sw\.js$/, '');

const ASSETS_TO_CACHE = [
    GH_PATH + '/',
    GH_PATH + '/index.html',
    GH_PATH + '/fonts.css',
    GH_PATH + '/KurdForest.ttf',
    GH_PATH + '/sw.js'
];

// 1. Install Event - پاشەکەوتکردنی فایلەکان
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS_TO_CACHE);
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

// 3. Fetch Event - کردنەوەی ئۆفلاین
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
                // کاتێک بێ ئینتەرنێتیت خۆکارانە فایلی index.html دەکاتەوە
                if (event.request.mode === 'navigate') {
                    return caches.match(GH_PATH + '/index.html') || caches.match(GH_PATH + '/');
                }
            });
        })
    );
});
