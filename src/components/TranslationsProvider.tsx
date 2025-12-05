'use client';

import { I18nextProvider } from 'react-i18next';
import { createInstance } from 'i18next';
import { initReactI18next } from 'react-i18next';
import { ReactNode, useMemo } from 'react';

export default function TranslationsProvider({
  children,
  locale,
  namespaces,
  resources,
}: {
  children: ReactNode;
  locale: string;
  namespaces: string[];
  resources: any;
}) {
  const i18n = useMemo(() => {
    const instance = createInstance();

    instance.use(initReactI18next).init({
      lng: locale,
      resources,
      fallbackLng: 'en',
      supportedLngs: ['en', 'de', 'es', 'fr', 'it', 'pt', 'ja', 'zh', 'ko'],
      defaultNS: namespaces[0],
      fallbackNS: namespaces[0],
      ns: namespaces,
      interpolation: {
        escapeValue: false,
      },
    });

    return instance;
  }, [locale, namespaces, resources]);

  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
