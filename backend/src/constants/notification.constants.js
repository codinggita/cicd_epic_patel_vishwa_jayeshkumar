/**
 * Notification Constants
 *
 * Centralizes all static values used across the notification module.
 * Update here and it reflects everywhere — no magic strings in business logic.
 */

// Response messages for notification operations
const NOTIFICATION_MESSAGES = {
  FETCHED_ALL: "Notifications fetched successfully",
  MARKED_READ: "Notification marked as read",
  NOT_FOUND: "Notification not found",
  UNAUTHORIZED: "You are not authorized to access this notification",
};

// Default field values
const NOTIFICATION_DEFAULTS = {
  IS_READ: false,
};

// Notification types
const NOTIFICATION_TYPES = {
  WORKFLOW_CREATED: "workflow_created",
  WORKFLOW_UPDATED: "workflow_updated",
  REVIEW_RECEIVED: "review_received",
  BOOKMARK_ADDED: "bookmark_added",
  MENTION: "mention",
};

module.exports = {
  NOTIFICATION_MESSAGES,
  NOTIFICATION_DEFAULTS,
  NOTIFICATION_TYPES,
};
