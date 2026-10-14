/**
 * =======================================================================
 * CENTRAL API CONFIGURATION
 * =======================================================================
 * Change the API Base URL here in ONE place to apply it across the
 * entire application.
 * 
 * 1. Default local URL: http://localhost/pos/veg-pos/backend/public/api
 * 2. Or set VITE_API_BASE_URL in your frontend/.env file
 * =======================================================================
 */

export const API_BASE_URL = 
  import.meta.env.VITE_API_BASE_URL || 
  'http://localhost/pos/veg-pos/backend/public/api';

export const APP_CONFIG = {
  apiBaseUrl: API_BASE_URL,
  appName: 'AJ Agency ERP',
  version: '1.0.0',
};

export default {
  API_BASE_URL,
  APP_CONFIG,
};
