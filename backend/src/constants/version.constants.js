/**
 * Version Constants
 *
 * Centralizes all static values used across the version module.
 * Update here and it reflects everywhere — no magic strings in business logic.
 */

// Response messages for version operations
const VERSION_MESSAGES = {
  CREATED: "Workflow version created successfully",
  FETCHED_ALL: "Workflow versions fetched successfully",
  NOT_FOUND: "Workflow versions not found",
};

// Default field values
const VERSION_DEFAULTS = {
  CONTENT: "",
};

module.exports = {
  VERSION_MESSAGES,
  VERSION_DEFAULTS,
};
