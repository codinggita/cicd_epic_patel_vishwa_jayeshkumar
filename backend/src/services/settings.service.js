const Settings = require("../models/settings.model");
const { SETTINGS_DEFAULTS } = require("../config/constants");

/**
 * Fetches settings for a specific user.
 * Creates default settings if none exist.
 *
 * @param {String} userId - ID of the user
 * @returns {Object} - User settings document
 */
const getUserSettings = async (userId) => {
  let settings = await Settings.findOne({ userId });

  if (!settings) {
    settings = await Settings.create({
      userId,
      theme: SETTINGS_DEFAULTS.THEME,
      notificationsEnabled: SETTINGS_DEFAULTS.NOTIFICATIONS_ENABLED,
      language: SETTINGS_DEFAULTS.LANGUAGE,
    });
  }

  return settings;
};

/**
 * Updates settings for a specific user.
 *
 * @param {String} userId - ID of the user
 * @param {Object} data - Settings fields to update
 * @returns {Object} - Updated settings document
 */
const updateUserSettings = async (userId, data) => {
  const { theme, notificationsEnabled, language } = data;

  const settings = await Settings.findOneAndUpdate(
    { userId },
    { theme, notificationsEnabled, language },
    { new: true, upsert: true }
  );

  return settings;
};

module.exports = {
  getUserSettings,
  updateUserSettings,
};
