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

// ─── Query endpoint limits ────────────────────────────────────────────────────

/**
 * Maximum number of documents returned by each advanced query endpoint.
 * Keeping these small avoids over-fetching and keeps responses fast.
 */
const QUERY_LIMITS = {
  LATEST: 10,       // GET /workflows/latest
  POPULAR: 10,      // GET /workflows/popular
  RECOMMENDED: 10,  // GET /workflows/recommended
  TRENDING: 10,     // GET /workflows/trending
};

// ─── Sort field whitelist ─────────────────────────────────────────────────────

/**
 * Fields that are safe to sort by.
 * sortBuilder uses this list to reject unknown / injection-prone field names.
 */
const ALLOWED_SORT_FIELDS = [
  "createdAt",
  "updatedAt",
  "views",
  "likes",
  "title",
];

// Sort direction constants — avoids magic numbers in service layer
const SORT_ORDER = {
  ASC: 1,
  DESC: -1,
};

module.exports = {
  WORKFLOW_CATEGORIES,
  WORKFLOW_DIFFICULTY,
  WORKFLOW_DEFAULTS,
  QUERY_LIMITS,
  ALLOWED_SORT_FIELDS,
  SORT_ORDER,
};
