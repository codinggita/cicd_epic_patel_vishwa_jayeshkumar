/**
 * user.service.js
 *
 * Service layer for user profile business logic.
 * Controllers call these functions — no Mongoose code lives in controllers.
 *
 * Functions:
 *   getProfile    — fetch the authenticated user's profile
 *   updateProfile — update allowed profile fields for the authenticated user
 */

const User = require("../models/user.model");
const { USER_PUBLIC_FIELDS } = require("../utils/selectUserFields");
const {
  USER_MESSAGES,
  USER_UPDATABLE_FIELDS,
} = require("../constants/user.constants");

// ─── Helper: throw a typed error ─────────────────────────────────────────────

/**
 * Creates and throws an Error decorated with a statusCode.
 * The global error middleware reads statusCode to set the HTTP status.
 *
 * @param {string} message    - Human-readable error message
 * @param {number} statusCode - HTTP status code (e.g. 404, 400)
 */
const throwError = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  throw err;
};

// ─── getProfile ───────────────────────────────────────────────────────────────

/**
 * Returns the safe public profile of the authenticated user.
 *
 * The `protect` middleware has already attached `req.user` to the request,
 * so we simply re-fetch with the public field selector to ensure the
 * response shape is consistent regardless of what `protect` attaches.
 *
 * @param {string} userId - ObjectId of the authenticated user (from req.user._id)
 * @returns {{ user: Object }}
 */
const getProfile = async (userId) => {
  const user = await User.findById(userId).select(USER_PUBLIC_FIELDS);
  if (!user) throwError(USER_MESSAGES.NOT_FOUND, 404);

  return { user };
};

// ─── updateProfile ────────────────────────────────────────────────────────────

/**
 * Updates allowed profile fields for the authenticated user.
 *
 * Design decisions:
 *   - Only fields listed in USER_UPDATABLE_FIELDS are applied.
 *     Any extra keys in req.body are silently ignored, which prevents
 *     mass-assignment vulnerabilities (e.g. a client trying to set role).
 *   - If the request body contains no valid fields, a 400 is returned
 *     early so the DB is not hit unnecessarily.
 *   - `{ new: true, runValidators: true }` ensures the returned document
 *     reflects the update and schema validators (e.g. maxlength on bio) run.
 *
 * @param {string} userId  - ObjectId of the authenticated user
 * @param {Object} updates - Raw req.body from the controller
 * @returns {{ user: Object }} The updated user document (public fields only)
 */
const updateProfile = async (userId, updates) => {
  // Build a safe update object — only permit whitelisted fields
  const safeUpdates = {};
  USER_UPDATABLE_FIELDS.forEach((field) => {
    if (updates[field] !== undefined) {
      safeUpdates[field] = updates[field];
    }
  });

  // Guard: reject if nothing valid was sent
  if (Object.keys(safeUpdates).length === 0) {
    throwError(USER_MESSAGES.NOTHING_TO_UPDATE, 400);
  }

  const user = await User.findByIdAndUpdate(
    userId,
    safeUpdates,
    { new: true, runValidators: true }
  ).select(USER_PUBLIC_FIELDS);

  if (!user) throwError(USER_MESSAGES.NOT_FOUND, 404);

  return { user };
};

module.exports = {
  getProfile,
  updateProfile,
};
