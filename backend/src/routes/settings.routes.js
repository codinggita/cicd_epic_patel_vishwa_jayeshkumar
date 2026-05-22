const express = require("express");
const { getSettings, updateSettings } = require("../controllers/settings.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// GET /api/v1/settings — Fetch user settings (protected)
router.get("/", protect, getSettings);

// PATCH /api/v1/settings — Update user settings (protected)
router.patch("/", protect, updateSettings);

module.exports = router;
