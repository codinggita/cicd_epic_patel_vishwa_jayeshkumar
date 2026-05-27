/**
 * Preferences Constants
 *
 * Centralizes all static values used across the preferences module.
 * Update here and it reflects everywhere — no magic strings in business logic.
 */

// Response messages for preferences operations
const PREFERENCES_MESSAGES = {
  FETCHED: "User preferences fetched successfully",
  UPDATED: "User preferences updated successfully",
  NOT_FOUND: "Preferences not found",
};

// Available theme options
const THEME_OPTIONS = {
  LIGHT: "light",
  DARK: "dark",
  SYSTEM: "system",
};

// Available language options
const LANGUAGE_OPTIONS = {
  EN: "en",
  ES: "es",
  FR: "fr",
  DE: "de",
};

// Default preference values
const PREFERENCES_DEFAULTS = {
  THEME: THEME_OPTIONS.SYSTEM,
  TIMEZONE: "UTC",
  EMAIL_NOTIFICATIONS: true,
  LANGUAGE: LANGUAGE_OPTIONS.EN,
};

module.exports = {
  PREFERENCES_MESSAGES,
  THEME_OPTIONS,
  LANGUAGE_OPTIONS,
  PREFERENCES_DEFAULTS,
};
