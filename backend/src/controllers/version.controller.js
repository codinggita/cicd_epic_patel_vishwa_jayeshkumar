const {
  getWorkflowVersions,
  createWorkflowVersion,
} = require("../services/version.service");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatus");
const { VERSION_MESSAGES } = require("../constants/version.constants");

/**
 * GET /api/v1/versions/:workflowId
 * Returns all versions for a specific workflow.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const getByWorkflowId = asyncHandler(async (req, res) => {
  const { workflowId } = req.params;
  const versions = await getWorkflowVersions(workflowId);
  sendResponse(res, HTTP_STATUS.OK, VERSION_MESSAGES.FETCHED_ALL, versions);
});

/**
 * POST /api/v1/versions
 * Creates a new workflow version.
 *
 * TODO (future PR): Add request body validation before calling service
 */
const create = asyncHandler(async (req, res) => {
  const version = await createWorkflowVersion(req.body, req.user.id);
  sendResponse(res, HTTP_STATUS.CREATED, VERSION_MESSAGES.CREATED, version);
});

module.exports = { getByWorkflowId, create };
