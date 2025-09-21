import i18n from "i18next"
import { initReactI18next } from "react-i18next"
import LanguageDetector from "i18next-browser-languagedetector"

import en from "@/assets/locales/en.json"
import vi from "@/assets/locales/vi.json"

i18n
  .use(LanguageDetector) 
  .use(initReactI18next)
  .init({
    fallbackLng: "en",
    supportedLngs: ["en", "vi"],
    interpolation: {
      escapeValue: false,
    },
    detection: {
      order: ["localStorage", "navigator"],
      caches: ["localStorage"], 
    },
    resources: {
      en: { translation: en },
      vi: { translation: vi },
    },
  })

export default i18n
