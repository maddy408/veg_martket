/**
 * =======================================================================
 * AJ AGENCY / VEG POS - CENTRAL DESIGN SYSTEM & THEME
 * =======================================================================
 * This is the SINGLE COMMON FILE for:
 *  1. App Colors (Brand Navy, Traditional Mandi Green, Status colors, etc.)
 *  2. Button Styles (Primary, Secondary, Success, Danger, Mandi, etc.)
 *  3. Header Styles (Navbar, Section headers, Page titles)
 *  4. Card Styles (Standard, metric, padded, interactive)
 *  5. Form Input & Badge Styles
 *
 * HOW TO USE ANYWHERE IN THE APP:
 * -----------------------------------------------------------------------
 *  import { theme, colors, buttons, cards, headers } from '@/theme';
 *  // or
 *  import theme from '../theme';
 *
 *  <button className={buttons.primary}>Save</button>
 *  <div className={cards.base}>...</div>
 * =======================================================================
 */

// 1. APP COLORS PALETTE
export const colors = {
  // Brand & Navy Primary
  primary: '#1e3a8a',          // Blue 900
  primaryHover: '#172554',     // Blue 950
  primaryLight: '#eff6ff',     // Blue 50
  brandDark: '#0a1733',        // Dark Navy (Navbar BG)
  brandBorder: '#0f224a',

  // Traditional Mandi Green (Sacred & Agriculture theme)
  mandiGreen: '#0e6037',       // Core Mandi Green
  mandiGreenLight: '#e6f4ea',  // Light Mandi Tint
  mandiGreenHover: '#0a4729',  // Darker Mandi Green
  mandiRed: '#dc2626',         // Mandi Price / VTC Logo Red

  // Secondary & Slate Grays
  secondary: '#475569',        // Slate 600
  secondaryLight: '#f1f5f9',   // Slate 100
  secondaryDark: '#1e293b',    // Slate 800

  // Status & Feedback Colors
  success: '#16a34a',          // Green 600
  successLight: '#dcfce7',     // Green 100
  danger: '#dc2626',           // Red 600
  dangerLight: '#fee2e2',      // Red 100
  warning: '#f59e0b',          // Amber 500
  warningLight: '#fef3c7',     // Amber 100
  info: '#0284c7',             // Sky 600
  infoLight: '#e0f2fe',        // Sky 100

  // Backgrounds & Surfaces
  background: '#f8fafc',       // Slate 50 Page Background
  surface: '#ffffff',          // White Card/Modal Background
  surfaceMuted: '#f8fafc',

  // Borders & Lines
  border: '#e2e8f0',           // Slate 200
  borderDark: '#cbd5e1',       // Slate 300
  borderMandi: '#0e6037',

  // Typography
  textPrimary: '#0f172a',      // Slate 900
  textSecondary: '#475569',    // Slate 600
  textMuted: '#94a3b8',        // Slate 400
  textOnPrimary: '#ffffff',
  textOnMandi: '#0e6037',
};

// 2. BUTTON STYLES
export const buttons = {
  // Base button behavior
  base: 'inline-flex items-center justify-center font-semibold rounded-lg transition-all active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed select-none',

  // Sizes
  xs: 'px-2 py-1 text-[11px] rounded',
  sm: 'px-2.5 py-1.5 text-xs rounded-md',
  md: 'px-3.5 py-2 text-xs sm:text-sm rounded-lg',
  lg: 'px-5 py-2.5 text-sm sm:text-base font-bold rounded-lg',
  icon: 'p-2 rounded-lg',

  // Variants
  primary: 'bg-blue-900 hover:bg-blue-950 text-white shadow-sm',
  mandi: 'bg-[#0e6037] hover:bg-[#0a4729] text-white shadow-sm',
  secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700',
  success: 'bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm',
  danger: 'bg-red-600 hover:bg-red-700 text-white shadow-sm',
  warning: 'bg-amber-500 hover:bg-amber-600 text-white shadow-sm',
  outline: 'border border-slate-300 hover:bg-slate-50 text-slate-700 bg-white',
  outlineMandi: 'border-2 border-[#0e6037] text-[#0e6037] hover:bg-[#e6f4ea] font-bold bg-white',
  outlinePrimary: 'border border-blue-900 text-blue-900 hover:bg-blue-50 font-bold bg-white',
  ghost: 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
  ghostMandi: 'text-[#0e6037] hover:bg-[#e6f4ea]',
};

