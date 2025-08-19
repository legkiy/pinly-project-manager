import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import EN from './messages/en';
import RU from './messages/ru';

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: false,
    supportedLngs: ['en', 'ru'],
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: EN,
      },
      ru: {
        translation: RU,
      },
    },
  });

export default i18n;
