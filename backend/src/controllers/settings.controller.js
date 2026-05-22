const {
  getUserSettings,
  updateUserSettings,
} = require("../services/settings.service");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatus");
const { SETTINGS_MESSAGES } = require("../constants/settings.constants");

/**
 * GET /api/v1/settings
 * Returns settings for the authenticated user.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const getSettings = asyncHandler(async (req, res) => {
  const settings = await getUserSettings(req.user.id);
  sendResponse(res, HTTP_STATUS.OK, SETTINGS_MESSAGES.FETCHED, settings);
});

/**
 * PATCH /api/v1/settings
 * Updates settings for the authenticated user.
 *
 * TODO (future PR): Add request body validation before calling service
 */
const updateSettings = asyncHandler(async (req, res) => {
  const settings = await updateUserSettings(req.user.id, req.body);
  sendResponse(res, HTTP_STATUS.OK, SETTINGS_MESSAGES.UPDATED, settings);
});

module.exports = { getSettings, updateSettings };
