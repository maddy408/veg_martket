import { useState, useEffect } from 'react';

export default function PWAInstallBanner() {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    // 1. Hide if already running in standalone PWA mode
    const isStandalone =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://');

    if (isStandalone) {
      return;
    }

    // 2. Check if banner was closed within the last 24 hours
    const closedTime = localStorage.getItem('pwa-banner-closed');
    if (closedTime) {
      const diff = Date.now() - parseInt(closedTime, 10);
      if (diff < 24 * 60 * 60 * 1000) {
        return; // Closed within 24 hours
      }
    }

    // 3. Listen for beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShow(true);
    };

    // 4. Hide on appinstalled event
    const handleAppInstalled = () => {
      setShow(false);
      setDeferredPrompt(null);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    try {
      deferredPrompt.prompt();
      const choiceResult = await deferredPrompt.userChoice;
      if (choiceResult && choiceResult.outcome === 'accepted') {
        setShow(false);
        setDeferredPrompt(null);
      }
    } catch (err) {
      console.warn('Install prompt error:', err);
    }
  };

  const handleClose = () => {
    setShow(false);
    localStorage.setItem('pwa-banner-closed', Date.now().toString());
  };

  if (!show || !deferredPrompt) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        width: '100%',
        zIndex: 99999,
        padding: '10px 16px',
        backgroundColor: '#1a1a1a',
        color: '#ffffff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        boxShadow: '0 -2px 10px rgba(0, 0, 0, 0.4)',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* Left: Message with Down Arrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13.5px', fontWeight: '500' }}>
        <span style={{ color: '#f9c76f', fontSize: '15px', lineHeight: 1 }}>⬇</span>
        <span>Install VTC POS App on your Home Screen!</span>
      </div>

      {/* Right: Close + Install App */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <button
          type="button"
          onClick={handleClose}
          style={{
            background: 'transparent',
            border: 'none',
            color: '#ffffff',
            fontSize: '13px',
            fontWeight: '500',
            cursor: 'pointer',
            padding: '6px 12px',
          }}
        >
          Close
        </button>
        <button
          type="button"
          onClick={handleInstallClick}
          style={{
            backgroundColor: '#f9c76f',
            color: '#1a1a1a',
            border: 'none',
            borderRadius: '6px',
            padding: '6px 16px',
            fontSize: '13px',
            fontWeight: 'bold',
            cursor: 'pointer',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)',
          }}
        >
          Install App
        </button>
      </div>
    </div>
  );
}
