import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { getSettings } from '../api/settings';
import { useAuth } from './useAuth';
import { isMojibake } from '../utils/format';

const SettingsContext = createContext(null);

export function SettingsProvider({ children }) {
  const { user } = useAuth();
  const { i18n, t } = useTranslation();
  const [settings, setSettings] = useState(() => {
    try {
      const cached = localStorage.getItem('veg_pos_settings');
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  const reloadSettings = useCallback(async () => {
    if (!user) return;
    try {
      const data = await getSettings();
      setSettings(data);
      localStorage.setItem('veg_pos_settings', JSON.stringify(data));
      return data;
    } catch (e) {
      console.error('Failed to load settings', e);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      reloadSettings();
    } else {
      setSettings(null);
      localStorage.removeItem('veg_pos_settings');
    }
  }, [user, reloadSettings]);

  const companyName = (() => {
    const defaultTamil = 'ஸ்ரீ பவானி காய்கனி கமிஷன் வியாபாரம்';
    const defaultEn = 'Sri Bhavani Vegetables';

    if (!settings) {
      return i18n.language === 'ta' ? defaultTamil : defaultEn;
    }

    const isTamil = i18n.language === 'ta';
    if (isTamil) {
      const ta = settings.company_name_ta?.trim();
      if (ta && !isMojibake(ta) && !ta.includes('?')) {
        return ta;
      }
      const en = settings.company_name_en?.trim();
      if (en && !isMojibake(en)) {
        return defaultTamil;
      }
      return defaultTamil;
    }

    const en = settings.company_name_en?.trim();
    if (en && !isMojibake(en)) {
      return en;
    }
    const ta = settings.company_name_ta?.trim();
    if (ta && !isMojibake(ta)) {
      return ta;
    }
    return defaultEn;
  })();

  return (
    <SettingsContext.Provider value={{ settings, companyName, reloadSettings, setSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) {
    return {
      settings: null,
      companyName: '',
      reloadSettings: () => Promise.resolve(),
      setSettings: () => {},
    };
  }
  return ctx;
}
