/**
 * comment.routes.js
 *
 * Defines all routes for the comment feature.
 *
 * Base path (mounted at /api/v1/comments in index.routes.js):
 *
 *   POST   /api/v1/comments/:workflowId  — add a comment to a workflow       [protected]
 *   GET    /api/v1/comments/:workflowId  — list comments for a workflow       [public]
 *   PATCH  /api/v1/comments/:commentId   — update a comment (owner only)      [protected]
 *   DELETE /api/v1/comments/:commentId   — delete a comment (owner only)      [protected]
 *
 * Route parameter naming:
 *   :workflowId — used on workflow-scoped routes so the purpose is clear.
 *   :commentId  — used on comment-specific routes to avoid ambiguity.
 *   Both are ObjectId strings resolved by the service layer.
 */

const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const {
  addComment,
  getWorkflowComments,
  updateComment,
  deleteComment,
} = require("../controllers/comment.controller");

const router = express.Router();

// ─── Workflow-scoped comment routes ───────────────────────────────────────────

// POST   /api/v1/comments/:workflowId — create a comment (auth required)
router.post("/:workflowId", protect, addComment);

// GET    /api/v1/comments/:workflowId — read comments (public)
router.get("/:workflowId", getWorkflowComments);

// ─── Comment-specific routes ──────────────────────────────────────────────────

// PATCH  /api/v1/comments/:commentId/update — edit a comment (owner only)
router.patch("/:commentId/update", protect, updateComment);

// DELETE /api/v1/comments/:commentId — delete a comment (owner only)
router.delete("/:commentId", protect, deleteComment);

module.exports = router;
