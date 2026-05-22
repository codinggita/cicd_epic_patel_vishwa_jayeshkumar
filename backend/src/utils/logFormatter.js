/**
 * Log Formatter Utility
 *
 * Provides reusable functions to format log responses.
 * Ensures consistent output structure across log endpoints.
 */

/**
 * Formats logs response with metadata.
 *
 * @param {Array} logs - Array of log entries
 * @returns {Object} - Formatted logs response
 */
const formatLogs = (logs) => {
  return {
    logs,
    count: logs.length,
    timestamp: new Date().toISOString(),
    note: "This endpoint returns mock log data for demonstration purposes",
  };
};

/**
 * Formats latest logs response with limit.
 *
 * @param {Array} logs - Array of log entries
 * @param {Number} limit - Maximum number of logs to return
 * @returns {Object} - Formatted latest logs response
 */
const formatLatestLogs = (logs, limit) => {
  const latestLogs = logs.slice(0, limit);
  return {
    logs: latestLogs,
    count: latestLogs.length,
    limit,
    timestamp: new Date().toISOString(),
    note: "This endpoint returns the most recent log entries",
  };
};

/**
 * Formats error logs response filtered by error level.
 *
 * @param {Array} logs - Array of log entries
 * @returns {Object} - Formatted error logs response
 */
const formatErrorLogs = (logs) => {
  const errorLogs = logs.filter((log) => log.level === "error");
  return {
    logs: errorLogs,
    count: errorLogs.length,
    timestamp: new Date().toISOString(),
    note: "This endpoint returns only error-level log entries",
  };
};

module.exports = {
  formatLogs,
  formatLatestLogs,
  formatErrorLogs,
};
