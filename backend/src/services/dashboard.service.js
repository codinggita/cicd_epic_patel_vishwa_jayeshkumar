const Workflow = require("../models/workflow.model");
const Activity = require("../models/activity.model");
const dashboardConfig = require("../config/dashboard.config");
const {
  calculateTotalWorkflows,
  calculateTotalViews,
  calculateTotalLikes,
  calculateAverageViews,
  calculateAverageLikes,
} = require("../utils/dashboardMetrics");

/**
 * Fetches dashboard summary for a user.
 *
 * @param {String} userId - User ID
 * @returns {Object} - Dashboard summary data
 */
const getDashboardSummary = async (userId) => {
  const totalWorkflows = await calculateTotalWorkflows(userId, Workflow);
  const totalViews = await calculateTotalViews(userId, Workflow);
  const totalLikes = await calculateTotalLikes(userId, Workflow);

  const recentActivityCount = await Activity.countDocuments({
    userId,
    createdAt: {
      $gte: new Date(Date.now() - dashboardConfig.summaryTimeframeDays * 24 * 60 * 60 * 1000),
    },
  });

  return {
    totalWorkflows,
    totalViews,
    totalLikes,
    recentActivityCount,
  };
};

/**
 * Fetches recent activity for a user.
 *
 * @param {String} userId - User ID
 * @returns {Array} - Array of recent activity documents
 */
const getRecentActivity = async (userId) => {
  const activities = await Activity.find({ userId })
    .sort({ createdAt: -1 })
    .limit(dashboardConfig.recentActivityLimit);

  return activities;
};

/**
 * Fetches workflow statistics for a user.
 *
 * @param {String} userId - User ID
 * @returns {Object} - Workflow statistics data
 */
const getWorkflowStats = async (userId) => {
  const totalWorkflows = await calculateTotalWorkflows(userId, Workflow);
  const averageViews = await calculateAverageViews(userId, Workflow);
  const averageLikes = await calculateAverageLikes(userId, Workflow);

  // Count published workflows (not archived)
  const publishedWorkflows = await Workflow.countDocuments({
    createdBy: userId,
    isArchived: false,
  });

  // Count draft workflows (archived)
  const draftWorkflows = await Workflow.countDocuments({
    createdBy: userId,
    isArchived: true,
  });

  return {
    totalWorkflows,
    publishedWorkflows,
    draftWorkflows,
    averageViews,
    averageLikes,
  };
};

module.exports = {
  getDashboardSummary,
  getRecentActivity,
  getWorkflowStats,
};
