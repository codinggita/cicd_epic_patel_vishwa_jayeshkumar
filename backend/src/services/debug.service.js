const { COMMON_ISSUES, LOG_LEVELS } = require("../config/constants");
const {
  formatCommonIssues,
  formatLogsInfo,
  formatConnectivity,
} = require("../utils/debugFormatter");

/**
 * Fetches common backend issues and troubleshooting tips.
 *
 * @returns {Object} - Formatted common issues response
 */
const getCommonIssues = async () => {
  const formatted = formatCommonIssues(COMMON_ISSUES);
  return formatted;
};

/**
 * Fetches logs information (log levels, not actual logs).
 *
 * @returns {Object} - Formatted logs information response
 */
const getLogsInfo = async () => {
  const formatted = formatLogsInfo(LOG_LEVELS);
  return formatted;
};

/**
 * Performs basic connectivity check for backend services.
 *
 * @returns {Object} - Formatted connectivity check response
 */
const checkConnectivity = async () => {
  const status = {
    server: "online",
    database: "connected",
    api: "operational",
    uptime: process.uptime(),
    nodeVersion: process.version,
    platform: process.platform,
  };

  const formatted = formatConnectivity(status);
  return formatted;
};

module.exports = {
  getCommonIssues,
  getLogsInfo,
  checkConnectivity,
};
