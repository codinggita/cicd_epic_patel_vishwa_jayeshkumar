const express = require("express");
const { getSessions, deleteSession } = require("../controllers/session.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// GET /api/v1/sessions — Fetch all active sessions for authenticated user (protected)
router.get("/", protect, getSessions);

// DELETE /api/v1/sessions/:id — Terminate a specific session (protected)
router.delete("/:id", protect, deleteSession);

module.exports = router;
