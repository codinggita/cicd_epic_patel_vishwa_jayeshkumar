/**
 * favorite.service.js
 *
 * Contains business logic for favorite management operations.
 * This service handles adding, removing, and fetching favorites.
 */

const Favorite = require("../models/favorite.model");

/**
 * Adds a workflow to user's favorites.
 *
 * @param {string} userId - User MongoDB _id
 * @param {string} workflowId - Workflow MongoDB _id
 * @returns {Object} - Newly created favorite document
 */
const addToFavorites = async (userId, workflowId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  if (!workflowId) {
    throw new Error("Workflow ID is required");
  }

  const favorite = await Favorite.create({
    userId,
    workflowId,
  });

  return favorite;
};

/**
 * Removes a workflow from user's favorites.
 *
 * @param {string} userId - User MongoDB _id
 * @param {string} workflowId - Workflow MongoDB _id
 * @returns {Object|null} - Deleted favorite document or null if not found
 */
const removeFromFavorites = async (userId, workflowId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  if (!workflowId) {
    throw new Error("Workflow ID is required");
  }

  const favorite = await Favorite.findOneAndDelete({
    userId,
    workflowId,
  });

  return favorite;
};

/**
 * Fetches all favorites for a specific user.
 *
 * @param {string} userId - User MongoDB _id
 * @returns {Array} - Array of favorite documents with populated workflow data
 */
const getUserFavorites = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const favorites = await Favorite.find({ userId })
    .populate("workflowId")
    .sort({ createdAt: -1 }) // Most recently favorited first
    .lean();

  return favorites;
};

module.exports = {
  addToFavorites,
  removeFromFavorites,
  getUserFavorites,
};
