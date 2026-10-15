import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // We register the service worker ourselves in main.jsx via the
      // `virtual:pwa-register` module (so we control exactly when the
      // update check runs and reload the page the moment a new version
      // takes over) - don't also auto-inject a second <script> that
      // registers it a different way.
      injectRegister: false,
      registerType: 'autoUpdate',
      manifest: {
        name: 'Sri Pavani Kaikani Commission',
        short_name: 'VTC POS',
        description: 'Vegetable Commission Billing - Sri Pavani Traders',
        theme_color: '#2d5a27',
        background_color: '#ffffff',
        display: 'standalone',
        orientation: 'portrait',
        scope: '/',
        start_url: '/',
        icons: [
          { src: 'pwa-192x192.png', sizes: '192x192', type: 'image/png' },
          { src: 'pwa-512x512.png', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,webmanifest}'],
        // Every build's precache manifest is content-hashed, so a real
        // deploy is always detected as "different" from whatever the
        // browser has installed - this is what actually busts stale
        // cached JS/CSS, not a hand-maintained version string.
        cleanupOutdatedCaches: true,
        skipWaiting: true,
        clientsClaim: true,
        // SPA fallback so a deep link (e.g. a refresh on /billing) still
        // loads the app shell instead of a raw 404/offline error - API
        // calls are excluded since those must always hit the network.
        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/api/],
        runtimeCaching: [
          {
            urlPattern: /\/api\//,
            handler: 'NetworkOnly',
          },
        ],
      },
    }),
  ],
  server: {
    host: true,
    port: 5174,
  },
});
