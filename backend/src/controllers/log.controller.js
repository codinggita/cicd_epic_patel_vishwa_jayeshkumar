const {
  getAllLogs,
  getLatestLogs,
  getErrorLogs,
} = require("../services/log.service");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatus");
const { LOG_MESSAGES } = require("../constants/log.constants");

/**
 * GET /api/v1/logs
 * Returns all application logs.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const getAll = asyncHandler(async (req, res) => {
  const logs = await getAllLogs();
  sendResponse(res, HTTP_STATUS.OK, LOG_MESSAGES.LOGS_FETCHED, logs);
});

/**
 * GET /api/v1/logs/latest
 * Returns the latest application logs.
 */
const getLatest = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const logs = await getLatestLogs(limit);
  sendResponse(res, HTTP_STATUS.OK, LOG_MESSAGES.LATEST_LOGS_FETCHED, logs);
});

/**
 * GET /api/v1/logs/errors
 * Returns only error-level logs.
 */
const getErrors = asyncHandler(async (req, res) => {
  const logs = await getErrorLogs();
  sendResponse(res, HTTP_STATUS.OK, LOG_MESSAGES.ERROR_LOGS_FETCHED, logs);
});

module.exports = { getAll, getLatest, getErrors };
