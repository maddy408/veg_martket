/**
 * RETIRED. This file used to be a hand-maintained service worker whose
 * CACHE_NAME never changed between deploys, so any browser that installed
 * it kept serving that one cached bundle forever - the actual cause of
 * "production shows old CSS/JS even after redeploying". The app now
 * registers only vite-plugin-pwa's generated `/sw.js`, whose precache
 * manifest is content-hashed per build and therefore always detected as
 * changed.
 *
 * This file is kept at the same URL (not deleted) because a browser that
 * already has the old worker installed won't notice a 404 here until its
 * next periodic update check, which can take up to 24h - deleting the file
 * would leave that worker stuck serving stale content until then. Instead,
 * this replacement takes over, immediately unregisters itself, clears
 * every cache it owns, and hands control back to the network/new worker.
 */
self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();
      await Promise.all(cacheNames.map((name) => caches.delete(name)));
      await self.registration.unregister();
      const clientsList = await self.clients.matchAll({ type: 'window' });
      clientsList.forEach((client) => client.navigate(client.url));
    })()
  );
});
