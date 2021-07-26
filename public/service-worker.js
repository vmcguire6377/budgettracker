const APP_PREFIX = 'budgettracker';
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
    caches.open(CACHE_NAME).then(cache => {
        console.log('The cache has been loaded');
        return cache.addAll(FILES_TO_CACHE)
    })
);

self.skipWaiting();
});






















