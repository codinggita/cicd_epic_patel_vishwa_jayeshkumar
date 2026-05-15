/**
 * bookmark.routes.js
 *
 * Defines routes for the bookmark feature.
 * All routes require authentication — a user must be logged in to
 * bookmark, unbookmark, or view their bookmarks.
 *
 * Base path (mounted in index.routes.js):
 *   /api/v1
 *
 * Full endpoints:
 *   POST   /api/v1/workflows/:id/bookmark  — bookmark a workflow
 *   DELETE /api/v1/workflows/:id/bookmark  — remove a bookmark
 *   GET    /api/v1/bookmarks               — list the current user's bookmarks
 *
 * Note on router splitting:
 *   The two workflow-scoped routes (/workflows/:id/bookmark) are mounted on
 *   the /workflows prefix in index.routes.js so they share the existing
 *   workflow router's base path cleanly.
 *   The standalone GET /bookmarks is mounted on its own /bookmarks prefix.
 */

const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const {
  addBookmark,
  removeBookmark,
  getUserBookmarks,
} = require("../controllers/bookmark.controller");

// ─── Workflow-scoped bookmark router ─────────────────────────────────────────
// Mounted at /api/v1/workflows in index.routes.js
const workflowBookmarkRouter = express.Router();

// POST /api/v1/workflows/:id/bookmark
workflowBookmarkRouter.post("/:id/bookmark", protect, addBookmark);

// DELETE /api/v1/workflows/:id/bookmark
workflowBookmarkRouter.delete("/:id/bookmark", protect, removeBookmark);

// ─── Standalone bookmark router ───────────────────────────────────────────────
// Mounted at /api/v1/bookmarks in index.routes.js
const bookmarkRouter = express.Router();

// GET /api/v1/bookmarks
bookmarkRouter.get("/", protect, getUserBookmarks);

module.exports = { workflowBookmarkRouter, bookmarkRouter };
