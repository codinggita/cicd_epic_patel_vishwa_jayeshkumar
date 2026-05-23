/**
 * Export Constants
 *
 * Centralizes all static values used across the export module.
 * Update here and it reflects everywhere — no magic strings in business logic.
 */

// Response messages for export operations
const EXPORT_MESSAGES = {
  WORKFLOW_EXPORTED: "Workflow exported successfully",
  SUMMARY_EXPORTED: "Workflow summary exported successfully",
  WORKFLOW_NOT_FOUND: "Workflow not found",
  EXPORT_FAILED: "Export operation failed",
};

// Export format types
const EXPORT_FORMATS = {
  JSON: "json",
  SUMMARY: "summary",
};

// Default export settings
const EXPORT_DEFAULTS = {
  INCLUDE_METADATA: true,
  INCLUDE_STATS: true,
};

module.exports = {
  EXPORT_MESSAGES,
  EXPORT_FORMATS,
  EXPORT_DEFAULTS,
};
