/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        tamil: ['"Noto Sans Tamil"', 'sans-serif'],
      },
      colors: {
        brand: {
          dark: '#0a1733',
          border: '#0f224a',
          50: '#f0f6ff',
          100: '#e0edff',
          200: '#c7ddfe',
          300: '#9ec4fc',
          400: '#6ba3f8',
          500: '#2563eb',
          600: '#1d4ed8',
          700: '#1e3a8a',
          800: '#0f224a',
          900: '#0a1733',
          950: '#050c1e',
        },
        mandi: {
          DEFAULT: '#0e6037',
          light: '#e6f4ea',
          hover: '#0a4729',
          red: '#dc2626',
        },
      },
    },
  },
  plugins: [],
};
