const {
  moveToTrash,
  restoreFromTrash,
  fetchTrashedWorkflows,
} = require("../services/trash.service");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatus");
const { TRASH_MESSAGES } = require("../constants/trash.constants");

/**
 * POST /api/v1/trash/:workflowId
 * Moves a workflow to trash.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const moveWorkflowToTrash = asyncHandler(async (req, res) => {
  const { workflowId } = req.params;
  const userId = req.user.id;

  const trash = await moveToTrash(workflowId, userId);
  sendResponse(res, HTTP_STATUS.CREATED, TRASH_MESSAGES.MOVED_TO_TRASH, trash);
});

/**
 * PATCH /api/v1/trash/:workflowId/restore
 * Restores a workflow from trash.
 */
const restoreWorkflow = asyncHandler(async (req, res) => {
  const { workflowId } = req.params;

  const trash = await restoreFromTrash(workflowId);
  sendResponse(res, HTTP_STATUS.OK, TRASH_MESSAGES.RESTORED, trash);
});

/**
 * GET /api/v1/trash
 * Fetches all trashed workflows.
 */
const getTrashedWorkflows = asyncHandler(async (req, res) => {
  const trashedWorkflows = await fetchTrashedWorkflows();
  sendResponse(res, HTTP_STATUS.OK, TRASH_MESSAGES.FETCHED_ALL, trashedWorkflows);
});

module.exports = {
  moveWorkflowToTrash,
  restoreWorkflow,
  getTrashedWorkflows,
};
