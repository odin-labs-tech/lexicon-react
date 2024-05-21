'use client';

import React from 'react';

import type { Language } from '../types';

export type TranslationContextProps = {
  /** The token that is used to authenticate with the backend */
  token?: string;
  /**
   * The default language that the text in the app is written in.
   *
   * We highly recommended providing this to avoid translating text for users already utilizing the default language - ex. translating 'en' -> 'en').
   *
   * Defaults to "en-US" (English)
   */
  defaultLanguage?: Language;
  /**
   * The import for the translation file generated by Lexicon. This file is used to pre-load translations on the user's device to improve load times and reduce API calls.
   *
   * You can generate a fresh file by visiting the Lexicon dashboard and clicking "Generate Translation File" in the "Translations" tab.
   */
  translations?: Record<string, string>;
  /**
   * *Optional* - The target language that we are trying to convert all text within the app to.
   *
   * We recommend not providing this so that the app is translated in all languages based on the user's device settings.
   *
   * Defaults to the detected user's language (based on device settings)
   */
  targetLanguage?: Language;
  /**
   * *Optional* - Whether or not to store cached translations on the device
   *
   * We highly recommended leaving this to `true` in order to reduce calls to the API and improve performance.
   *
   * Defaults to `true`
   */
  cacheTranslationsOnDevice?: boolean;
  /**
   * *Optional* - Whether or not we should translate when the `targetLanguage` country is different from our `defaultLanguage` (even when the base language is the same).
   * This can be useful if you expect some nuances in the dialects between your country and other countries that speak the same language, but isn't always necessary.
   *
   * For example, if this is set to `false`, then we will translate "en-US" [English United States] -> "en-GB" [English Great Britain] (even though the base language is the same, the country is different).
   * Leaving it set to `true` will reduce the number of translations you have to pay for ("en-US" -> "en-GB" will not be translated and will remain as "en-US" when rendered).
   *
   * Defaults to `true`
   */
  ignoreDefaultLanguageCountry?: boolean;
  /**
   * *Optional* - When we are checking our pre-loaded `translationFile` for a translation that matches the `targetLanguage`, this determines whether or not we should attempt to fallback to a matching entry with the same base language when we can't find an entry for the entire locale (including country code).
   * We usually recommend leaving this as `true` to save on costs and reduce queries unless you expect some nuances in the dialects between your users' countries and want to be as accurate as possible.
   *
   * For example, if this is left as `true` and we are trying to translate to "es-ES" [Spanish Spain], but we only have a translation file that contains the correct translations for "es" [Spanish], then we will simply use the "es" translations for this user (ignoring the country code and falling back to the more generic base language).
   * If you set this to `false`, we would instead generate a fresh translation for "es-ES" and then cache it on the user's device.
   *
   * Defaults to `true`
   */
  fallbackToBaseLanguage?: boolean;
  /**
   * *Optional* - The hex color to use for the Skeleton background color (we don't currently animate the skeleton).
   *
   * Defaults to `#D6D6D6`
   */
  skeletonColor?: string;
  /**
   * *Optional* - Whether or not we should render skeletons while we wait for our text to be translated.
   *
   * Defaults to `true`
   */
  enableSkeletons?: boolean;
  /**
   * *Optional* - If you wish to tweak the translation model and give it some additional guidance (for example, if it isn't handling certain translations the way you'd like),
   * you can provide a short message her to help guide the translation model.
   *
   * For example, you could say something like "Keep all currency formatting in the original language" to ensure currency is treated a certain way.
   *
   * Defaults to `undefined`
   */
  translationGuidance?: string;
  /** *Optional* - Whether we should output some debug logs to the console */
  debug?: boolean;
  /** A unique id to associate with the current device / translations */
  deviceId?: string;
  /** A helper method used to retrieve an entry from a pre-generated translation file (if any is provided) */
  getTranslationFileItem?: (key: string) => string | undefined;
};

// ---------------------- START MAIN ---------------------- //
/** Provides global state surrounding our translations */
export const TranslationContext = React.createContext<TranslationContextProps>({});
// ---------------------- END MAIN ---------------------- //
