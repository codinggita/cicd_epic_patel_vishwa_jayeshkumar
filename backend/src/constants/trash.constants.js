/**
 * Trash Constants
 *
 * Centralizes all static values used across the trash module.
 * Update here and it reflects everywhere — no magic strings in business logic.
 */

// Response messages for trash operations
const TRASH_MESSAGES = {
  MOVED_TO_TRASH: "Workflow moved to trash successfully",
  RESTORED: "Workflow restored from trash successfully",
  FETCHED_ALL: "Trashed workflows fetched successfully",
  NOT_FOUND: "Trash record not found",
  WORKFLOW_NOT_FOUND: "Workflow not found",
};

// Restore status values
const RESTORE_STATUS = {
  ACTIVE: "active",
  RESTORED: "restored",
};

module.exports = {
  TRASH_MESSAGES,
  RESTORE_STATUS,
};
