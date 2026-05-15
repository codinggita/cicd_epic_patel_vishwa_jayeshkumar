/**
 * Bookmark Constants
 *
 * Centralizes all static values used by the bookmark module.
 * Keeping strings here prevents magic literals scattered across
 * controllers and services, and makes future i18n straightforward.
 */

// ─── Response messages ────────────────────────────────────────────────────────

const BOOKMARK_MESSAGES = {
  // Success
  ADDED: "Workflow bookmarked successfully.",
  REMOVED: "Bookmark removed successfully.",
  FETCHED: "Bookmarks fetched successfully.",

  // Client errors
  ALREADY_BOOKMARKED: "You have already bookmarked this workflow.",
  NOT_BOOKMARKED: "Bookmark not found.",
  WORKFLOW_NOT_FOUND: "Workflow not found.",
};

// ─── Pagination defaults ──────────────────────────────────────────────────────

/**
 * Default page size for GET /bookmarks.
 * Kept small so the first response is fast even for heavy users.
 */
const BOOKMARK_PAGINATION = {
  DEFAULT_LIMIT: 10,
  MAX_LIMIT: 50,
};

module.exports = {
  BOOKMARK_MESSAGES,
  BOOKMARK_PAGINATION,
};
