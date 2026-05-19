/**
 * user.constants.js
 *
 * Centralizes all static values used by the user profile module.
 * Keeping strings here prevents magic literals scattered across
 * controllers and services, and makes future updates a one-line change.
 */

// ─── Response messages ────────────────────────────────────────────────────────

const USER_MESSAGES = {
  // Success
  PROFILE_FETCHED: "Profile fetched successfully.",
  PROFILE_UPDATED: "Profile updated successfully.",

  // Client errors
  NOT_FOUND:       "User not found.",
  NOTHING_TO_UPDATE: "No valid fields provided to update.",
};

// ─── Updatable fields whitelist ───────────────────────────────────────────────

/**
 * Only these fields may be changed through the PATCH /users/me endpoint.
 * This is the single source of truth — service logic reads from here so
 * adding a new updatable field in the future is a one-line change.
 */
const USER_UPDATABLE_FIELDS = ["name", "bio", "avatar"];

module.exports = {
  USER_MESSAGES,
  USER_UPDATABLE_FIELDS,
};
