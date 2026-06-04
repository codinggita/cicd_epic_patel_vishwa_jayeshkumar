const Preferences = require("../models/preferences.model");
const { PREFERENCES_DEFAULTS, PREFERENCES_MESSAGES } = require("../config/constants");
const preferencesConfig = require("../config/preferences.config");

/**
 * Fetches user preferences by user ID.
 * Creates default preferences if none exist.
 *
 * @param {String} userId - User ID
 * @returns {Object} - Preferences document
 */
const getUserPreferences = async (userId) => {
  let preferences = await Preferences.findOne({ userId });

  // Create default preferences if none exist
  if (!preferences) {
    preferences = await Preferences.create({
      userId,
      theme: preferencesConfig.defaultTheme,
      timezone: preferencesConfig.defaultTimezone,
      emailNotifications: preferencesConfig.defaultEmailNotifications,
      language: preferencesConfig.defaultLanguage,
    });
  }

  return preferences;
};

/**
 * Updates user preferences.
 *
 * @param {String} userId - User ID
 * @param {Object} updateData - Fields to update
 * @returns {Object} - Updated preferences document
 */
const updateUserPreferences = async (userId, updateData) => {
  // Filter to only allow updatable fields
  const filteredData = {};
  preferencesConfig.updatableFields.forEach((field) => {
    if (updateData[field] !== undefined) {
      filteredData[field] = updateData[field];
    }
  });

  // Find and update preferences
  const preferences = await Preferences.findOneAndUpdate(
    { userId },
    filteredData,
    { new: true, runValidators: true, upsert: true }
  );

  return preferences;
};

module.exports = {
  getUserPreferences,
  updateUserPreferences,
};
