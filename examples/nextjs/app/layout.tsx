import { TranslationProvider } from '@lexiconjs/react';
import type { Metadata } from 'next';
import './globals.css';

// import translations from '../translations.json';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <TranslationProvider
          defaultLanguage="en-US"
          token={process.env.NEXT_PUBLIC_LEXICON_PUBLISHABLE_KEY as string}
          // You can leave out the debug prop in production
          debug
          // You can provide a translation file from your dashboard to reduce backend queries
          // translations={translations}
        >
          {children}
        </TranslationProvider>
      </body>
    </html>
  );
}
