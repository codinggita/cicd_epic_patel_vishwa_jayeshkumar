const {
  exportWorkflowById,
  exportWorkflowSummary,
} = require("../services/export.service");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatus");
const { EXPORT_MESSAGES } = require("../constants/export.constants");

/**
 * GET /api/v1/exports/workflows/:id
 * Exports complete workflow data by ID.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const exportWorkflow = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const exportedData = await exportWorkflowById(id);

  if (!exportedData) {
    return sendResponse(
      res,
      HTTP_STATUS.NOT_FOUND,
      EXPORT_MESSAGES.WORKFLOW_NOT_FOUND
    );
  }

  sendResponse(res, HTTP_STATUS.OK, EXPORT_MESSAGES.WORKFLOW_EXPORTED, exportedData);
});

/**
 * GET /api/v1/exports/workflows/:id/summary
 * Exports workflow summary by ID.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const exportSummary = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const summary = await exportWorkflowSummary(id);

  if (!summary) {
    return sendResponse(
      res,
      HTTP_STATUS.NOT_FOUND,
      EXPORT_MESSAGES.WORKFLOW_NOT_FOUND
    );
  }

  sendResponse(res, HTTP_STATUS.OK, EXPORT_MESSAGES.SUMMARY_EXPORTED, summary);
});

module.exports = {
  exportWorkflow,
  exportSummary,
};
