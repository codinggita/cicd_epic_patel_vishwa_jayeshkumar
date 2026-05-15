/**
 * comment.service.js
 *
 * Service layer for all comment business logic.
 * Controllers call these functions — no Mongoose code lives in controllers.
 *
 * Functions:
 *   addComment            — create a comment on a workflow
 *   getWorkflowComments   — paginated list of comments for a workflow
 *   updateComment         — edit a comment (owner only)
 *   deleteComment         — delete a comment (owner only)
 */

const Comment = require("../models/comment.model");
const Workflow = require("../models/workflow.model");
const {
  COMMENT_MESSAGES,
  COMMENT_PAGINATION,
} = require("../constants/comment.constants");

// ─── Helper: throw a typed error ─────────────────────────────────────────────

/**
 * Creates and throws an Error decorated with a statusCode.
 * The global error middleware reads statusCode to set the HTTP status,
 * so controllers stay free of any status-code logic.
 *
 * @param {string} message    - Human-readable error message
 * @param {number} statusCode - HTTP status code (e.g. 404, 403)
 */
const throwError = (message, statusCode) => {
  const err = new Error(message);
  err.statusCode = statusCode;
  throw err;
};

// ─── addComment ───────────────────────────────────────────────────────────────

/**
 * Creates a new comment on the specified workflow.
 *
 * Steps:
 *   1. Verify the workflow exists and is not archived.
 *   2. Create the comment document.
 *   3. Populate the user field before returning so the frontend
 *      can display the commenter's name immediately.
 *
 * @param {string} userId     - ObjectId of the authenticated user
 * @param {string} workflowId - ObjectId of the target workflow
 * @param {string} content    - Comment body text
 * @returns {{ comment: Object }}
 */
const addComment = async (userId, workflowId, content) => {
  // 1. Confirm the workflow exists and is not archived
  const workflow = await Workflow.findOne({ _id: workflowId, isArchived: false });
  if (!workflow) throwError(COMMENT_MESSAGES.WORKFLOW_NOT_FOUND, 404);

  // 2. Create the comment
  const comment = await Comment.create({
    user: userId,
    workflow: workflowId,
    content,
  });

  // 3. Populate commenter name so the response is immediately useful
  await comment.populate("user", "name email");

  return { comment };
};

// ─── getWorkflowComments ──────────────────────────────────────────────────────

/**
 * Returns a paginated list of comments for a given workflow.
 * Sorted newest-first — the compound index on { workflow, createdAt }
 * makes this query very efficient.
 *
 * @param {string} workflowId - ObjectId of the workflow
 * @param {Object} query      - Express req.query (for ?page= and ?limit=)
 * @returns {{ comments: Array, pagination: Object }}
 */
const getWorkflowComments = async (workflowId, query) => {
  // Confirm the workflow exists before paginating its comments
  const workflow = await Workflow.findOne({ _id: workflowId, isArchived: false });
  if (!workflow) throwError(COMMENT_MESSAGES.WORKFLOW_NOT_FOUND, 404);

  // Parse and clamp pagination params
  const page  = Math.max(1, parseInt(query.page)  || 1);
  const limit = Math.min(
    COMMENT_PAGINATION.MAX_LIMIT,
    Math.max(1, parseInt(query.limit) || COMMENT_PAGINATION.DEFAULT_LIMIT)
  );
  const skip = (page - 1) * limit;

  // Run count and data queries in parallel for performance
  const [totalCount, comments] = await Promise.all([
    Comment.countDocuments({ workflow: workflowId }),
    Comment.find({ workflow: workflowId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "name email") // show commenter info
      .lean(),
  ]);

  const pagination = {
    currentPage: page,
    totalPages: Math.ceil(totalCount / limit),
    totalCount,
    perPage: limit,
    hasNextPage: page < Math.ceil(totalCount / limit),
    hasPrevPage: page > 1,
  };

  return { comments, pagination };
};

// ─── updateComment ────────────────────────────────────────────────────────────

/**
 * Updates the content of an existing comment.
 * Only the comment's original author is allowed to edit it.
 *
 * @param {string} commentId - ObjectId of the comment to update
 * @param {string} userId    - ObjectId of the authenticated user (ownership check)
 * @param {string} content   - New comment body text
 * @returns {{ comment: Object }} The updated comment document
 */
const updateComment = async (commentId, userId, content) => {
  // Find the comment first so we can check ownership
  const comment = await Comment.findById(commentId);
  if (!comment) throwError(COMMENT_MESSAGES.NOT_FOUND, 404);

  // Ownership guard — compare as strings to avoid ObjectId reference issues
  if (comment.user.toString() !== userId.toString()) {
    throwError(COMMENT_MESSAGES.UNAUTHORIZED, 403);
  }

  // Apply the update and mark as edited
  comment.content  = content;
  comment.isEdited = true;
  await comment.save();

  await comment.populate("user", "name email");

  return { comment };
};

// ─── deleteComment ────────────────────────────────────────────────────────────

/**
 * Permanently deletes a comment.
 * Only the comment's original author is allowed to delete it.
 *
 * @param {string} commentId - ObjectId of the comment to delete
 * @param {string} userId    - ObjectId of the authenticated user (ownership check)
 * @returns {void}
 */
const deleteComment = async (commentId, userId) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throwError(COMMENT_MESSAGES.NOT_FOUND, 404);

  // Ownership guard
  if (comment.user.toString() !== userId.toString()) {
    throwError(COMMENT_MESSAGES.UNAUTHORIZED, 403);
  }

  await comment.deleteOne();
};

module.exports = {
  addComment,
  getWorkflowComments,
  updateComment,
  deleteComment,
};
