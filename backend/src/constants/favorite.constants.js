/**
 * Favorite Constants
 *
 * Centralizes all static values used across the favorite module.
 * Update here and it reflects everywhere — no magic strings in business logic.
 */

// Response messages for favorite operations
const FAVORITE_MESSAGES = {
  ADDED: "Workflow added to favorites",
  REMOVED: "Workflow removed from favorites",
  FETCHED: "Favorites fetched successfully",
  ALREADY_FAVORITED: "Workflow already in favorites",
  NOT_FAVORITED: "Workflow not found in favorites",
  NOT_FOUND: "No favorites found",
};

module.exports = {
  FAVORITE_MESSAGES,
};
