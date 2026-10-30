import React, { createContext, useContext, useState, useEffect } from "react";
import { translations, TranslationDict } from "../data/translations";

export type LanguageCode = "it" | "de" | "fr" | "en";

interface LanguageContextType {
  language: LanguageCode;
  setLanguage: (lang: LanguageCode) => void;
  t: TranslationDict;
}

const STORAGE_KEY = "preventivo_app_lang";

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<LanguageCode>(() => {
    try {
      if (typeof window !== "undefined") {
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get("lang");
        if (langParam && ["it", "de", "fr", "en"].includes(langParam)) {
          return langParam as LanguageCode;
        }
      }
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && ["it", "de", "fr", "en"].includes(saved)) {
        return saved as LanguageCode;
      }
    } catch {
      // LocalStorage might be restricted
    }
    return "it";
  });

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const langParam = urlParams.get("lang");
      if (langParam && ["it", "de", "fr", "en"].includes(langParam) && langParam !== language) {
        setLanguageState(langParam as LanguageCode);
      }
    } catch {
      // ignore
    }
  }, []);

  const setLanguage = (lang: LanguageCode) => {
    setLanguageState(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // ignore
    }
  };

  const t = translations[language] || translations.it;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
