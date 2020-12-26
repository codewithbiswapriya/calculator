// install  serviceworker

self.addEventListener('install', installServiceWorker);
cacheKey = 'version 5';
cacheAssets = ['index.html', 'style.css', 'script.js']

function installServiceWorker(e) {
    e.waitUntil(
        caches.open(cacheKey)
        .then((cache) => {

            cache.addAll(cacheAssets);
            console.log('Assets Installed in Cache');
        })
        .then(() => { self.skipWaiting() })
    )
}


self.addEventListener('activate', activateServiceWorker)

function activateServiceWorker(e) {
    e.waitUntil(
        caches.keys()
        .then(cacheKeys => {
            return Promise.all(
                cacheKeys.map((cache) => {
                        if (cache != cacheKey) {
                            console.log('cache cleared.')
                            return caches.delete(cache);
                        }
                    }

                )
            )
        })
    )
}

self.addEventListener('fetch', fetchServiceWorker)

function fetchServiceWorker(e) {
    e.respondWith(
        fetch(e.request).catch(() => {
            console.log('Website fetched from cache')
            return caches.match(e.request)
        })
    )
}