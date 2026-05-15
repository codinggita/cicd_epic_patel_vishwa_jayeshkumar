/**
 * Comment Constants
 *
 * Centralizes all static values used by the comment module.
 * Keeping strings here prevents magic literals scattered across
 * controllers and services, and makes future updates a one-line change.
 */

// ─── Response messages ────────────────────────────────────────────────────────

const COMMENT_MESSAGES = {
  // Success
  ADDED:   "Comment added successfully.",
  FETCHED: "Comments fetched successfully.",
  UPDATED: "Comment updated successfully.",
  DELETED: "Comment deleted successfully.",

  // Client errors
  NOT_FOUND:          "Comment not found.",
  WORKFLOW_NOT_FOUND: "Workflow not found.",
  UNAUTHORIZED:       "You are not authorized to modify this comment.",
  CONTENT_REQUIRED:   "Comment content cannot be empty.",
};

// ─── Content constraints ──────────────────────────────────────────────────────

/**
 * Mongoose's maxlength enforces this at the schema level.
 * The constant is exported so the frontend can mirror the same limit.
 */
const COMMENT_CONTENT = {
  MAX_LENGTH: 1000, // characters
};

// ─── Pagination defaults ──────────────────────────────────────────────────────

const COMMENT_PAGINATION = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 50,
};

module.exports = {
  COMMENT_MESSAGES,
  COMMENT_CONTENT,
  COMMENT_PAGINATION,
};
