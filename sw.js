// TARDIS Service Worker — sw.js
// Place this file in the SAME folder as index.html (or tardis.html)
// Version this string whenever you update the app to force a cache refresh
const CACHE = 'tardis-v1';

// Files to cache on install — add any additional assets here
const ASSETS = [
  './',
  './index.html'   // add './tardis.html' if that's your filename
];

// ── Install: cache app shell ─────────────────────────────────────────────────
self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(ASSETS))
      .then(() => self.skipWaiting())  // activate immediately, don't wait
  );
});

// ── Activate: clean up old caches ────────────────────────────────────────────
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(
        keys.filter(k => k !== CACHE).map(k => caches.delete(k))
      ))
      .then(() => self.clients.claim())  // take control of open pages immediately
  );
});

// ── Fetch: network-first for navigation, cache-first for assets ──────────────
self.addEventListener('fetch', e => {
  // Skip non-GET requests and browser-extension requests
  if (e.request.method !== 'GET') return;
  if (!e.request.url.startsWith('http')) return;

  // Navigation requests (loading the page): network-first so you always get
  // the latest version; fall back to cache if offline
  if (e.request.mode === 'navigate') {
    e.respondWith(
      fetch(e.request)
        .catch(() => caches.match('./'))
    );
    return;
  }

  // All other requests: cache-first, then network, then cache fallback
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(resp => {
        // Only cache valid same-origin responses
        if (!resp || resp.status !== 200 || resp.type === 'opaque') return resp;
        caches.open(CACHE).then(cache => cache.put(e.request, resp.clone()));
        return resp;
      }).catch(() => caches.match('./'));
    })
  );
});
