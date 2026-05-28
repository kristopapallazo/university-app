import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const SUPPORTED_LANGUAGES = {
  SQ: 'sq', // Albanian
  EN: 'en', // English
};

export const useLanguageStore = create(
  persist(
    (set) => ({
      language: SUPPORTED_LANGUAGES.SQ, // Default to Albanian
      setLanguage: (lang) => {
        if (Object.values(SUPPORTED_LANGUAGES).includes(lang)) {
          set({ language: lang });
          // Update HTML lang attribute for accessibility
          document.documentElement.lang = lang;
        }
      },
      toggleLanguage: () =>
        set((state) => {
          const newLang =
            state.language === SUPPORTED_LANGUAGES.SQ
              ? SUPPORTED_LANGUAGES.EN
              : SUPPORTED_LANGUAGES.SQ;
          document.documentElement.lang = newLang;
          return { language: newLang };
        }),
    }),
    {
      name: 'language-store',
      partialize: (state) => ({ language: state.language }),
    }
  )
);

export const SUPPORTED_LANGUAGES_LIST = Object.values(SUPPORTED_LANGUAGES);
