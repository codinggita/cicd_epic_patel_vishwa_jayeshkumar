const {
  getDashboardSummary,
  getRecentActivity,
  getWorkflowStats,
} = require("../services/dashboard.service");
const {
  formatDashboardSummary,
  formatRecentActivity,
  formatWorkflowStats,
} = require("../utils/dashboardFormatter");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatus");
const { DASHBOARD_MESSAGES } = require("../constants/dashboard.constants");

/**
 * GET /api/v1/dashboard/summary
 * Returns dashboard summary for the authenticated user.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const getSummary = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const summaryData = await getDashboardSummary(userId);
  const formattedSummary = formatDashboardSummary(summaryData);
  sendResponse(res, HTTP_STATUS.OK, DASHBOARD_MESSAGES.SUMMARY_FETCHED, formattedSummary);
});

/**
 * GET /api/v1/dashboard/activity
 * Returns recent activity for the authenticated user.
 */
const getActivity = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const activities = await getRecentActivity(userId);
  const formattedActivity = formatRecentActivity(activities);
  sendResponse(res, HTTP_STATUS.OK, DASHBOARD_MESSAGES.ACTIVITY_FETCHED, formattedActivity);
});

/**
 * GET /api/v1/dashboard/stats
 * Returns workflow statistics for the authenticated user.
 */
const getStats = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const statsData = await getWorkflowStats(userId);
  const formattedStats = formatWorkflowStats(statsData);
  sendResponse(res, HTTP_STATUS.OK, DASHBOARD_MESSAGES.STATS_FETCHED, formattedStats);
});

module.exports = {
  getSummary,
  getActivity,
  getStats,
};
