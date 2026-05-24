/**
 * Session Constants
 *
 * Centralizes all static values used across the session module.
 * Update here and it reflects everywhere — no magic strings in business logic.
 */

// Response messages for session operations
const SESSION_MESSAGES = {
  FETCHED: "Sessions fetched successfully",
  TERMINATED: "Session terminated successfully",
  NOT_FOUND: "Session not found",
  TERMINATE_FAILED: "Failed to terminate session",
};

// Session status types
const SESSION_STATUS = {
  ACTIVE: "active",
  INACTIVE: "inactive",
  TERMINATED: "terminated",
};

// Default session settings
const SESSION_DEFAULTS = {
  DEVICE: "unknown",
  IP_ADDRESS: "0.0.0.0",
  STATUS: SESSION_STATUS.ACTIVE,
};

module.exports = {
  SESSION_MESSAGES,
  SESSION_STATUS,
  SESSION_DEFAULTS,
};
