const CACHE_NAME = 'alchemist-static-v2';
const STATIC_ASSETS = [
  './',
  './index.html',
  './MASTER_VAULT.json',
  './manifest.json',
  './kernel/alchemist/block-system.js',
  './kernel/alchemist/session-engine.js',
  './kernel/alchemist/ingestion-engine.js',
  './kernel/alchemist/session-review.js',
  './kernel/alchemist/session-normalizer.js',
  './kernel/alchemist/epub-exporter.js',
  './kernel/alchemist/ui-integration.js',
  './kernel/alchemist/ui-activation.js',
  './kernel/alchemist/knowledge-book-exporter.js',
  './kernel/alchemist/navigation-state.js',
  './kernel/alchemist/analytics.js',
  './packages/logic-core/vialogic.js',
  './packages/visual-core/zayvora-visual-engine.js',
  './packages/kernel/alchemist-universe-session.js',
  './packages/zay-format/zay-v2.js'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  const request = event.request;
  if (request.method !== 'GET') return;
  event.respondWith(
    fetch(request)
      .then((response) => {
        if (response && response.ok && new URL(request.url).origin === self.location.origin) {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        }
        return response;
      })
      .catch(() => caches.match(request).then((cached) => {
        if (cached) return cached;
        if (request.mode === 'navigate' || (request.headers.get('accept') && request.headers.get('accept').includes('text/html'))) {
          return caches.match('./index.html');
        }
        return new Response('Asset not found', { status: 404, statusText: 'Not Found' });
      }))
  );
});
