import { useContext, useCallback } from 'react';

import { useCache } from './useCache';
import { TranslationContext } from '../contexts';
import { lexicon } from '../core';
import type { Language } from '../types';

/** The options available to pass to our translation methods / component */
export type TranslationOptions = Omit<
  Partial<Parameters<typeof lexicon.translate>[1]>,
  'token' | 'translationGuidance' | 'deviceId'
> & {
  /** Whether we should disable the translation for this particular element (useful when passing in text you'd rather leave alone) */
  disableTranslation?: boolean;
};

/** Returns the translate method to allow for manual translation logic */
export const useTranslator = () => {
  // Extract our configuration from the context
  const {
    defaultLanguage,
    targetLanguage,
    cacheTranslationsOnDevice,
    token,
    ignoreDefaultLanguageCountry,
    translationGuidance,
    deviceId,
  } = useContext(TranslationContext);
  // Get the cache utility methods
  const cache = useCache();

  /** The translation logic specific to this framework */
  const translate = useCallback(
    async (
      text: string,
      { from, to, context, ...options }: Omit<TranslationOptions, 'disableTranslation'> = {}
    ): Promise<{ translation: string; isSuccess: boolean }> => {
      // If the token was not set, throw an error
      if (!token)
        throw new Error(
          '[@lexiconjs/react] Please provide the `token` from your lexiconjs.com dashboard'
        );

      // If text is not a string, the library is being using incorrectly
      if (typeof text !== 'string') throw new Error('[@lexiconjs/react] text must be a string');

      try {
        // Determine the languages that we will be translating from / to
        const fromLanguage = (from || defaultLanguage) as Language;
        const toLanguage = (to || targetLanguage) as Language;

        // If the we are already in the user's preferred language, just return
        if (ignoreDefaultLanguageCountry && fromLanguage.split('-')[0] === toLanguage.split('-')[0])
          return { translation: text, isSuccess: true };
        else if (fromLanguage === toLanguage) return { translation: text, isSuccess: true };

        // Check whether we're caching the translations on the device
        if (cacheTranslationsOnDevice) {
          // If so, check whether the translation already exists in the cache
          const cachedTranslation = cache.get({
            language: toLanguage,
            originalText: text,
            context,
          });
          // If we found the translation, return it
          if (cachedTranslation) {
            // Set the state to our cached result and return early
            return { translation: cachedTranslation, isSuccess: true };
          }
        }

        // Run the actual translation
        const { translation, isSuccess } = await lexicon.translate(text, {
          from: fromLanguage,
          to: toLanguage,
          token,
          context,
          translationGuidance,
          deviceId: deviceId as string,
          ...options,
        });

        // And store it in the cache if we're caching and the query was successful
        if (isSuccess && cacheTranslationsOnDevice)
          cache.set({
            language: toLanguage,
            originalText: text,
            context,
            translatedText: translation,
          });

        // Return the translation
        return { translation, isSuccess };
      } catch (err) {
        console.error('[@lexiconjs/react] There was a problem translating the text', err);
        // Fall back to the provided text if we failed to translate
        return { translation: text, isSuccess: false };
      }
    },
    [defaultLanguage, targetLanguage, cacheTranslationsOnDevice, token, deviceId]
  );

  return {
    translate,
  };
};
