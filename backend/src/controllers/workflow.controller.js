const {
  getAllWorkflows,
  getWorkflowById,
  createWorkflow,
  deleteWorkflow,
  replaceWorkflow,
  updateWorkflowContent,
  getRandomWorkflow,
  getWorkflowHistory,
  archiveWorkflow,
  restoreWorkflow,
  cloneWorkflow,
  getWorkflowLogs,
  getWorkflowMetrics,
  triggerWorkflowRun,
  cancelWorkflowRun,
} = require("../services/workflow.service");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../config/constants");
const { WORKFLOW_MESSAGES } = require("../config/constants");

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
  sendResponse(res, HTTP_STATUS.OK, WORKFLOW_MESSAGES.FETCHED_ALL, workflows);
});

/**
 * GET /api/v1/workflows/:id
 * Returns a single workflow by ID with creator info populated.
 */
const getById = asyncHandler(async (req, res) => {
  const workflow = await getWorkflowById(req.params.id);

  if (!workflow || workflow.isArchived) {
    return sendResponse(res, HTTP_STATUS.NOT_FOUND, WORKFLOW_MESSAGES.NOT_FOUND);
  }

  sendResponse(res, HTTP_STATUS.OK, WORKFLOW_MESSAGES.FETCHED, workflow);
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
  sendResponse(res, HTTP_STATUS.CREATED, WORKFLOW_MESSAGES.CREATED, workflow);
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
    return sendResponse(res, HTTP_STATUS.NOT_FOUND, WORKFLOW_MESSAGES.NOT_FOUND);
  }

  sendResponse(res, HTTP_STATUS.OK, WORKFLOW_MESSAGES.DELETED);
});

/**
 * PUT /api/v1/workflows/:id
 * Replaces an entire workflow document.
 */
const replace = asyncHandler(async (req, res) => {
  const workflow = await replaceWorkflow(req.params.id, req.body, req.user._id);
  sendResponse(res, HTTP_STATUS.OK, WORKFLOW_MESSAGES.REPLACED, workflow);
});

/**
 * PATCH /api/v1/workflows/:id/content
 * Updates workflow content only.
 */
const updateContent = asyncHandler(async (req, res) => {
  const workflow = await updateWorkflowContent(req.params.id, req.body, req.user._id);
  sendResponse(res, HTTP_STATUS.OK, WORKFLOW_MESSAGES.UPDATED, workflow);
});

/**
 * GET /api/v1/workflows/random
 * Fetches a random workflow.
 */
const getRandom = asyncHandler(async (req, res) => {
  const workflow = await getRandomWorkflow();
  sendResponse(res, HTTP_STATUS.OK, WORKFLOW_MESSAGES.RANDOM, workflow);
});

/**
 * GET /api/v1/workflows/:id/history
 * Fetches workflow history.
 */
const getHistory = asyncHandler(async (req, res) => {
  const history = await getWorkflowHistory(req.params.id);
  sendResponse(res, HTTP_STATUS.OK, WORKFLOW_MESSAGES.HISTORY_FETCHED, history);
});

/**
 * PATCH /api/v1/workflows/:id/archive
 * Archives a workflow.
 */
const archive = asyncHandler(async (req, res) => {
  const workflow = await archiveWorkflow(req.params.id, req.user._id);
  sendResponse(res, HTTP_STATUS.OK, WORKFLOW_MESSAGES.ARCHIVED, workflow);
});

/**
 * PATCH /api/v1/workflows/:id/restore
 * Restores an archived workflow.
 */
const restore = asyncHandler(async (req, res) => {
  const workflow = await restoreWorkflow(req.params.id, req.user._id);
  sendResponse(res, HTTP_STATUS.OK, WORKFLOW_MESSAGES.RESTORED, workflow);
});

/**
 * POST /api/v1/workflows/:id/clone
 * Clones a workflow.
 */
const clone = asyncHandler(async (req, res) => {
  const workflow = await cloneWorkflow(req.params.id, req.user._id);
  sendResponse(res, HTTP_STATUS.CREATED, WORKFLOW_MESSAGES.CLONED, workflow);
});

/**
 * GET /api/v1/workflows/:id/logs
 * Fetches workflow logs.
 */
const getLogs = asyncHandler(async (req, res) => {
  const logs = await getWorkflowLogs(req.params.id);
  sendResponse(res, HTTP_STATUS.OK, WORKFLOW_MESSAGES.LOGS_FETCHED, logs);
});

/**
 * GET /api/v1/workflows/:id/metrics
 * Fetches workflow metrics.
 */
const getMetrics = asyncHandler(async (req, res) => {
  const metrics = await getWorkflowMetrics(req.params.id);
  sendResponse(res, HTTP_STATUS.OK, WORKFLOW_MESSAGES.METRICS_FETCHED, metrics);
});

/**
 * POST /api/v1/workflows/:id/run
 * Triggers a workflow run.
 */
const run = asyncHandler(async (req, res) => {
  const runStatus = await triggerWorkflowRun(req.params.id, req.user._id);
  sendResponse(res, HTTP_STATUS.OK, WORKFLOW_MESSAGES.RUN_TRIGGERED, runStatus);
});

/**
 * POST /api/v1/workflows/:id/cancel
 * Cancels a running workflow.
 */
const cancel = asyncHandler(async (req, res) => {
  const cancelStatus = await cancelWorkflowRun(req.params.id, req.user._id);
  sendResponse(res, HTTP_STATUS.OK, WORKFLOW_MESSAGES.RUN_CANCELLED, cancelStatus);
});

module.exports = {
  getAll,
  getById,
  create,
  remove,
  replace,
  updateContent,
  getRandom,
  getHistory,
  archive,
  restore,
  clone,
  getLogs,
  getMetrics,
  run,
  cancel,
};
