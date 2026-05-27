/**
 * Dashboard Configuration
 *
 * Centralized configuration for dashboard module.
 * Adjust these values to change dashboard behavior globally.
 */

const { DASHBOARD_DEFAULTS } = require("../constants/dashboard.constants");

const dashboardConfig = {
  // Number of recent activities to display
  recentActivityLimit: DASHBOARD_DEFAULTS.RECENT_ACTIVITY_LIMIT,

  // Timeframe in days for summary calculations
  summaryTimeframeDays: DASHBOARD_DEFAULTS.SUMMARY_TIMEFRAME_DAYS,

  // Fields to include in workflow statistics
  workflowStatsFields: ["totalWorkflows", "publishedWorkflows", "draftWorkflows"],

  // Fields to include in user summary
  userSummaryFields: ["totalWorkflows", "totalViews", "totalLikes"],
};

module.exports = dashboardConfig;
