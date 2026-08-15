const CACHE_NAME = 'excel-hub-v1';
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/atajos.html',
  '/formulas.html',
  '/herramientas.html',
  '/practicas.html',
  '/teoria.html',
  '/tips.html',
  '/evaluaciones.html',
  '/assets/css/main-style.css',
  '/assets/css/guide-style.css',
  '/assets/js/sidebar.js',
  '/assets/favicon.svg',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(CORE_ASSETS))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((cached) => {
      if (cached) return cached;
      return fetch(event.request).then((response) => {
        if (response && response.ok) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(event.request, clone));
        }
        return response;
      });
    })
  );
});
