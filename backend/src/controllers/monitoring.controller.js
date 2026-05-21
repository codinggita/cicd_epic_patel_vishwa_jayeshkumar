const {
  getUptime,
  getCpuUsage,
  getMemoryUsage,
} = require("../services/monitoring.service");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatus");
const { MONITORING_MESSAGES } = require("../constants/monitoring.constants");

/**
 * GET /api/v1/monitoring/uptime
 * Returns server uptime information.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const getUptimeHandler = asyncHandler(async (req, res) => {
  const uptime = await getUptime();
  sendResponse(res, HTTP_STATUS.OK, MONITORING_MESSAGES.UPTIME_FETCHED, uptime);
});

/**
 * GET /api/v1/monitoring/cpu
 * Returns CPU usage information.
 */
const getCpuUsageHandler = asyncHandler(async (req, res) => {
  const cpu = await getCpuUsage();
  sendResponse(res, HTTP_STATUS.OK, MONITORING_MESSAGES.CPU_FETCHED, cpu);
});

/**
 * GET /api/v1/monitoring/memory
 * Returns memory usage information.
 */
const getMemoryUsageHandler = asyncHandler(async (req, res) => {
  const memory = await getMemoryUsage();
  sendResponse(res, HTTP_STATUS.OK, MONITORING_MESSAGES.MEMORY_FETCHED, memory);
});

module.exports = {
  getUptimeHandler,
  getCpuUsageHandler,
  getMemoryUsageHandler,
};