// 3. HEADER STYLES
export const headers = {
  // Top Navigation Bar
  navbar: 'no-print bg-[#0a1733] text-white shadow-md border-b border-blue-950 sticky top-0 z-40',
  navContainer: 'max-w-7xl mx-auto px-3.5 py-2 flex items-center justify-between',
  navBrand: 'font-bold text-sm sm:text-base whitespace-nowrap text-white hover:text-blue-200 transition-colors tracking-tight flex items-center gap-2',

  // Page Level Headers
  pageWrapper: 'mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3',
  pageTitle: 'text-xl sm:text-2xl font-black text-slate-900 tracking-tight',
  pageSubtitle: 'text-xs sm:text-sm text-slate-500 mt-0.5',
  pageActions: 'flex items-center gap-2 flex-wrap',

  // Section Headers inside cards / grids
  sectionHeader: 'flex items-center justify-between mb-3',
  sectionTitle: 'text-sm sm:text-base font-bold text-slate-800 flex items-center gap-2',
};

// 4. CARD STYLES
export const cards = {
  // Container variants
  base: 'bg-white rounded-xl shadow-sm border border-slate-200/80',
  padded: 'bg-white rounded-xl shadow-sm border border-slate-200/80 p-3 sm:p-4',
  bordered: 'bg-white rounded-xl border border-slate-300 p-4',
  mandi: 'bg-white rounded-xl border-2 border-[#0e6037] p-3 sm:p-4 shadow-sm',
  stat: 'bg-white rounded-xl shadow-sm border border-slate-200/80 p-3.5 flex items-center gap-3',
  interactive: 'bg-white rounded-xl shadow-sm border border-slate-200/80 p-4 hover:shadow-md hover:border-slate-300 transition-all cursor-pointer',

  // Card Structure Parts
  header: 'px-4 py-3 border-b border-slate-100 flex items-center justify-between',
  title: 'text-sm sm:text-base font-bold text-slate-800 tracking-tight',
  subtitle: 'text-xs text-slate-500 mt-0.5',
  body: 'p-3 sm:p-4',
  footer: 'px-4 py-3 bg-slate-50 border-t border-slate-100 rounded-b-xl flex items-center justify-between',
};

// 5. FORM INPUT & LABEL STYLES
export const inputs = {
  base: 'w-full rounded-lg border border-slate-300 px-3 py-2 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all bg-white text-slate-900',
  sm: 'w-full rounded-md border border-slate-300 px-2.5 py-1.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all bg-white text-slate-900',
  label: 'block text-xs sm:text-[13px] font-semibold text-slate-700 mb-1',
  error: 'border-red-500 focus:ring-red-500 focus:border-red-500',
  helperText: 'text-[11px] text-slate-500 mt-1',
};

// 6. TABLE STYLES
export const tables = {
  table: 'w-full text-xs sm:text-sm border-collapse',
  thead: 'bg-slate-50/80 text-slate-500 border-b border-slate-200',
  th: 'text-left text-[11px] sm:text-xs font-semibold uppercase tracking-wide py-2.5 px-3',
  td: 'py-2.5 px-3 border-b border-slate-100 text-slate-800',
  trHover: 'hover:bg-slate-50/70 transition-colors',
};

// 7. BADGES & CHIPS
export const badges = {
  base: 'inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold',
  success: 'bg-emerald-100 text-emerald-800',
  danger: 'bg-red-100 text-red-800',
  warning: 'bg-amber-100 text-amber-800',
  info: 'bg-sky-100 text-sky-800',
  neutral: 'bg-slate-100 text-slate-800',
  mandi: 'bg-[#e6f4ea] text-[#0e6037] border border-[#0e6037]',
};

// MASTER THEME EXPORT
export const theme = {
  colors,
  buttons,
  headers,
  cards,
  inputs,
  tables,
  badges,
};

export default theme;
