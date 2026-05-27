const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const {
  getPreferences,
  updatePreferences,
} = require("../controllers/preferences.controller");

const router = express.Router();

// GET /api/v1/preferences — Fetch user preferences (protected)
router.get("/", protect, getPreferences);

// PATCH /api/v1/preferences — Update user preferences (protected)
router.patch("/", protect, updatePreferences);

module.exports = router;
