/**
 * Dashboard Constants
 *
 * Centralizes all static values used across the dashboard module.
 * Update here and it reflects everywhere — no magic strings in business logic.
 */

// Response messages for dashboard operations
const DASHBOARD_MESSAGES = {
  SUMMARY_FETCHED: "Dashboard summary fetched successfully",
  ACTIVITY_FETCHED: "Recent activity fetched successfully",
  STATS_FETCHED: "Workflow statistics fetched successfully",
};

// Dashboard configuration defaults
const DASHBOARD_DEFAULTS = {
  RECENT_ACTIVITY_LIMIT: 10,
  SUMMARY_TIMEFRAME_DAYS: 30,
};

module.exports = {
  DASHBOARD_MESSAGES,
  DASHBOARD_DEFAULTS,
};
