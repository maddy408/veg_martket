import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';

// Shared state for external triggers (like TopNav button)
let globalDeferredPrompt = null;
const promptListeners = new Set();

export function triggerPWAInstall() {
  promptListeners.forEach((fn) => fn());
}

export default function PWAInstallPrompt() {
  const { t } = useTranslation();
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);
  const [showIOSModal, setShowIOSModal] = useState(false);
  const [installedSuccess, setInstalledSuccess] = useState(false);

  useEffect(() => {
    // 1. Check if running in standalone mode (already installed as PWA)
    const isStandaloneMode =
      window.matchMedia('(display-mode: standalone)').matches ||
      window.navigator.standalone === true ||
      document.referrer.includes('android-app://');

    setIsStandalone(isStandaloneMode);

    // 2. Detect iOS device
    const userAgent = window.navigator.userAgent.toLowerCase();
    const isIosDevice =
      /iphone|ipad|ipod/.test(userAgent) ||
      (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    setIsIOS(isIosDevice);

    if (isStandaloneMode) {
      return; // Already running as installed app
    }

    // 3. Check session dismissal preference
    const isDismissed = sessionStorage.getItem('pwa_prompt_dismissed');

    // 4. Handle Chromium beforeinstallprompt event
    const handleBeforeInstallPrompt = (e) => {
      // Prevent browser's default small mini-infobar
      e.preventDefault();
      // Stash event for user click
      globalDeferredPrompt = e;
      setDeferredPrompt(e);

      // Auto-show prompt on open if not dismissed in this session
      if (!isDismissed) {
        setShowPrompt(true);
      }
    };

    // 5. Handle appinstalled event
    const handleAppInstalled = () => {
      console.log('[PWA] App installed successfully');
      setInstalledSuccess(true);
      setShowPrompt(false);
      globalDeferredPrompt = null;
      setDeferredPrompt(null);
      setTimeout(() => setInstalledSuccess(false), 5000);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    window.addEventListener('appinstalled', handleAppInstalled);

    // 6. External trigger listener (from TopNav button)
    const handleManualTrigger = () => {
      if (isIosDevice && !isStandaloneMode) {
        setShowIOSModal(true);
      } else if (globalDeferredPrompt) {
        setShowPrompt(true);
        executeInstall();
      } else {
        setShowPrompt(true);
      }
    };

    promptListeners.add(handleManualTrigger);

    // If iOS and not standalone, show friendly install prompt if not dismissed
    if (isIosDevice && !isStandaloneMode && !isDismissed) {
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 1500);
      return () => clearTimeout(timer);
    }

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
      window.removeEventListener('appinstalled', handleAppInstalled);
      promptListeners.delete(handleManualTrigger);
    };
  }, []);

  async function executeInstall() {
    const promptEvent = deferredPrompt || globalDeferredPrompt;

    if (promptEvent) {
      try {
        // Show native install dialog
        promptEvent.prompt();
        const choice = await promptEvent.userChoice;
        if (choice.outcome === 'accepted') {
          console.log('[PWA] User accepted installation');
          setShowPrompt(false);
          setInstalledSuccess(true);
          setTimeout(() => setInstalledSuccess(false), 5000);
        } else {
          console.log('[PWA] User dismissed installation');
        }
      } catch (err) {
        console.warn('[PWA] Installation prompt error:', err);
      }
    } else if (isIOS) {
      setShowIOSModal(true);
    } else {
      // Desktop Chrome/Edge or already prompted: instruct user to check browser address bar
      alert(
        'இன்ஸ்டால் செய்ய: உங்கள் பிரவுசரின் முகவரிப் பட்டையில் (Address Bar) உள்ள ⊕ அல்லது Install ஐகானை கிளிக் செய்யவும்.'
      );
    }
  }

  function handleDismiss() {
    setShowPrompt(false);
    sessionStorage.setItem('pwa_prompt_dismissed', 'true');
  }

  if (isStandalone) {
    return null;
  }

  return (
    <>
      {/* 1. Success Toast */}
      {installedSuccess && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 bg-emerald-600 text-white px-4 py-2.5 rounded-xl shadow-xl flex items-center gap-2 text-xs sm:text-sm font-bold animate-bounce">
          <span>🎉</span>
          <span>ஸ்ரீ பவானி ஆப் வெற்றிகரமாக நிறுவப்பட்டது! (App Installed!)</span>
        </div>
      )}

      {/* 2. Floating Bottom/Top PWA Install Prompt Banner */}
      {showPrompt && (
        <aside
          role="region"
          aria-label="Install Bhavani POS App"
          className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-4 sm:max-w-md z-50 bg-[#0a1733] border border-emerald-500/40 text-white p-3.5 sm:p-4 rounded-2xl shadow-2xl backdrop-blur-md animate-slideUp"
        >
          <div className="flex items-start gap-3">
            {/* App Icon */}
            <div className="relative shrink-0 w-12 h-12 rounded-xl overflow-hidden border border-emerald-400/50 shadow-md bg-white p-0.5">
              <img
                src="/icon-192.png"
                alt="Bhavani POS App Icon"
                className="w-full h-full object-contain"
              />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-xs bg-emerald-500/20 text-emerald-300 font-bold px-1.5 py-0.5 rounded border border-emerald-500/30">
                  PWA WebApp
                </span>
                <span className="text-[11px] text-slate-300">மொபைல் ஆப்</span>
              </div>
              <h2 className="text-sm font-bold text-white truncate mt-0.5">
                ஸ்ரீ பவானி ஆப் (Bhavani POS)
              </h2>
              <p className="text-[11.5px] text-slate-300 leading-tight mt-0.5">
                மொபைலில் ஆப் போல இன்ஸ்டால் செய்து எளிதாக அதிவேக பில்லிங் செய்யுங்கள்!
              </p>

              {/* Actions */}
              <div className="flex items-center gap-2 mt-2.5">
                <button
                  type="button"
                  onClick={executeInstall}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-500 active:scale-95 text-white py-1.5 px-3 rounded-lg text-xs font-bold shadow-md transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  <span>Install the App (நிறுவு)</span>
                </button>
                <button
                  type="button"
                  onClick={handleDismiss}
                  className="px-2.5 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                >
                  பின்னர் (Later)
                </button>
              </div>
            </div>

            {/* Close Cross */}
            <button
              type="button"
              onClick={handleDismiss}
              className="text-slate-400 hover:text-white p-1 rounded-md text-xs"
              aria-label="Close install prompt"
            >
              ✕
            </button>
          </div>
        </aside>
      )}

      {/* 3. iOS Step-by-Step Install Modal */}
      {showIOSModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4">
          <div className="bg-[#0a1733] border border-blue-900 rounded-2xl p-5 max-w-sm w-full text-white shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-base font-bold flex items-center gap-2">
                <span>📲</span>
                <span>iPhone / iPad-ல் நிறுவ</span>
              </h2>
              <button
                type="button"
                onClick={() => setShowIOSModal(false)}
                className="text-slate-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              Safari பிரவுசரில் கீழ்க்கண்ட 2 எளிய வழிகளைப் பின்பற்றி உங்கள் முகப்புத் திரையில் (Home Screen) ஆப் போல சேர்க்கலாம்:
            </p>
            <div className="bg-white/5 border border-white/10 rounded-xl p-3 space-y-2 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">1</span>
                <span>கீழே உள்ள <strong>Share (⎋)</strong> ஐகானை தட்டவும்.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">2</span>
                <span>கீழே சென்று <strong>Add to Home Screen (⊞)</strong> ஐ தேர்ந்தெடுக்கவும்.</span>
              </div>
              <div className="flex items-center gap-2.5">
                <span className="w-6 h-6 rounded-full bg-emerald-600 text-white font-bold flex items-center justify-center shrink-0 text-[11px]">3</span>
                <span>மேலே வலதுபுறம் உள்ள <strong>Add</strong> என்பதை அழுத்தவும்.</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setShowIOSModal(false)}
              className="w-full bg-emerald-600 text-white py-2 rounded-xl text-xs font-bold hover:bg-emerald-500 cursor-pointer"
            >
              புரிந்தது (Done)
            </button>
          </div>
        </div>
      )}
    </>
  );
}
