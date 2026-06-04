// 极简 Service Worker — 仅用于让浏览器允许「安装到主屏幕」。
// 故意不做任何缓存：所有请求直连网络，保证每次都是最新版本（避免旧版本卡住）。
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', (e) => {
  // 纯透传：网络优先，不缓存
  e.respondWith(fetch(e.request));
});
