const {
  getUserPreferences,
  updateUserPreferences,
} = require("../services/preferences.service");
const {
  formatPreferences,
  formatUpdatedPreferences,
} = require("../utils/preferencesFormatter");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatus");
const { PREFERENCES_MESSAGES } = require("../constants/preferences.constants");

/**
 * GET /api/v1/preferences
 * Returns user preferences for the authenticated user.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const getPreferences = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const preferences = await getUserPreferences(userId);
  const formattedPreferences = formatPreferences(preferences);
  sendResponse(res, HTTP_STATUS.OK, PREFERENCES_MESSAGES.FETCHED, formattedPreferences);
});

/**
 * PATCH /api/v1/preferences
 * Updates user preferences for the authenticated user.
 */
const updatePreferences = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const preferences = await updateUserPreferences(userId, req.body);
  const formattedPreferences = formatUpdatedPreferences(preferences);
  sendResponse(res, HTTP_STATUS.OK, PREFERENCES_MESSAGES.UPDATED, formattedPreferences);
});

module.exports = {
  getPreferences,
  updatePreferences,
};
