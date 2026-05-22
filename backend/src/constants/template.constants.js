/**
 * Template Constants
 *
 * Centralizes all static values used across the template module.
 * Update here and it reflects everywhere — no magic strings in business logic.
 */

// Response messages for template operations
const TEMPLATE_MESSAGES = {
  CREATED: "Template created successfully",
  FETCHED_ALL: "Templates fetched successfully",
  NOT_FOUND: "Template not found",
};

// Default field values
const TEMPLATE_DEFAULTS = {
  DESCRIPTION: "",
  CONTENT: "",
};

module.exports = {
  TEMPLATE_MESSAGES,
  TEMPLATE_DEFAULTS,
};
