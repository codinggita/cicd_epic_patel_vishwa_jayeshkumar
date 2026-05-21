/**
 * admin.constants.js
 *
 * Centralizes response messages and client error strings for the admin module.
 */

const ADMIN_MESSAGES = {
  // Success
  USERS_FETCHED: "Users fetched successfully.",
  USER_FETCHED:  "User details fetched successfully.",

  // Client errors
  USER_NOT_FOUND: "User not found.",
  FORBIDDEN:      "Access denied. Admin privileges required.",
};

module.exports = {
  ADMIN_MESSAGES,
};
