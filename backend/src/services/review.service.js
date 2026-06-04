/**
 * review.service.js
 *
 * Service layer for all review business logic.
 * Controllers call these functions — no Mongoose code lives in controllers.
 *
 * Functions:
 *   addReview            — create a review on a workflow (one per user)
 *   getWorkflowReviews   — paginated list of reviews for a workflow
 *   updateReview         — edit a review (owner only)
 *   deleteReview         — delete a review (owner only)
 */

const Review   = require("../models/review.model");
const Workflow = require("../models/workflow.model");
const {
  REVIEW_MESSAGES,
  REVIEW_PAGINATION,
} = require("../config/constants");

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

// ─── addReview ────────────────────────────────────────────────────────────────

/**
 * Creates a new review on the specified workflow.
 *
 * Steps:
 *   1. Verify the workflow exists and is not archived.
 *   2. Attempt to create the review document.
 *      The unique index on { user, workflow } will reject duplicates —
 *      a MongoDB duplicate-key error (code 11000) is caught and mapped
 *      to a 409 Conflict response.
 *   3. Populate the user field before returning so the frontend
 *      can display the reviewer's name immediately.
 *
 * @param {string} userId     - ObjectId of the authenticated user
 * @param {string} workflowId - ObjectId of the target workflow
 * @param {number} rating     - Star rating (1–5)
 * @param {string} review     - Optional written review text
 * @returns {{ review: Object }}
 */
const addReview = async (userId, workflowId, rating, review) => {
  // 1. Confirm the workflow exists and is not archived
  const workflow = await Workflow.findOne({ _id: workflowId, isArchived: false });
  if (!workflow) throwError(REVIEW_MESSAGES.WORKFLOW_NOT_FOUND, 404);

  // 2. Create the review (unique index enforces one-per-user-per-workflow)
  let newReview;
  try {
    newReview = await Review.create({
      user:     userId,
      workflow: workflowId,
      rating,
      review:   review || "",
    });
  } catch (err) {
    // MongoDB duplicate-key error
    if (err.code === 11000) throwError(REVIEW_MESSAGES.ALREADY_REVIEWED, 409);
    throw err; // re-throw unexpected errors to the global handler
  }

  // 3. Populate reviewer info so the response is immediately useful
  await newReview.populate("user", "name email");

  return { review: newReview };
};

// ─── getWorkflowReviews ───────────────────────────────────────────────────────

/**
 * Returns a paginated list of reviews for a given workflow.
 * Sorted newest-first — the compound index on { workflow, createdAt }
 * makes this query very efficient.
 *
 * @param {string} workflowId - ObjectId of the workflow
 * @param {Object} query      - Express req.query (for ?page= and ?limit=)
 * @returns {{ reviews: Array, pagination: Object }}
 */
const getWorkflowReviews = async (workflowId, query) => {
  // Confirm the workflow exists before paginating its reviews
  const workflow = await Workflow.findOne({ _id: workflowId, isArchived: false });
  if (!workflow) throwError(REVIEW_MESSAGES.WORKFLOW_NOT_FOUND, 404);

  // Parse and clamp pagination params
  const page  = Math.max(1, parseInt(query.page)  || 1);
  const limit = Math.min(
    REVIEW_PAGINATION.MAX_LIMIT,
    Math.max(1, parseInt(query.limit) || REVIEW_PAGINATION.DEFAULT_LIMIT)
  );
  const skip = (page - 1) * limit;

  // Run count and data queries in parallel for performance
  const [totalCount, reviews] = await Promise.all([
    Review.countDocuments({ workflow: workflowId }),
    Review.find({ workflow: workflowId })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate("user", "name email")
      .lean(),
  ]);

  const pagination = {
    currentPage: page,
    totalPages:  Math.ceil(totalCount / limit),
    totalCount,
    perPage:     limit,
    hasNextPage: page < Math.ceil(totalCount / limit),
    hasPrevPage: page > 1,
  };

  return { reviews, pagination };
};

// ─── updateReview ─────────────────────────────────────────────────────────────

/**
 * Updates the rating and/or review text of an existing review.
 * Only the review's original author is allowed to edit it.
 *
 * @param {string} reviewId - ObjectId of the review to update
 * @param {string} userId   - ObjectId of the authenticated user (ownership check)
 * @param {number} rating   - New star rating (1–5)
 * @param {string} review   - New written review text
 * @returns {{ review: Object }} The updated review document
 */
const updateReview = async (reviewId, userId, rating, review) => {
  // Find the review first so we can check ownership
  const existingReview = await Review.findById(reviewId);
  if (!existingReview) throwError(REVIEW_MESSAGES.NOT_FOUND, 404);

  // Ownership guard — compare as strings to avoid ObjectId reference issues
  if (existingReview.user.toString() !== userId.toString()) {
    throwError(REVIEW_MESSAGES.UNAUTHORIZED, 403);
  }

  // Apply the updates selectively — only overwrite fields that were provided
  if (rating  !== undefined) existingReview.rating  = rating;
  if (review  !== undefined) existingReview.review  = review;
  existingReview.isEdited = true;

  await existingReview.save();
  await existingReview.populate("user", "name email");

  return { review: existingReview };
};

// ─── deleteReview ─────────────────────────────────────────────────────────────

/**
 * Permanently deletes a review.
 * Only the review's original author is allowed to delete it.
 *
 * @param {string} reviewId - ObjectId of the review to delete
 * @param {string} userId   - ObjectId of the authenticated user (ownership check)
 * @returns {void}
 */
const deleteReview = async (reviewId, userId) => {
  const review = await Review.findById(reviewId);
  if (!review) throwError(REVIEW_MESSAGES.NOT_FOUND, 404);

  // Ownership guard
  if (review.user.toString() !== userId.toString()) {
    throwError(REVIEW_MESSAGES.UNAUTHORIZED, 403);
  }

  await review.deleteOne();
};

module.exports = {
  addReview,
  getWorkflowReviews,
  updateReview,
  deleteReview,
};
