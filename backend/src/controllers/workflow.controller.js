const {
  getAllWorkflows,
  getWorkflowById,
  createWorkflow,
  deleteWorkflow,
} = require("../services/workflow.service");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatus");

/**
 * GET /api/v1/workflows
 * Returns all non-archived workflows with creator info populated.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 *
 * TODO (future PR): Add pagination, filtering, sorting via query params
 */
const getAll = asyncHandler(async (req, res) => {
  const workflows = await getAllWorkflows();
  sendResponse(res, HTTP_STATUS.OK, "Workflows fetched successfully", workflows);
});

/**
 * GET /api/v1/workflows/:id
 * Returns a single workflow by ID with creator info populated.
 */
const getById = asyncHandler(async (req, res) => {
  const workflow = await getWorkflowById(req.params.id);

  if (!workflow || workflow.isArchived) {
    return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Workflow not found");
  }

  sendResponse(res, HTTP_STATUS.OK, "Workflow fetched successfully", workflow);
});

/**
 * POST /api/v1/workflows
 * Creates a new workflow for the authenticated user.
 * req.user is attached by the protect middleware before this runs.
 *
 * TODO (future PR): Add request body validation before calling service
 */
const create = asyncHandler(async (req, res) => {
  const workflow = await createWorkflow(req.body, req.user._id);
  sendResponse(res, HTTP_STATUS.CREATED, "Workflow created successfully", workflow);
});

/**
 * DELETE /api/v1/workflows/:id
 * Permanently deletes a workflow from the database.
 *
 * TODO (future PR): Add ownership check (only creator or admin can delete)
 */
const remove = asyncHandler(async (req, res) => {
  const workflow = await deleteWorkflow(req.params.id);

  if (!workflow) {
    return sendResponse(res, HTTP_STATUS.NOT_FOUND, "Workflow not found");
  }

  sendResponse(res, HTTP_STATUS.OK, "Workflow deleted successfully");
});

module.exports = { getAll, getById, create, remove };
