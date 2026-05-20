/**
 * History Constants
 *
 * Centralizes all static values used across the history module.
 * Update here and it reflects everywhere — no magic strings in business logic.
 */

// Response messages for history operations
const HISTORY_MESSAGES = {
  CREATED: "History record created successfully",
  FETCHED: "Workflow history fetched successfully",
  NOT_FOUND: "History record not found",
};

// History action types
const HISTORY_ACTIONS = {
  CREATED: "created",
  UPDATED: "updated",
  DELETED: "deleted",
  PUBLISHED: "published",
  UNPUBLISHED: "unpublished",
};

module.exports = {
  HISTORY_MESSAGES,
  HISTORY_ACTIONS,
};
