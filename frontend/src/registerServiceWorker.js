/**
 * Single source of truth for PWA service worker registration.
 *
 * Earlier builds registered a hand-maintained `/service-worker.js` whose
 * CACHE_NAME never changed between deploys, so a browser that installed it
 * once would keep serving that exact cached HTML/JS/CSS bundle forever -
 * "I fixed it and redeployed but production still looks old" is the direct
 * symptom. vite-plugin-pwa's generated `/sw.js` doesn't have that problem
 * (its precache manifest is content-hashed per build, so a real deploy is
 * always seen as a genuinely new version), so it's now the only service
 * worker this app registers. This module also actively unregisters any
 * `/service-worker.js` a returning visitor's browser still has installed
 * from before this change, so existing users self-heal on their next visit
 * without needing to manually clear site data.
 */
export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  // Clean up the old hand-maintained worker for anyone who already has it
  // installed from a previous deploy - it would otherwise keep intercepting
  // every request for this origin forever, blocking the new one below from
  // ever taking effect on their device.
  try {
    const registrations = await navigator.serviceWorker.getRegistrations();
    await Promise.all(
      registrations
        .filter((r) => r.active?.scriptURL?.endsWith('/service-worker.js'))
        .map((r) => r.unregister())
    );
  } catch {
    // Non-fatal - the retired /service-worker.js (see public/service-worker.js)
    // also self-unregisters on its own next activate event as a fallback.
  }

  if (!import.meta.env.PROD) {
    return;
  }

  try {
    const { registerSW } = await import('virtual:pwa-register');
    registerSW({
      immediate: true,
      onRegisteredSW(url, registration) {
        console.log('[PWA] Service worker registered:', url);
        // registerType: 'autoUpdate' already activates new versions
        // automatically; this just catches them on an interval too, in
        // case a visitor keeps a tab open for a long time across a deploy.
        if (registration) {
          setInterval(() => registration.update(), 60 * 60 * 1000);
        }
      },
      onRegisterError(error) {
        console.warn('[PWA] Service worker registration failed:', error);
      },
    });
  } catch (error) {
    console.warn('[PWA] Service worker module unavailable:', error);
  }
}
