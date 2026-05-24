const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const {
  moveWorkflowToTrash,
  restoreWorkflow,
  getTrashedWorkflows,
} = require("../controllers/trash.controller");

const router = express.Router();

// POST /api/v1/trash/:workflowId — Move workflow to trash (protected)
router.post("/:workflowId", protect, moveWorkflowToTrash);

// PATCH /api/v1/trash/:workflowId/restore — Restore workflow from trash (protected)
router.patch("/:workflowId/restore", protect, restoreWorkflow);

// GET /api/v1/trash — Fetch all trashed workflows (protected)
router.get("/", protect, getTrashedWorkflows);

module.exports = router;
