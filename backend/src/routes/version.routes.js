const express = require("express");
const { getByWorkflowId, create } = require("../controllers/version.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// GET /api/v1/versions/:workflowId — Fetch all versions for a workflow (public)
router.get("/:workflowId", getByWorkflowId);

// POST /api/v1/versions — Create a new workflow version (protected)
router.post("/", protect, create);

module.exports = router;
