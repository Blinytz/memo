// Ancien service worker de Mémo (/memo/) : il se retire et vide ses caches,
// puis recharge les pages ouvertes, qui partent vers /mnemo/.
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', e => e.waitUntil((async () => {
  const cles = await caches.keys();
  await Promise.all(cles.filter(k => /^memo-v\d+$/.test(k)).map(k => caches.delete(k)));
  await self.registration.unregister();
  for (const c of await self.clients.matchAll({type: 'window'})) c.navigate(c.url);
})()));
