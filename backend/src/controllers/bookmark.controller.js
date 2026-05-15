/**
 * bookmark.controller.js
 *
 * Controller layer for bookmark endpoints.
 * Handles HTTP concerns only — no Mongoose, no business logic.
 *
 * Each handler:
 *   1. Extracts what it needs from req (user id, route params, query).
 *   2. Delegates to the service layer.
 *   3. Sends a standardized API response.
 *   4. Lets asyncHandler forward any thrown errors to Express error middleware.
 *
 * Endpoints:
 *   POST   /api/v1/workflows/:id/bookmark  → addBookmark
 *   DELETE /api/v1/workflows/:id/bookmark  → removeBookmark
 *   GET    /api/v1/bookmarks               → getUserBookmarks
 */

const asyncHandler = require("../utils/asyncHandler");
const { sendResponse } = require("../utils/apiResponse");
const bookmarkService = require("../services/bookmark.service");
const { BOOKMARK_MESSAGES } = require("../constants/bookmark.constants");
const HTTP_STATUS = require("../constants/httpStatus");

// ─── addBookmark ──────────────────────────────────────────────────────────────

/**
 * POST /api/v1/workflows/:id/bookmark
 *
 * Bookmarks the workflow specified by :id for the authenticated user.
 * Returns 201 Created on success.
 * Returns 409 Conflict if already bookmarked, 404 if workflow not found.
 */
const addBookmark = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const workflowId = req.params.id;

  const { bookmark } = await bookmarkService.addBookmark(userId, workflowId);

  sendResponse(res, HTTP_STATUS.CREATED, BOOKMARK_MESSAGES.ADDED, { bookmark });
});

// ─── removeBookmark ───────────────────────────────────────────────────────────

/**
 * DELETE /api/v1/workflows/:id/bookmark
 *
 * Removes the authenticated user's bookmark for the workflow specified by :id.
 * Returns 200 OK on success, 404 if the bookmark does not exist.
 */
const removeBookmark = asyncHandler(async (req, res) => {
  const userId = req.user._id;
  const workflowId = req.params.id;

  await bookmarkService.removeBookmark(userId, workflowId);

  sendResponse(res, HTTP_STATUS.OK, BOOKMARK_MESSAGES.REMOVED);
});

// ─── getUserBookmarks ─────────────────────────────────────────────────────────

/**
 * GET /api/v1/bookmarks
 *
 * Returns a paginated list of the authenticated user's bookmarks.
 * Supports ?page=1&limit=10 query params.
 */
const getUserBookmarks = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const { bookmarks, pagination } = await bookmarkService.getUserBookmarks(
    userId,
    req.query
  );

  sendResponse(res, HTTP_STATUS.OK, BOOKMARK_MESSAGES.FETCHED, {
    pagination,
    bookmarks,
  });
});

module.exports = {
  addBookmark,
  removeBookmark,
  getUserBookmarks,
};
