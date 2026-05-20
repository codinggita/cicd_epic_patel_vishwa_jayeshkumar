const express = require("express");
const { create, getByWorkflowId } = require("../controllers/history.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// POST /api/v1/history — Create a new history record
router.post("/", protect, create);

// GET /api/v1/history/:workflowId — Fetch history for a specific workflow
router.get("/:workflowId", protect, getByWorkflowId);

module.exports = router;
