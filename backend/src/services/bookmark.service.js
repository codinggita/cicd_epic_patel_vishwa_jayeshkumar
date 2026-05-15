/**
 * bookmark.service.js
 *
 * Service layer for all bookmark business logic.
 * Controllers call these functions — no Mongoose code lives in controllers.
 *
 * Functions:
 *   addBookmark      — bookmark a workflow (idempotency guard included)
 *   removeBookmark   — remove an existing bookmark
 *   getUserBookmarks — paginated list of a user's bookmarks
 */

const Bookmark = require("../models/bookmark.model");
const Workflow = require("../models/workflow.model");
const { BOOKMARK_MESSAGES, BOOKMARK_PAGINATION } = require("../constants/bookmark.constants");

// ─── addBookmark ──────────────────────────────────────────────────────────────

/**
 * Saves a new bookmark for the given user + workflow pair.
 *
 * Steps:
 *   1. Verify the workflow exists and is not archived.
 *   2. Check whether the bookmark already exists (application-level guard).
 *      The unique index on the model is the hard stop; this gives a friendlier error.
 *   3. Create and return the new bookmark.
 *
 * @param {string} userId     - ObjectId of the authenticated user
 * @param {string} workflowId - ObjectId of the workflow to bookmark
 * @returns {{ bookmark: Object }} The newly created bookmark document
 * @throws {Error} with a `statusCode` property so the controller can respond correctly
 */
const addBookmark = async (userId, workflowId) => {
  // 1. Confirm the workflow exists and is not archived
  const workflow = await Workflow.findOne({ _id: workflowId, isArchived: false });
  if (!workflow) {
    const err = new Error(BOOKMARK_MESSAGES.WORKFLOW_NOT_FOUND);
    err.statusCode = 404;
    throw err;
  }

  // 2. Guard against duplicates at the application layer
  const existing = await Bookmark.findOne({ user: userId, workflow: workflowId });
  if (existing) {
    const err = new Error(BOOKMARK_MESSAGES.ALREADY_BOOKMARKED);
    err.statusCode = 409;
    throw err;
  }

  // 3. Create the bookmark
  const bookmark = await Bookmark.create({ user: userId, workflow: workflowId });

  return { bookmark };
};

// ─── removeBookmark ───────────────────────────────────────────────────────────

/**
 * Deletes the bookmark for the given user + workflow pair.
 *
 * Only the owner can remove their own bookmark — the query includes `user`
 * so a different user's JWT cannot delete someone else's bookmark.
 *
 * @param {string} userId     - ObjectId of the authenticated user
 * @param {string} workflowId - ObjectId of the bookmarked workflow
 * @returns {void}
 * @throws {Error} with a `statusCode` property if the bookmark does not exist
 */
const removeBookmark = async (userId, workflowId) => {
  const deleted = await Bookmark.findOneAndDelete({
    user: userId,
    workflow: workflowId,
  });

  if (!deleted) {
    const err = new Error(BOOKMARK_MESSAGES.NOT_BOOKMARKED);
    err.statusCode = 404;
    throw err;
  }
};

// ─── getUserBookmarks ─────────────────────────────────────────────────────────

/**
 * Returns a paginated list of bookmarks belonging to the authenticated user.
 * Each bookmark is populated with key workflow fields so the frontend can
 * render a card without a second request.
 *
 * @param {string} userId   - ObjectId of the authenticated user
 * @param {Object} query    - Express req.query (for ?page= and ?limit=)
 * @returns {{ bookmarks: Array, pagination: Object }}
 */
const getUserBookmarks = async (userId, query) => {
  // Parse and clamp pagination params
  const page  = Math.max(1, parseInt(query.page)  || 1);
  const limit = Math.min(
    BOOKMARK_PAGINATION.MAX_LIMIT,
    Math.max(1, parseInt(query.limit) || BOOKMARK_PAGINATION.DEFAULT_LIMIT)
  );
  const skip = (page - 1) * limit;

  // Run count and data queries in parallel for performance
  const [totalCount, bookmarks] = await Promise.all([
    Bookmark.countDocuments({ user: userId }),
    Bookmark.find({ user: userId })
      .sort({ createdAt: -1 }) // most recently bookmarked first
      .skip(skip)
      .limit(limit)
      .populate("workflow", "title category tags views likes createdAt") // only needed fields
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

  return { bookmarks, pagination };
};

module.exports = {
  addBookmark,
  removeBookmark,
  getUserBookmarks,
};
