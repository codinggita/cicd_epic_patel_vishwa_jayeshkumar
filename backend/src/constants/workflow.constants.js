/**
 * Workflow Constants
 *
 * Centralizes all static values used across the workflow module.
 * Update here and it reflects everywhere — no magic strings in business logic.
 */

// Allowed CI/CD topic categories (maps to `topic` field in the dataset)
const WORKFLOW_CATEGORIES = [
  "github-actions",
  "gitlab-ci",
  "jenkins",
  "circleci",
  "testing",
];

// Difficulty levels (maps to `difficulty` field in the dataset)
const WORKFLOW_DIFFICULTY = ["beginner", "intermediate", "advanced"];

// Default field values
const WORKFLOW_DEFAULTS = {
  VIEWS: 0,
  LIKES: 0,
  IS_ARCHIVED: false,
};

module.exports = {
  WORKFLOW_CATEGORIES,
  WORKFLOW_DIFFICULTY,
  WORKFLOW_DEFAULTS,
};
