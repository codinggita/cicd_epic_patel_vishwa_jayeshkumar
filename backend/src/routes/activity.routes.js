const express = require("express");
const { create, getByUserId } = require("../controllers/activity.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// POST /api/v1/activities — Create a new activity record (protected)
router.post("/", protect, create);

// GET /api/v1/activities/:userId — Fetch activities by user ID (protected)
router.get("/:userId", protect, getByUserId);

module.exports = router;
