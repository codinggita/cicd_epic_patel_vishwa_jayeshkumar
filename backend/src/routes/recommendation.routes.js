const express = require("express");
const { getRecommended, getPopular } = require("../controllers/recommendation.controller");

const router = express.Router();

// GET /api/v1/recommendations — Fetch recommended workflows (public)
router.get("/", getRecommended);

// GET /api/v1/recommendations/popular — Fetch popular workflows (public)
router.get("/popular", getPopular);

module.exports = router;
