import FontAwesome from '@expo/vector-icons/FontAwesome';
import { TranslationProvider } from '@lexiconjs/react';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';

// import translations from '../translations.json';

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

function RootLayoutNav() {
  return (
    <TranslationProvider
      defaultLanguage="en-US"
      token={process.env.EXPO_PUBLIC_LEXICON_PUBLISHABLE_KEY as string}
      // You shouldn't need this props in production, but it's useful for testing and generating your first language file
      // (we automatically determine targetLanguage based on device settings)
      targetLanguage="es"
      // You can also leave out the debug prop in production
      debug
      // You can provide a translation file from your dashboard to reduce backend queries
      // translations={translations}
    >
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </TranslationProvider>
  );
}
