const {
  createHistory,
  getWorkflowHistory,
} = require("../services/history.service");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatus");
const { HISTORY_MESSAGES } = require("../constants/history.constants");

/**
 * POST /api/v1/history
 * Creates a new history record.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const create = asyncHandler(async (req, res) => {
  const history = await createHistory(req.body);
  sendResponse(res, HTTP_STATUS.CREATED, HISTORY_MESSAGES.CREATED, history);
});

/**
 * GET /api/v1/history/:workflowId
 * Returns all history records for a specific workflow.
 */
const getByWorkflowId = asyncHandler(async (req, res) => {
  const history = await getWorkflowHistory(req.params.workflowId);
  sendResponse(res, HTTP_STATUS.OK, HISTORY_MESSAGES.FETCHED, history);
});

module.exports = { create, getByWorkflowId };
