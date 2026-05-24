const express = require("express");
const { share, getShares } = require("../controllers/share.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// POST /api/v1/shares/:workflowId — Share a workflow with another user (protected)
router.post("/:workflowId", protect, share);

// GET /api/v1/shares — Fetch all workflows shared with authenticated user (protected)
router.get("/", protect, getShares);

module.exports = router;
