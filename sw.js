var CACHE = 'bruntons-expenses-v1';
var SHELL = ['./', 'index.html', 'manifest.webmanifest', 'icon-192.png', 'icon-512.png', 'apple-touch-icon.png'];
var CDN = /(^|\.)(cdnjs\.cloudflare\.com|fonts\.googleapis\.com|fonts\.gstatic\.com)$/;

self.addEventListener('install', function (e) {
  e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(SHELL); }).then(function () { return self.skipWaiting(); }));
});

self.addEventListener('activate', function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== CACHE; }).map(function (k) { return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

function keep(request, response) {
  if (response && (response.ok || response.type === 'opaque')) {
    var copy = response.clone();
    caches.open(CACHE).then(function (c) { c.put(request, copy); });
  }
  return response;
}

self.addEventListener('fetch', function (e) {
  if (e.request.method !== 'GET') return;
  var url = new URL(e.request.url);
  if (url.origin === self.location.origin) {
    // The app's own files: newest from the network when online, stored copy when not.
    e.respondWith(fetch(e.request).then(function (r) { return keep(e.request, r); }).catch(function () {
      return caches.match(e.request, { ignoreSearch: true }).then(function (hit) { return hit || caches.match('index.html'); });
    }));
  } else if (CDN.test(url.hostname)) {
    // Fonts and the PDF tool: stored after the first online visit.
    e.respondWith(caches.match(e.request).then(function (hit) {
      return hit || fetch(e.request).then(function (r) { return keep(e.request, r); });
    }));
  }
});
