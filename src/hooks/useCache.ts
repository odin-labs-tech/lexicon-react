import { useMemo } from 'react';

import { useTranslationContext } from './useTranslationContext';
import { hash } from '../core/hash';
import { storage } from '../core/storage';
import { Language } from '../types';

/** Provides access to our caching utility methods */
export const useCache = () => {
  const { fallbackToBaseLanguage, getTranslationFileItem } = useTranslationContext();

  return useMemo(() => {
    return {
      /** Stores a translation in our cache */
      set: ({
        language,
        originalText,
        context,
        translationGuidance,
        translatedText,
      }: {
        language: Language;
        originalText: string;
        context?: string;
        translationGuidance?: string;
        translatedText: string;
      }) => {
        /** Generate a translation key by hashing our parameters */
        const key = hash.createTranslationKey({
          targetLanguage: language,
          translationGuidance,
          context,
          originalText,
        });
        // Store the translation in our cache
        storage.set(key, translatedText);
      },
      /** Retrieves a translation from our cache */
      get: ({
        language,
        originalText,
        context,
        translationGuidance,
      }: {
        language: Language;
        originalText: string;
        context?: string;
        translationGuidance?: string;
      }) => {
        /** Generate a translation key by hashing our parameters */
        const key = hash.createTranslationKey({
          targetLanguage: language,
          translationGuidance,
          context,
          originalText,
        });

        /** Check for a cached translation in multiple locations (first we check our translation file) */
        let translation: string | undefined | null = getTranslationFileItem?.(key);
        // If we didn't find a direct entry in our translation file, fallback to the base language if appropriate
        if (!translation && fallbackToBaseLanguage) {
          // Remove the country code from our key (es-ES_translation -> es_translation)
          const baseLanguageKey = key.replace(/([a-z]{2})-[A-Z]{2}(_.*)/, '$1$2');
          translation = getTranslationFileItem?.(baseLanguageKey);
        }
        // If we didn't find anything in our translation file, check our local device storage cache
        if (!translation) translation = storage.get(key);

        // Return our final cached version
        return translation;
      },
      /** Clear the cache */
      clear: () => {
        storage.clear();
      },
    };
  }, [fallbackToBaseLanguage, getTranslationFileItem]);
};
