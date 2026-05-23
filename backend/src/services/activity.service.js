/**
 * activity.service.js
 *
 * Contains business logic for activity tracking operations.
 * This service handles activity record creation and retrieval.
 */

const Activity = require("../models/activity.model");

/**
 * Creates a new activity record.
 *
 * @param {Object} data - Activity data from request body
 * @returns {Object} - Newly created activity document
 */
const createActivity = async (data) => {
  const { userId, action, resourceType, resourceId, description } = data;

  const activity = await Activity.create({
    userId,
    action,
    resourceType,
    resourceId,
    description,
  });

  return activity;
};

/**
 * Fetches all activities for a specific user.
 *
 * @param {string} userId - User MongoDB _id
 * @returns {Array} - Array of activity documents
 */
const getActivitiesByUserId = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const activities = await Activity.find({ userId })
    .sort({ createdAt: -1 }) // Most recent first
    .lean();

  return activities;
};

module.exports = {
  createActivity,
  getActivitiesByUserId,
};
