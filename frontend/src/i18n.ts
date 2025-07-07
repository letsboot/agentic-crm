import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import en from "./locales/en.json";
import de from "./locales/de.json";
import ja from "./locales/ja.json";

const resources = {
  en: { translation: en },
  de: { translation: de },
  ja: { translation: ja },
};

const storedLang = localStorage.getItem("language") || "en";

void i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: storedLang,
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });

export default i18n;
