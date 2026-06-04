const { DASHBOARD_DEFAULTS } = require("../config/constants");

const dashboardConfig = {
  recentActivityLimit: DASHBOARD_DEFAULTS.RECENT_ACTIVITY_LIMIT,
  summaryTimeframeDays: DASHBOARD_DEFAULTS.SUMMARY_TIMEFRAME_DAYS,
  workflowStatsFields: ["totalWorkflows", "publishedWorkflows", "draftWorkflows"],
  userSummaryFields: ["totalWorkflows", "totalViews", "totalLikes"],
};

module.exports = dashboardConfig;