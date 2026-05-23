const express = require("express");
const { exportWorkflow, exportSummary } = require("../controllers/export.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// GET /api/v1/exports/workflows/:id — Export complete workflow data (protected)
router.get("/workflows/:id", protect, exportWorkflow);

// GET /api/v1/exports/workflows/:id/summary — Export workflow summary (protected)
router.get("/workflows/:id/summary", protect, exportSummary);

module.exports = router;
