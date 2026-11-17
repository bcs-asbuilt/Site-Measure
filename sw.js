/* Site Measure offline cache. Change VERSION when you upload a new index.html so phones pick it up. */
const VERSION = 'site-measure-2026-10-16o';
const FILES = ["./", "index.html", "fonts.css", "manifest.webmanifest", "lib/three.min.js", "lib/jspdf.umd.min.js", "lib/svg2pdf.umd.min.js", "fonts/barlow-condensed-latin-400-normal.woff2", "fonts/barlow-condensed-latin-500-normal.woff2", "fonts/barlow-condensed-latin-600-normal.woff2", "fonts/barlow-latin-400-normal.woff2", "fonts/barlow-latin-500-normal.woff2", "fonts/barlow-latin-600-normal.woff2", "icons/icon-192.png", "icons/icon-512.png", "icons/apple-touch-icon.png"];
self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  /* the page itself: newest when there's signal, saved copy when there isn't */
  if(req.mode === 'navigate'){
    e.respondWith(fetch(req).then(r => { const c = r.clone(); caches.open(VERSION).then(x => x.put('index.html', c)); return r; })
      .catch(() => caches.match('index.html')));
    return;
  }
  /* libraries, fonts and icons: from the phone first */
  e.respondWith(caches.match(req).then(hit => hit || fetch(req).then(r => { const c = r.clone(); caches.open(VERSION).then(x => x.put(req, c)); return r; })));
});
