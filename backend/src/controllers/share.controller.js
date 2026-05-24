const {
  shareWorkflow,
  getSharedWorkflows,
} = require("../services/share.service");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatus");
const { SHARE_MESSAGES } = require("../constants/share.constants");

/**
 * POST /api/v1/shares/:workflowId
 * Shares a workflow with another user.
 *
 * req.user is attached by the protect middleware before this runs.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const share = asyncHandler(async (req, res) => {
  const { workflowId } = req.params;
  const { sharedWith, permission } = req.body;

  const share = await shareWorkflow(
    workflowId,
    req.user._id,
    sharedWith,
    permission
  );

  sendResponse(res, HTTP_STATUS.CREATED, SHARE_MESSAGES.SHARED, share);
});

/**
 * GET /api/v1/shares
 * Fetches all workflows shared with the authenticated user.
 *
 * req.user is attached by the protect middleware before this runs.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const getShares = asyncHandler(async (req, res) => {
  const shares = await getSharedWorkflows(req.user._id);

  if (!shares || shares.length === 0) {
    return sendResponse(
      res,
      HTTP_STATUS.NOT_FOUND,
      SHARE_MESSAGES.NOT_FOUND
    );
  }

  sendResponse(res, HTTP_STATUS.OK, SHARE_MESSAGES.FETCHED, shares);
});

module.exports = {
  share,
  getShares,
};
