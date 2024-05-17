'use client';

import React, { memo, useEffect, useCallback } from 'react';

import { TranslationContext, TranslationContextProps } from '../contexts';
import { lexicon } from '../core';
import { useLocale, useDeviceId } from '../hooks';

export type TranslationProviderProps = React.PropsWithChildren &
  Omit<TranslationContextProps, 'deviceId' | 'getTranslationFileItem'> &
  Required<Pick<TranslationContextProps, 'token'>>;

/**
 * Wraps the entire application and provides the translation context
 * to be used when translating text with this package
 */
export const TranslationProvider = memo(
  ({
    children,
    token,
    defaultLanguage = 'en-US',
    translations,
    targetLanguage,
    cacheTranslationsOnDevice = true,
    ignoreDefaultLanguageCountry = true,
    fallbackToBaseLanguage = true,
    translationGuidance,
    enableSkeletons = true,
    skeletonColor = '#D6D6D6',
    debug = false,
  }: TranslationProviderProps) => {
    /** Check the user's locale preference via the device settings */
    const { locale } = useLocale();
    /** Generate a unique id to associate with the user's device */
    const { deviceId } = useDeviceId();

    // ----------- EFFECTS -----------
    // When we initialize, we want to register the device
    useEffect(() => {
      if (locale && deviceId) {
        lexicon.registerDevice({
          deviceId,
          locale,
          token,
        });
      }
    }, [locale, deviceId]);

    // ----------- HELPERS -----------
    /** A helper method used to retrieve an item from our translation file */
    const getTranslationFileItem = useCallback(
      (key: string) => {
        return translations?.[key];
      },
      [translations]
    );

    return (
      <TranslationContext.Provider
        value={{
          token,
          defaultLanguage,
          targetLanguage: targetLanguage || locale,
          cacheTranslationsOnDevice,
          ignoreDefaultLanguageCountry,
          fallbackToBaseLanguage,
          translationGuidance,
          enableSkeletons,
          skeletonColor,
          deviceId,
          debug,
          getTranslationFileItem,
        }}>
        {children}
      </TranslationContext.Provider>
    );
  }
);
