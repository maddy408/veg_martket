import React from 'react';
import ReactDOM from 'react-dom/client';
import './i18n';
import './index.css';
import App from './App.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Register Service Worker for PWA (PWABuilder & offline support)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swUrl = import.meta.env.PROD ? '/sw.js' : '/service-worker.js';
    navigator.serviceWorker
      .register(swUrl)
      .then((registration) => {
        console.log('[PWA] Service Worker registered:', registration.scope);
      })
      .catch((error) => {
        // Fallback to /service-worker.js
        navigator.serviceWorker
          .register('/service-worker.js')
          .then((reg) => console.log('[PWA] Fallback SW registered:', reg.scope))
          .catch((err) => console.warn('[PWA] SW registration failed:', err));
      });
  });
}

