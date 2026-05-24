/**
 * Share Constants
 *
 * Centralizes all static values used across the share module.
 * Update here and it reflects everywhere — no magic strings in business logic.
 */

// Response messages for share operations
const SHARE_MESSAGES = {
  SHARED: "Workflow shared successfully",
  FETCHED: "Shared workflows fetched successfully",
  NOT_FOUND: "Share record not found",
  ALREADY_SHARED: "Workflow already shared with this user",
};

// Permission types for shared workflows
const SHARE_PERMISSIONS = {
  VIEW: "view",
  EDIT: "edit",
};

// Default share settings
const SHARE_DEFAULTS = {
  PERMISSION: SHARE_PERMISSIONS.VIEW,
};

module.exports = {
  SHARE_MESSAGES,
  SHARE_PERMISSIONS,
  SHARE_DEFAULTS,
};
