const { PREFERENCES_DEFAULTS, THEME_OPTIONS, LANGUAGE_OPTIONS } = require("../config/constants");

const preferencesConfig = {
  defaultTheme: PREFERENCES_DEFAULTS.THEME,
  defaultTimezone: PREFERENCES_DEFAULTS.TIMEZONE,
  defaultEmailNotifications: PREFERENCES_DEFAULTS.EMAIL_NOTIFICATIONS,
  defaultLanguage: PREFERENCES_DEFAULTS.LANGUAGE,

  availableThemes: Object.values(THEME_OPTIONS),
  availableLanguages: Object.values(LANGUAGE_OPTIONS),
  updatableFields: ["theme", "timezone", "emailNotifications", "language"],
};

module.exports = preferencesConfig;