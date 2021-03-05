const CACHE_NAME = 'offlinePage';
const urlsToCache  = ['/assets/header_small-logo.png','offlinePage.html'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(() => cache.addAll(new Request(urlsToCache)))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      if ('navigationPreload' in self.registration) {
        await self.registration.navigationPreload.enable();
      }
    })(),
  );
  self.clients.claim();
});

self.addEventListener('fetch', function(event) {
  if(event.request.mode === 'navigate' || (event.request.method === 'GET')) {
    event.respondWith(
      caches.match('offlinePage.html')
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
