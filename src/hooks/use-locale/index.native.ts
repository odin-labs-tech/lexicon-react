import { useMemo } from 'react';
import { NativeModules, Platform } from 'react-native';

import { Language } from '../../types';

/** Detects the user's locale from their device settings */
export const useLocale = () => {
  /** The locale that we detected on the user's device (formatted to focus on primary language) */
  const locale = useMemo(() => {
    /** Extract the locale from the user's native device settings */
    const detectedLocale =
      Platform.OS === 'ios'
        ? NativeModules.SettingsManager.settings.AppleLocale ||
          NativeModules.SettingsManager.settings.AppleLanguages[0]
        : NativeModules.I18nManager.localeIdentifier;

    // Fall back to English
    return detectedLocale || 'en-US';
  }, []);

  return locale as Language;
};
