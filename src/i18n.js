import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';

i18n
    .use(Backend) // load translations using http (default public/assets/locals/en/translations)
    .use(initReactI18next) // pass the i18n instance to react-i18next.
    .init({
        backend: {
            loadPath: '/locales/{{ lng }}/translations.json'
        },

        fallbackLng: 'en', // fallback language is english.
        
        debug: false,
        
        interpolation: {
            escapeValue: false, // no need for react. it escapes by default
            formatSeparator: ','
        },

        detection: {
            checkWhitelist: true, // options for language detection
        }
    });

export default i18n;
