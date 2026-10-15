import { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../hooks/useAuth.jsx';
import { useSettings } from '../hooks/useSettings.jsx';

const LINKS = [
  { to: '/', key: 'dashboard', icon: '📊' },
  { to: '/billing', key: 'billing', icon: '🧾' },
  { to: '/items', key: 'items', icon: '🥬' },
  { to: '/parties', key: 'parties', icon: '👥' },
  { to: '/payments', key: 'payments', icon: '💵' },
  { to: '/purchases', key: 'purchases', icon: '🚚' },
  { to: '/invoices', key: 'invoices', icon: '📄' },
  { to: '/reports', key: 'reports', icon: '📈' },
  { to: '/settings', key: 'settings', icon: '⚙️', adminOnly: true },
];

export default function TopNav() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const { companyName } = useSettings();
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Close drawer on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const visibleLinks = LINKS.filter((l) => !l.adminOnly || user?.role === 'admin');
  const displayName = companyName || 'ஸ்ரீ பவானி காய்கனி கமிஷன் வியாபாரம்';

  return (
    <>
      <nav className="no-print bg-[#0a1733] text-white shadow-md border-b border-blue-950 sticky top-0 z-40 select-none">
        <div className="flex items-center justify-between px-3 sm:px-4 py-2 max-w-7xl mx-auto">
          {/* Left: Mobile Drawer Hamburger Button + Brand Title */}
          <div className="flex items-center gap-2.5 min-w-0">
            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              aria-label="Open Navigation Drawer"
              className="lg:hidden p-1.5 rounded-lg text-white hover:bg-white/15 active:bg-white/20 border border-white/20 focus:outline-none transition-colors shrink-0"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            {/* Brand Logo & Name */}
            <NavLink
              to="/"
              className="font-bold text-sm sm:text-base whitespace-nowrap hover:text-blue-200 transition-colors tracking-tight flex items-center gap-2 min-w-0"
              title={displayName}
            >
              <span className="bg-emerald-600 text-white font-extrabold text-[10px] sm:text-xs px-2 py-0.5 rounded shadow-xs tracking-wider shrink-0">
                VTC
              </span>
              <span className="truncate max-w-[210px] sm:max-w-[320px] md:max-w-[260px] lg:max-w-[280px] xl:max-w-none text-white font-semibold">
                {displayName}
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation Links - Shown on Large screens */}
          <div className="hidden lg:flex items-center gap-1 xl:gap-1.5 flex-1 justify-center px-2">
            {visibleLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  'px-2.5 py-1 rounded-md text-xs font-medium whitespace-nowrap transition-all ' +
                  (isActive
                    ? 'bg-blue-100 text-slate-900 font-bold shadow-xs'
                    : 'text-white/85 hover:text-white hover:bg-white/10')
                }
              >
                {t(`nav.${link.key}`)}
              </NavLink>
            ))}
          </div>

          {/* Right Section: Role badge & Desktop Logout */}
          <div className="flex items-center gap-2 shrink-0">
            {/* Role Chip */}
            {user && (
              <span className="hidden sm:inline-block text-[11px] bg-blue-950/80 text-blue-200 border border-blue-800/60 px-2 py-0.5 rounded font-medium">
                {user.role === 'admin' ? 'நிர்வாகி (Admin)' : user.name || 'Staff'}
              </span>
            )}

            {/* Desktop Logout Button */}
            <button
              onClick={logout}
              title={t('nav.logout', 'வெளியேறு')}
              aria-label={t('nav.logout', 'வெளியேறு')}
              className="hidden sm:flex p-1.5 rounded-md text-white/85 hover:text-white hover:bg-white/15 transition-colors items-center justify-center border border-white/20"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* ======================================================== */}
      {/* MOBILE OFFCANVAS DRAWER (Sliding Navigation Menu)        */}
      {/* ======================================================== */}
      {/* Backdrop overlay */}
      <div
        onClick={() => setMobileOpen(false)}
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs z-[9998] transition-opacity duration-300 lg:hidden ${
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        aria-hidden="true"
      />

      {/* Slide-out Drawer Panel */}
      <aside
        className={`fixed top-0 left-0 bottom-0 w-[285px] max-w-[85vw] bg-[#07132b] text-white z-[9999] shadow-2xl flex flex-col transform transition-transform duration-300 ease-in-out lg:hidden ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Drawer Header with Logo & Close button */}
        <div className="bg-[#0b1c3e] border-b border-blue-900/60 p-4 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="bg-emerald-600 text-white font-extrabold text-xs px-2.5 py-1 rounded shadow-xs tracking-wider">
              VTC
            </span>
            <div className="min-w-0">
              <h2 className="text-sm font-bold text-white truncate leading-tight">
                {displayName}
              </h2>
              <p className="text-[11px] text-blue-200/80 truncate leading-tight mt-0.5">
                காய்கனி கமிஷன் வியாபாரம்
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            aria-label="Close Navigation Drawer"
            className="p-1.5 rounded-lg text-white/80 hover:text-white hover:bg-white/10 active:bg-white/20 transition-colors ml-2 shrink-0"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* User Role Card */}
        {user && (
          <div className="px-4 py-2.5 bg-[#091733] border-b border-blue-900/40 flex items-center justify-between text-xs text-blue-200">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span className="font-medium text-white">{user.name || 'User'}</span>
            </div>
            <span className="text-[10px] bg-blue-900/80 text-blue-100 px-2 py-0.5 rounded font-mono uppercase">
              {user.role}
            </span>
          </div>
        )}

        {/* Navigation Tabs List - One by One clickable */}
        <div className="flex-1 overflow-y-auto py-2 px-2.5 space-y-1">
          {visibleLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                'flex items-center gap-3 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ' +
                (isActive
                  ? 'bg-blue-600/30 text-[#f9c76f] font-bold border-l-4 border-[#f9c76f] shadow-xs'
                  : 'text-white/85 hover:text-white hover:bg-white/10 active:bg-white/15')
              }
            >
              <span className="text-base shrink-0">{link.icon}</span>
              <span className="truncate">{t(`nav.${link.key}`)}</span>
            </NavLink>
          ))}
        </div>

        {/* Drawer Footer with Logout & Version */}
        <div className="p-3 bg-[#050e21] border-t border-blue-950/80 space-y-2">
          <button
            onClick={() => {
              setMobileOpen(false);
              logout();
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-red-300 hover:text-red-200 hover:bg-red-950/40 border border-red-900/40 transition-colors"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>{t('nav.logout', 'வெளியேறு (Logout)')}</span>
          </button>
          <div className="text-center text-[10px] text-gray-500 font-mono">
            VTC POS • PWA App
          </div>
        </div>
      </aside>
    </>
  );
}
