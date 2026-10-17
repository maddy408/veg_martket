/**
 * =======================================================================
 * CENTRAL API CONFIGURATION
 * =======================================================================
 * Supports both Live Production deployment and Local Development / Mobile IP.
 * 
 * Production URLs (Sri Bhavani Vegetables):
 * - Web App: https://sribhavani-vegetables.qynova.in
 * - API URL: https://sribhavani-vegetables.qynova.in/api
 * - Dedicated API: https://api-sribhavani-vegetables.qynova.in
 * =======================================================================
 */

const getApiBaseUrl = () => {
  if (typeof window !== 'undefined' && window.location) {
    const { hostname, origin } = window.location;

    // Live Production domain
    if (hostname === 'sribhavani-vegetables.qynova.in') {
      return 'https://sribhavani-vegetables.qynova.in/api';
    }
    // Dev Production domain
    if (hostname === 'dev-sribhavani-vegetables.qynova.in') {
      return 'https://dev-sribhavani-vegetables.qynova.in/api';
    }
    // Dedicated API subdomain
    if (hostname === 'api-sribhavani-vegetables.qynova.in') {
      return 'https://api-sribhavani-vegetables.qynova.in';
    }
    // Any other *.qynova.in deployment
    if (hostname.endsWith('.qynova.in')) {
      return `${origin}/api`;
    }

    // Local Network IP Access (e.g. 192.168.x.x from ipconfig for mobile testing)
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      return `http://${hostname}/pos/veg-pos/backend/public/api`;
    }
  }

  // Explicit Vite env variable if set
  if (import.meta.env.VITE_API_BASE_URL) {
    return import.meta.env.VITE_API_BASE_URL;
  }

  // Default local development URL
  return 'http://localhost:8081/api';
};

export const API_BASE_URL = getApiBaseUrl();

export const APP_CONFIG = {
  apiBaseUrl: API_BASE_URL,
  appName: 'Sri Bhavani Vegetables',
  version: '1.0.0',
};

export default {
  API_BASE_URL,
  APP_CONFIG,
};
