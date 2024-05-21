# @lexiconjs/react

## 3.0.0

### Major Changes

- bca2621: Added the ability to load translation files to improve performance and reduce queries

## 2.3.0

### Minor Changes

- ac5e7dd: Added hashing library to make cache key consistent with backend

## 2.2.2

### Patch Changes

- 7e77a7e: Handled special locale strings like @calendar=gregorian

## 2.2.1

### Patch Changes

- 488292f: Added some additional error handling

## 2.2.0

### Minor Changes

- 8eafa69: Made react-native-mmkv a peer dependency since expo won't link it automatically

## 2.1.0

### Minor Changes

- 045199a: Added device configuration settings

## 2.0.0

### Major Changes

- a96d68e: Updated the way locales are handled.

## 1.6.2

### Patch Changes

- 14aefd2: Updated hash to incorporate the translationGuidance (changing it should create new translations in cache).

## 1.6.1

### Patch Changes

- d802073: Modified loading logic slightly for children of parent.

## 1.6.0

### Minor Changes

- 4e0b5bb: Added logic to handle nested children primitives (concatenating them for contextual translation).

## 1.5.4

### Patch Changes

- ed11ce1: Fixed some loading logic that caused things to reload.

## 1.5.3

### Patch Changes

- b39700a: Started tracking device id in requests.
- c291687: Modified nested contextual translation loading logic to keep children in a loading state until the parent loads.

## 1.5.2

### Patch Changes

- 07765b0: Standardized locale formatting to use dashes.
- 0695f68: Added `translationGuidance` prop to Provider to allow for deeper control over translation model.

## 1.5.1

### Patch Changes

- 643b090: Exporting useLocale hook to provide detected locale.

## 1.5.0

### Minor Changes

- e45730b: Replaced pacakger to ensure react-native works as expected.

## 1.4.0

### Minor Changes

- 297f166: Updated contextual translation lgoic to rely on context rather than specific prop drilling.

## 1.3.5

### Patch Changes

- c8e5d35: Stopped translating raw numbers.
- 897c7d6: Resolved an issue where a singular node wrapped in a Text element did not properly reinject.

## 1.3.4

### Patch Changes

- 557b6d3: Removed an unused dependency from package.json.

## 1.3.3

### Patch Changes

- c59f44c: Prevented queries from being performed when input is an empty string.

## 1.3.0

### Minor Changes

- 13725f6: Updated useTranslation return type to include status.

## 1.2.0

### Minor Changes

- e0daf25: Added logic to handle undefined children effectively.

## 1.1.1

### Patch Changes

- 977e485: Fixed the types on TranslatedText
- 977e485: Fixed some Skeleton logic to ensure contextual translation works as expected.

## 1.1.0

### Minor Changes

- 7840688: Added Skeleton loading functionality.

## 1.0.0

### Major Changes

- 154bc67: First major release! Added contextual translations, addditional examples, and improved caching.

## 0.2.0

### Minor Changes

- e8b7230: Added the ability to disable translations for a given block of text

### Patch Changes

- 597a84b: Updated API call to use POST and swapped out axios.

## 0.1.3

### Patch Changes

- 18f2ee4: Made the useTranslator hook available for manual translations. Modified the language options to include country codes and added an option to disable translations between countries in the same base language.
- 1fe39f3: Added "context" property to allow users to provide additional context for translations.
- 4754053: Added country code to translation locale

## 0.1.1

### Patch Changes

- da7d9db: Minor fixes

## 0.1.0

### Minor Changes

- df4f068: Initial release of SDK
