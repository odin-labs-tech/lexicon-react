import { hash } from './hash';
import { storage } from './storage';
import { Language } from '../types';

/** An interface to interact with our translation cache */
export const cache = {
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
    // Retrieve the translation from our cache
    return storage.get(key);
  },
  /** Clear the cache */
  clear: () => {
    storage.clear();
  },
};
