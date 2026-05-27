const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const {
  getSummary,
  getActivity,
  getStats,
} = require("../controllers/dashboard.controller");

const router = express.Router();

// GET /api/v1/dashboard/summary — Fetch dashboard summary (protected)
router.get("/summary", protect, getSummary);

// GET /api/v1/dashboard/activity — Fetch recent activity (protected)
router.get("/activity", protect, getActivity);

// GET /api/v1/dashboard/stats — Fetch workflow statistics (protected)
router.get("/stats", protect, getStats);

module.exports = router;
