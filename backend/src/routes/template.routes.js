const express = require("express");
const { getAll, create } = require("../controllers/template.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// GET /api/v1/templates — Fetch all templates (public)
router.get("/", getAll);

// POST /api/v1/templates — Create a new template (protected)
router.post("/", protect, create);

module.exports = router;
