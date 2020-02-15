const CACHE_NAME = "FirstPWA.v.1.0.8";
var urlToCache = [
    "/",
    "/nav.html",
    "/pages/home.html",
    "/pages/about.html",
    "/pages/galery.html",
    "/pages/listview.html",
    "/js/materialize.min.js",
    "/css/materialize.min.css",
    "/js/nav.js"
];

self.addEventListener("install", function(event)
{
    event.waitUntil(
        caches.open(CACHE_NAME).then(function(cache)
        {
            return cache.addAll(urlToCache)
        })
    )
})

self.addEventListener("fetch", function(event)
{
    event.respondWith(
        caches.match(event.request,
            {
                cacheName: CACHE_NAME
            })
            .then(function(response)
            {
                if (response)
                {
                    console.log("service worker : gunakan aset dari cache : ", response.url);
                    return response;
                }
                console.log("sw memuat aset dari server", event.request.url)
                return fetch(event.request)
            })
    )
})

self.addEventListener("activate",function(event)
{
    event.waitUntil(
        caches.keys().then(function(cacheNames)
        {
            return Promise.all(
                cacheNames.map(function(cacheName)
                {
                    if (cacheName != CACHE_NAME)
                    {
                        console.log("cache : "+cacheName +"dihapus");
                        return caches.delete(cacheName);
                    }
                })
            )
        })
    )
})