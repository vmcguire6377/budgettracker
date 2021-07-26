//const APP_PREFIX = 'budgettracker';
//const VERSION = 'version_01';
const CACHE_NAME = 'budgettracker-cache-v1';
const DATA_CACHE_NAME = 'budget-cache-v1'

const FILES_TO_CACHE = [
    "./index.html",
    "./public/css/style.css",
    "./models/transaction.js",
    "./public/manifest.json",
    '/public/icons/icon-72x72.png',
    '/public/icons/icon-96x96.png',
    '/public/icons/icon-128x128.png',
    '/public/icons/icon-144x144.png',
    '/public/icons/icon-152x152.png',
    '/public/icons/icon-192x192.png',
    '/public/icons/icon-384x384.png',
    '/public/icons/icon-512x512.png',
    
];


self.addEventListener('install', function (e) {
e.waitUntil(
    caches.open(budgettracker-cache-v1).then(function (cache) {
        console.log('installing cache : ' + CACHE_NAME)
        return cache.addAll(FILES_TO_CACHE)
    })
);

self.skipWaiting();
});

self.addEventListener('activate', function (e) {
    e.waitUntil(
        caches.keys().then(function (keyList) {
            let cacheKeeplist = keyList.filter(function (key) {
                return key.indexOf(APP_PREFIX);
            });
            cacheKeeplist.push(CACHE_NAME);

            return Promise.all(
                keyList.map(function(key, i) {
                    if (cacheKeeplist.indexOf(key) === -1) {
                        console.log('deleting cache : ' + keyList[i]);
                        return caches.delete(keyList[i]);
                    }
                })
            );
        })
    );
});

self.addEventListener('fetch', function (e) {
    console.log('fetch request : ' + e.request.url)
    e.respondWith(

    )


caches.match(e.request).then(function (request) {
    if (request) {
        console.log('responding with cache : ' + e.request.url)
        return request
    }
})

caches.match(e.request).then(function (request) {
    if (request) {
        console.log('responding with cache : ' + e.request.url)
        return request
    } else {
        console.log('file is not cached, fetching : ' + e.request.url)
        return fetch(e.request)
    }
})
})





















