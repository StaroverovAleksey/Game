'use strict';

import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import {initReactI18next} from 'react-i18next';

// i18n namespaces
// @example import { NS } from 'core/i18n';
export const NS = {
    GLOBAL: 'global'
};

// i18n languages
// @example import { LANG } from 'core/i18n/i18n';
export const LANG = {
    RU: 'ru',
    EN: 'en'
};

const langs = Object.values(LANG);
const ns = Object.values(NS);
const resources = {};

// require translation resources
langs.forEach(lang => {
    const langNs = {};
    ns.forEach(key => {
        langNs[key] = require(`./${lang}/${key}.${lang}`).default;
    });
    resources[lang] = langNs;
});

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        //lng: langs[1],
        fallbackLng: langs[0],

        detection: {
            // https://github.com/i18next/i18next-browser-languageDetector
            // exclude cookies
            order: ['querystring', 'localStorage', 'navigator', 'htmlTag']
            , lookupQuerystring: 'lang'// parameter name
        },

        resources,

        ns,
        defaultNS: ns[0],

        //debug: true// uses console logs,

        interpolation: {
            escapeValue: false, // not needed for react!!
        },

        react: {
            wait: true
        }
    });

// https://www.i18next.com/add-or-load-translations.html
/*i18next.addResouceBundle('en, 'namespace1', {
    key: 'hello from namespace 1'
});*/

export default i18n.t;

