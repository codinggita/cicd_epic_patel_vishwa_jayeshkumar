/**
 * dashboardFormatter.js
 *
 * Reusable utility to format raw database query results for dashboard endpoints.
 * This guarantees a consistent JSON payload structure for the client.
 */

/**
 * Formats dashboard summary data into a unified response object.
 *
 * @param {Object} summaryData - Raw summary data from database
 * @returns {Object} - Formatted summary payload
 */
const formatDashboardSummary = (summaryData) => {
  return {
    totalWorkflows: summaryData.totalWorkflows || 0,
    totalViews: summaryData.totalViews || 0,
    totalLikes: summaryData.totalLikes || 0,
    recentActivityCount: summaryData.recentActivityCount || 0,
  };
};

/**
 * Formats recent activity data for dashboard display.
 *
 * @param {Array} activities - Array of activity documents
 * @returns {Array} - Array of formatted activity objects
 */
const formatRecentActivity = (activities) => {
  if (!Array.isArray(activities)) return [];
  return activities.map((activity) => ({
    id: activity._id,
    action: activity.action,
    resourceType: activity.resourceType,
    description: activity.description,
    createdAt: activity.createdAt,
  }));
};

/**
 * Formats workflow statistics into a structured response.
 *
 * @param {Object} statsData - Raw statistics data
 * @returns {Object} - Formatted statistics payload
 */
const formatWorkflowStats = (statsData) => {
  return {
    totalWorkflows: statsData.totalWorkflows || 0,
    publishedWorkflows: statsData.publishedWorkflows || 0,
    draftWorkflows: statsData.draftWorkflows || 0,
    averageViews: statsData.averageViews || 0,
    averageLikes: statsData.averageLikes || 0,
  };
};

module.exports = {
  formatDashboardSummary,
  formatRecentActivity,
  formatWorkflowStats,
};
