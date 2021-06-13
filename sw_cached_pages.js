const cacheName = "v1";

const cacheAssets = [
    'index.html',
    'about.html',
    'style.css',
    '/js/main.js'
];

//call install event
self.addEventListener('install', (e) => {
    console.log('service worker is installed');

    e.waitUntil(
        caches.open(cacheName)
            .then(cache => {
                console.log('service worker caching files');
                cache.addAll(cacheAssets);
            })
            .then(() => self.skipWaiting())
    );
});

//call activate event
self.addEventListener('activate', (e) => {    
    console.log('service worker is activated');

    //remove unwanted cache
    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(eachCacheName => {
                    if(eachCacheName !== cacheName)
                    {
                        return caches.delete(eachCacheName);
                    }
                })
                );
        })
    );
});

//call Fetch event
self.addEventListener('fetch', (e) => {
    console.log('service worker is fetching :=', e.request.url);
    e.respondWith(
        fetch(e.request).catch(() => {
            caches.match(e.request)
                .then((res) => {
                    if(res == undefined)
                    {
                        console.log('cache does not match ...');
                    }
                    return res;
                })
        })
    );
});