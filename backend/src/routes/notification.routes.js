const express = require("express");
const { getAll, markAsRead } = require("../controllers/notification.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// GET /api/v1/notifications — Fetch all notifications for authenticated user
router.get("/", protect, getAll);

// PATCH /api/v1/notifications/:id/read — Mark a notification as read
router.patch("/:id/read", protect, markAsRead);

module.exports = router;
