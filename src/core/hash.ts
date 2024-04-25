import { hash as ohash } from 'ohash';

/** A utility used to hash strings */
export const hash = {
  /** Create a unique hash using our provided parameters */
  createTranslationKey: ({
    targetLanguage,
    translationGuidance,
    context,
    originalText,
  }: {
    targetLanguage: string;
    translationGuidance?: string;
    context?: string;
    originalText: string;
  }) => {
    /** Start by hashing the various text components of our translation */
    const textHash = hash.hashString(
      `${translationGuidance ?? ''}:${context ?? ''}:${originalText}`
    );

    // Generate the final key (include target language to avoid overlap between languages)
    return `${targetLanguage}_${textHash}`;
  },
  /** Hash a string into something easily stored / checked */
  hashString: (str: string) => {
    return ohash(str);
  },
};
