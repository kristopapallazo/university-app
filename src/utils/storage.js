// All localStorage access goes through this file.
// If storage strategy changes, only this file needs updating.

const TOKEN_KEY = import.meta.env.VITE_TOKEN_KEY || 'uamd_access_token';
const REFRESH_TOKEN_KEY = import.meta.env.VITE_REFRESH_TOKEN_KEY || 'uamd_refresh_token';
const LANGUAGE_KEY = import.meta.env.VITE_LANGUAGE_KEY || 'uamd_language';

export const storage = {
  getToken: () => localStorage.getItem(TOKEN_KEY),
  setToken: (value) => localStorage.setItem(TOKEN_KEY, value),
  removeToken: () => localStorage.removeItem(TOKEN_KEY),

  getRefreshToken: () => localStorage.getItem(REFRESH_TOKEN_KEY),
  setRefreshToken: (value) => localStorage.setItem(REFRESH_TOKEN_KEY, value),
  removeRefreshToken: () => localStorage.removeItem(REFRESH_TOKEN_KEY),

  getLanguage: () => localStorage.getItem(LANGUAGE_KEY) || 'sq',
  setLanguage: (lang) => localStorage.setItem(LANGUAGE_KEY, lang),

  clearAllTokens: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  },
};
