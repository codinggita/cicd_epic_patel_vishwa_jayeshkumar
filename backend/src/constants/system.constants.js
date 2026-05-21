/**
 * system.constants.js
 *
 * Centralizes all response messages for the system monitoring module.
 */

// ─── Response messages ────────────────────────────────────────────────────────

const SYSTEM_MESSAGES = {
  STATUS_FETCHED: "System health status fetched successfully.",
  UPTIME_FETCHED: "System uptime details fetched successfully.",
  MEMORY_FETCHED: "System memory usage statistics fetched successfully.",
  ENV_FETCHED:    "Environment details fetched successfully.",
};

module.exports = {
  SYSTEM_MESSAGES,
};
