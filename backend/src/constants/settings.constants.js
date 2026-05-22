/**
 * Settings Constants
 *
 * Centralizes all static values used across the settings module.
 * Update here and it reflects everywhere — no magic strings in business logic.
 */

// Response messages for settings operations
const SETTINGS_MESSAGES = {
  FETCHED: "User settings fetched successfully",
  UPDATED: "User settings updated successfully",
  NOT_FOUND: "User settings not found",
};

// Default field values
const SETTINGS_DEFAULTS = {
  THEME: "light",
  NOTIFICATIONS_ENABLED: true,
  LANGUAGE: "en",
};

// Available theme options
const THEME_OPTIONS = {
  LIGHT: "light",
  DARK: "dark",
};

// Available language options
const LANGUAGE_OPTIONS = {
  ENGLISH: "en",
  SPANISH: "es",
  FRENCH: "fr",
  GERMAN: "de",
};

module.exports = {
  SETTINGS_MESSAGES,
  SETTINGS_DEFAULTS,
  THEME_OPTIONS,
  LANGUAGE_OPTIONS,
};
