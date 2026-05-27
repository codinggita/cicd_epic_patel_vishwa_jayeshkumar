/**
 * Preferences Configuration
 *
 * Centralized configuration for preferences module.
 * Adjust these values to change preferences behavior globally.
 */

const { PREFERENCES_DEFAULTS, THEME_OPTIONS, LANGUAGE_OPTIONS } = require("../constants/preferences.constants");

const preferencesConfig = {
  // Default theme for new users
  defaultTheme: PREFERENCES_DEFAULTS.THEME,

  // Default timezone for new users
  defaultTimezone: PREFERENCES_DEFAULTS.TIMEZONE,

  // Default email notification setting
  defaultEmailNotifications: PREFERENCES_DEFAULTS.EMAIL_NOTIFICATIONS,

  // Default language for new users
  defaultLanguage: PREFERENCES_DEFAULTS.LANGUAGE,

  // Available theme options
  availableThemes: Object.values(THEME_OPTIONS),

  // Available language options
  availableLanguages: Object.values(LANGUAGE_OPTIONS),

  // Fields that can be updated via PATCH endpoint
  updatableFields: ["theme", "timezone", "emailNotifications", "language"],
};

module.exports = preferencesConfig;
