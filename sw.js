self.addEventListener('install', function(event) {
    console.log('[Service Worker] Installing Service Worker...', event);
    event.waitUntil(
        caches.open('mysite-static-v3').then(function (cache) {
          return cache.addAll([
            '/index.html',
            '/index-beetroot-all.html',
            '/index-beetroot-one.html',
            '/index-contact-us.html',
            '/assets/css/style.css',
            '/assets/img/logo.png',
            '/assets/img/wheat-bg.jpg',
            '/assets/js/main.js',
            '/assets/js/scripts.js',
            '/assets/vendor/bootstrap-icons/index.html',
            '/assets/vendor/bootstrap-icons/bootstrap-icons.json',
            '/assets/vendor/bootstrap-icons/bootstrap-icons.css',
            '/'
          ]);
        }),
      );
});

self.addEventListener('activate', function(event) {
    console.log('[Service Worker] Activating Service Worker...', event);
});

self.addEventListener('fetch', function(event) {
    console.log('[Service Worker] Fetching something...', event);
    event.respondWith(
        caches.match(event.request).then(
            function(response){
                if(response) return response;
                else return fetch(event.request);
            }
        )
    );
});

self.addEventListener('push', event => {
    const notification = event.data.text();
    self.registration.showNotification(notification, {});
});
