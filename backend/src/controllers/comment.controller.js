/**
 * comment.controller.js
 *
 * Controller layer for comment endpoints.
 * Handles HTTP concerns only — no Mongoose, no business logic.
 *
 * Each handler:
 *   1. Extracts what it needs from req (user id, route params, body).
 *   2. Delegates to the service layer.
 *   3. Sends a standardized API response.
 *   4. Lets asyncHandler forward any thrown errors to the global error middleware.
 *
 * Endpoints:
 *   POST   /api/v1/comments/:workflowId  → addComment
 *   GET    /api/v1/comments/:workflowId  → getWorkflowComments
 *   PATCH  /api/v1/comments/:commentId   → updateComment
 *   DELETE /api/v1/comments/:commentId   → deleteComment
 */

const asyncHandler = require("../utils/asyncHandler");
const { sendResponse } = require("../utils/apiResponse");
const commentService = require("../services/comment.service");
const { COMMENT_MESSAGES } = require("../constants/comment.constants");
const HTTP_STATUS = require("../constants/httpStatus");

// ─── addComment ───────────────────────────────────────────────────────────────

/**
 * POST /api/v1/comments/:workflowId
 *
 * Adds a comment to the workflow specified by :workflowId.
 * Returns 201 Created on success.
 */
const addComment = asyncHandler(async (req, res) => {
  const userId     = req.user._id;
  const workflowId = req.params.workflowId;
  const { content } = req.body;

  const { comment } = await commentService.addComment(userId, workflowId, content);

  sendResponse(res, HTTP_STATUS.CREATED, COMMENT_MESSAGES.ADDED, { comment });
});

// ─── getWorkflowComments ──────────────────────────────────────────────────────

/**
 * GET /api/v1/comments/:workflowId
 *
 * Returns a paginated list of comments for the given workflow.
 * Public route — no authentication required.
 * Supports ?page=1&limit=10 query params.
 */
const getWorkflowComments = asyncHandler(async (req, res) => {
  const workflowId = req.params.workflowId;

  const { comments, pagination } = await commentService.getWorkflowComments(
    workflowId,
    req.query
  );

  sendResponse(res, HTTP_STATUS.OK, COMMENT_MESSAGES.FETCHED, {
    pagination,
    comments,
  });
});

// ─── updateComment ────────────────────────────────────────────────────────────

/**
 * PATCH /api/v1/comments/:commentId
 *
 * Updates the content of the comment specified by :commentId.
 * Only the comment's author can edit it (enforced in the service).
 */
const updateComment = asyncHandler(async (req, res) => {
  const userId    = req.user._id;
  const commentId = req.params.commentId;
  const { content } = req.body;

  const { comment } = await commentService.updateComment(commentId, userId, content);

  sendResponse(res, HTTP_STATUS.OK, COMMENT_MESSAGES.UPDATED, { comment });
});

// ─── deleteComment ────────────────────────────────────────────────────────────

/**
 * DELETE /api/v1/comments/:commentId
 *
 * Permanently deletes the comment specified by :commentId.
 * Only the comment's author can delete it (enforced in the service).
 */
const deleteComment = asyncHandler(async (req, res) => {
  const userId    = req.user._id;
  const commentId = req.params.commentId;

  await commentService.deleteComment(commentId, userId);

  sendResponse(res, HTTP_STATUS.OK, COMMENT_MESSAGES.DELETED);
});

module.exports = {
  addComment,
  getWorkflowComments,
  updateComment,
  deleteComment,
};
