import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';
import res from './resources.json';

export default () => {
  i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
      debug: process.env.NODE_ENV === 'development',
      fallbackLng: ['en', 'cs'],
      keySeparator: false, // we do not use keys in form messages.welcome
      interpolation: {
        escapeValue: false, // react already safes from xss
      },
      react: { useSuspense: false },
      resources: res,
      detection: {
        order: [
          'querystring',
          'cookie',
          'localStorage',
          'navigator',
          'htmlTag',
          'path',
          'subdomain',
        ],
        caches: ['localStorage', 'cookie'],
        lookupCookie: 'i18next',
        lookupLocalStorage: 'i18nextLng',
      },
    });

  return i18n;
};
