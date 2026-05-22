/**
 * Recommendation Constants
 *
 * Centralizes all static values used across the recommendation module.
 * Update here and it reflects everywhere — no magic strings in business logic.
 */

// Response messages for recommendation operations
const RECOMMENDATION_MESSAGES = {
  RECOMMENDED_FETCHED: "Recommended workflows fetched successfully",
  POPULAR_FETCHED: "Popular workflows fetched successfully",
};

// Recommendation types
const RECOMMENDATION_TYPES = {
  RECOMMENDED: "recommended",
  POPULAR: "popular",
};

// Default limits for queries
const RECOMMENDATION_DEFAULTS = {
  LIMIT: 10,
};

module.exports = {
  RECOMMENDATION_MESSAGES,
  RECOMMENDATION_TYPES,
  RECOMMENDATION_DEFAULTS,
};
