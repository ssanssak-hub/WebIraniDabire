/* آفلاین‌سازی: فایل‌های برنامه + همه‌ی فونت‌های fonts/fonts.json کش می‌شوند. اول شبکه، بعد کش. */
const C = 'pfk-v3'; // نسخه کش را به v3 افزایش دادیم تا مرورگر فایل‌های جدید را دریافت کند
const FILES = [
  "./",
  "index.html",
  "keyboard.html",    // اضافه شد
  "about.html",       // اضافه شد
  "manifest.json",
  "css/style.css",
  "css/home.css",     // اضافه شد
  "icons/icon-192.png",
  "icons/icon-512.png",
  "fonts/fonts.json",
  "js/custom-keyboard-view.js",
  "js/export-utils.js",
  "js/font-manager.js",
  "js/font-name-reader.js",
  "js/font-unicode-reader.js",
  "js/image-text-editor.js",
  "js/main.js",
  "js/saved-files.js",
  "js/theme-manager.js",
  "js/unicode-scripts.js",
  "js/utils.js"
];

self.addEventListener('install', e => {
  e.waitUntil(
    caches.open(C).then(async c => {
      await c.addAll(FILES);
      try {
        const a = await (await fetch('fonts/fonts.json')).json();
        await c.addAll(a.map(f => 'fonts/' + encodeURIComponent(f)));
      } catch (x) {}
    })
  );
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(k => 
      Promise.all(k.filter(x => x !== C).map(x => caches.delete(x)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  
  e.respondWith(
    fetch(e.request).then(r => {
      const cp = r.clone();
      caches.open(C).then(c => c.put(e.request, cp));
      return r;
    }).catch(() => 
      caches.match(e.request).then(m => m || caches.match('index.html'))
    )
  );
});
