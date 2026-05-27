/**
 * preferencesFormatter.js
 *
 * Reusable utility to format raw database query results for preferences endpoints.
 * This guarantees a consistent JSON payload structure for the client.
 */

/**
 * Formats user preferences data for API response.
 *
 * @param {Object} preferences - Raw preferences document from database
 * @returns {Object} - Formatted preferences payload
 */
const formatPreferences = (preferences) => {
  if (!preferences) return null;
  return {
    id: preferences._id,
    userId: preferences.userId,
    theme: preferences.theme,
    timezone: preferences.timezone,
    emailNotifications: preferences.emailNotifications,
    language: preferences.language,
    createdAt: preferences.createdAt,
    updatedAt: preferences.updatedAt,
  };
};

/**
 * Formats updated preferences data for API response.
 *
 * @param {Object} preferences - Updated preferences document
 * @returns {Object} - Formatted preferences payload
 */
const formatUpdatedPreferences = (preferences) => {
  return formatPreferences(preferences);
};

module.exports = {
  formatPreferences,
  formatUpdatedPreferences,
};
