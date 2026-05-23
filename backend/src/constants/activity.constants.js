/**
 * Activity Constants
 *
 * Centralizes all static values used across the activity module.
 * Update here and it reflects everywhere — no magic strings in business logic.
 */

// Response messages for activity operations
const ACTIVITY_MESSAGES = {
  CREATED: "Activity recorded successfully",
  FETCHED: "Activities fetched successfully",
  NOT_FOUND: "No activities found",
  CREATE_FAILED: "Failed to record activity",
};

// Activity action types
const ACTIVITY_ACTIONS = {
  CREATE: "create",
  UPDATE: "update",
  DELETE: "delete",
  VIEW: "view",
  LIKE: "like",
  BOOKMARK: "bookmark",
  EXPORT: "export",
};

// Resource types
const RESOURCE_TYPES = {
  WORKFLOW: "workflow",
  CATEGORY: "category",
  TAG: "tag",
  USER: "user",
  REVIEW: "review",
};

// Default activity settings
const ACTIVITY_DEFAULTS = {
  DESCRIPTION: "",
};

module.exports = {
  ACTIVITY_MESSAGES,
  ACTIVITY_ACTIONS,
  RESOURCE_TYPES,
  ACTIVITY_DEFAULTS,
};
