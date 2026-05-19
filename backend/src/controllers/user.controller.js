/**
 * user.controller.js
 *
 * Controller layer for user profile endpoints.
 * Handles HTTP concerns only — no Mongoose, no business logic.
 *
 * Each handler:
 *   1. Extracts what it needs from req (user id, body).
 *   2. Delegates to the service layer.
 *   3. Sends a standardized API response.
 *   4. Lets asyncHandler forward any thrown errors to Express error middleware.
 *
 * Endpoints:
 *   GET   /api/v1/users/me  → getProfile
 *   PATCH /api/v1/users/me  → updateProfile
 */

const asyncHandler     = require("../utils/asyncHandler");
const { sendResponse } = require("../utils/apiResponse");
const userService      = require("../services/user.service");
const { USER_MESSAGES } = require("../constants/user.constants");
const HTTP_STATUS      = require("../constants/httpStatus");

// ─── getProfile ───────────────────────────────────────────────────────────────

/**
 * GET /api/v1/users/me
 *
 * Returns the authenticated user's public profile.
 * The `protect` middleware guarantees req.user._id is present.
 */
const getProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { user } = await userService.getProfile(userId);

  sendResponse(res, HTTP_STATUS.OK, USER_MESSAGES.PROFILE_FETCHED, { user });
});

// ─── updateProfile ────────────────────────────────────────────────────────────

/**
 * PATCH /api/v1/users/me
 *
 * Updates the authenticated user's profile (name, bio, avatar only).
 * Extra fields in req.body are silently ignored by the service layer.
 */
const updateProfile = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { user } = await userService.updateProfile(userId, req.body);

  sendResponse(res, HTTP_STATUS.OK, USER_MESSAGES.PROFILE_UPDATED, { user });
});

module.exports = {
  getProfile,
  updateProfile,
};
