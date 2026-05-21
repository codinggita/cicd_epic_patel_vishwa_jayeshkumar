/**
 * system.controller.js
 *
 * Controller layer for system monitoring endpoints.
 * Handles Express requests, delegates logic to system.service, and returns formatted responses.
 */

const asyncHandler = require("../utils/asyncHandler");
const { sendResponse } = require("../utils/apiResponse");
const systemService = require("../services/system.service");
const systemInfoFormatter = require("../utils/systemInfoFormatter");
const { SYSTEM_MESSAGES } = require("../constants/system.constants");
const HTTP_STATUS = require("../constants/httpStatus");

/**
 * GET /api/v1/system/status
 *
 * Checks basic health/status of the API.
 * Returns overall system status, uptime, and memory usage.
 */
const getStatus = asyncHandler(async (req, res) => {
  const uptimeSeconds = systemService.getProcessUptime();
  const memoryUsage = systemService.getMemoryUsage();

  const formattedUptime = systemInfoFormatter.formatUptime(uptimeSeconds);
  const formattedMemory = systemInfoFormatter.formatMemory(memoryUsage);
  const systemStatus = systemInfoFormatter.formatSystemStatus("healthy", formattedUptime, formattedMemory);

  return sendResponse(res, HTTP_STATUS.OK, SYSTEM_MESSAGES.STATUS_FETCHED, systemStatus);
});

/**
 * GET /api/v1/system/uptime
 *
 * Returns detailed process uptime information.
 */
const getUptime = asyncHandler(async (req, res) => {
  const uptimeSeconds = systemService.getProcessUptime();
  const formattedUptime = systemInfoFormatter.formatUptime(uptimeSeconds);

  return sendResponse(res, HTTP_STATUS.OK, SYSTEM_MESSAGES.UPTIME_FETCHED, formattedUptime);
});

/**
 * GET /api/v1/system/memory
 *
 * Returns memory usage of the running Node.js process in MB.
 */
const getMemory = asyncHandler(async (req, res) => {
  const memoryUsage = systemService.getMemoryUsage();
  const formattedMemory = systemInfoFormatter.formatMemory(memoryUsage);

  return sendResponse(res, HTTP_STATUS.OK, SYSTEM_MESSAGES.MEMORY_FETCHED, formattedMemory);
});

/**
 * GET /api/v1/system/environment
 *
 * Returns current Node environment, CPU architectures, and process metadata.
 */
const getEnvironment = asyncHandler(async (req, res) => {
  const systemEnv = systemService.getSystemEnvironment();
  // Formatted env for cleaner API representation
  const formattedEnv = {
    ...systemInfoFormatter.formatEnvironment(),
    arch: systemEnv.arch,
    cpus: systemEnv.cpus,
    freeMemoryGB: (systemEnv.freeMemory / 1024 / 1024 / 1024).toFixed(2) + " GB",
    totalMemoryGB: (systemEnv.totalMemory / 1024 / 1024 / 1024).toFixed(2) + " GB",
  };

  return sendResponse(res, HTTP_STATUS.OK, SYSTEM_MESSAGES.ENV_FETCHED, formattedEnv);
});

module.exports = {
  getStatus,
  getUptime,
  getMemory,
  getEnvironment,
};
