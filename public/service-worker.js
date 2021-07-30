
//const VERSION = 'version_01';
const CACHE_NAME = 'budgettracker-cache-v1';
const DATA_CACHE_NAME = 'budget-cache-v1';
const APP_PREFIX = 'budgettracker';

const FILES_TO_CACHE = [
    "/",
    "./index.html",
    "./css/style.css",
    "./manifest.json",
    "./js/idb.js",
    "./js/index.js",
    "./icons/icon-72x72.png",
    "./icons/icon-96x96.png",
    "./icons/icon-128x128.png",
    "./icons/icon-144x144.png",
    "./icons/icon-152x152.png",
    "./icons/icon-192x192.png",
    "./icons/icon-384x384.png",
    "./icons/icon-512x512.png"
    ];


self.addEventListener('install', function (e) {
e.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
        console.log('The cache has been loaded');
        return cache.addAll(FILES_TO_CACHE)
    })
);

self.skipWaiting();
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log('The cache has been updated', key);
                        return caches.delete(key);
                    }
        })
        );
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', function (e) {
    if (e.request.url.includes('/api/')) {
        e.respondWith(
            caches
                .open(DATA_CACHE_NAME).then(cache => {
                    return fetch(e.request)
                        .then(response => {
                           // keep the response in the cache
                            if (response.status === 200) {
                                cache.put(e.request.url, response.clone());
                            }
                            return response;
                        })
                        .catch(err => {
                            
                            return cache.match(e.request);
                        });
                })
                .catch(err => console.log(err))
        );
        return;
    }
})





















