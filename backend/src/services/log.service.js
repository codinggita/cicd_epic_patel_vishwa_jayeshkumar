const { MOCK_LOGS } = require("../constants/log.constants");
const {
  formatLogs,
  formatLatestLogs,
  formatErrorLogs,
} = require("../utils/logFormatter");

/**
 * Fetches all application logs.
 *
 * @returns {Object} - Formatted logs response
 */
const getAllLogs = async () => {
  const formatted = formatLogs(MOCK_LOGS);
  return formatted;
};

/**
 * Fetches the latest application logs.
 *
 * @param {Number} limit - Maximum number of logs to return (default: 10)
 * @returns {Object} - Formatted latest logs response
 */
const getLatestLogs = async (limit = 10) => {
  const formatted = formatLatestLogs(MOCK_LOGS, limit);
  return formatted;
};

/**
 * Fetches only error-level logs.
 *
 * @returns {Object} - Formatted error logs response
 */
const getErrorLogs = async () => {
  const formatted = formatErrorLogs(MOCK_LOGS);
  return formatted;
};

module.exports = {
  getAllLogs,
  getLatestLogs,
  getErrorLogs,
};
