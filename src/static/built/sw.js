const cacheVersion = 1;
const CACHE_NAME = 'offlinePage';
const urlsToCache  = ['/assets/header_small-logo.png','offlinePage.html'];
const offlinePage = 'offlinePage.html';


self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll([offlinePage]);
   })
  );
});

// Now to retrieve the cached pages, we will use the fetch event.
this.addEventListener('fetch', event => {
  if(event.request.mode === 'navigate' || (event.request.method === 'GET')) {
     event.respondWith(
        fetch(event.request.url).catch(error => {
           // Return the offline page
           return caches.match(offlinePage);
        })
     );
  }
  else{
     event.respondWith(
        caches.match(event.request).then(function (response) {
           return response || fetch(event.request);
        })
     );
  }
});