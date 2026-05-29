/**
 * Translations for Albanian (sq) and English (en)
 * Add new translation keys here and use them throughout the app via useTranslation hook
 */

export const translations = {
  sq: {
    // Common UI
    language: 'Gjuha',
    albanian: 'Shqip',
    english: 'English',
    toggleLanguage: 'Ndarro gjuhën',

    // Layout / Navigation
    home: 'Ballina',
    profile: 'Profili',
    logout: 'Dil',
    notification: 'Njoftimet',

    // Authentication
    login: 'Hyr',
    email: 'Email',
    password: 'Fjalëkalimi',
    forgotPassword: 'Pamllje fjalëkalimet?',

    // Common actions
    save: 'Ruaj',
    cancel: 'Anulo',
    delete: 'Fshij',
    edit: 'Redakto',
    add: 'Shto',
    search: 'Kërko',
    filter: 'Filtro',
    export: 'Eksporto',
    import: 'Importo',
    loading: 'Po ngarkohet...',
    error: 'Gabim',
    success: 'Sukses',
    warning: 'Paralajmërim',
    info: 'Informacion',

    // Form validation
    required: 'Kjo fushë është e detyrueshme',
    invalidEmail: 'Email-i nuk është valid',
    invalidPassword: 'Fjalëkalimi duhet të ketë të paktën 8 karaktere',

    // Errors
    notFound: 'Nuk u gjet',
    unauthorized: 'I paautorizuar',
    forbidden: 'I ndaluar',
    serverError: 'Gabim në server',
    networkError: 'Gabim në rrjet',
  },

  en: {
    // Common UI
    language: 'Language',
    albanian: 'Shqip',
    english: 'English',
    toggleLanguage: 'Toggle Language',

    // Layout / Navigation
    home: 'Home',
    profile: 'Profile',
    logout: 'Logout',
    notification: 'Notifications',

    // Authentication
    login: 'Login',
    email: 'Email',
    password: 'Password',
    forgotPassword: 'Forgot password?',

    // Common actions
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    import: 'Import',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Information',

    // Form validation
    required: 'This field is required',
    invalidEmail: 'Invalid email format',
    invalidPassword: 'Password must be at least 8 characters',

    // Errors
    notFound: 'Not Found',
    unauthorized: 'Unauthorized',
    forbidden: 'Forbidden',
    serverError: 'Server Error',
    networkError: 'Network Error',
  },
};

/**
 * Get translation for a specific key
 * @param {string} language - Language code ('sq' or 'en')
 * @param {string} key - Translation key
 * @returns {string} Translated string or key if not found
 */
export const t = (language, key) => {
  return translations[language]?.[key] ?? key;
};
