const express = require("express");
const { addFavorite, removeFavorite, getFavorites } = require("../controllers/favorite.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// POST /api/v1/favorites/:workflowId — Add workflow to favorites (protected)
router.post("/:workflowId", protect, addFavorite);

// DELETE /api/v1/favorites/:workflowId — Remove workflow from favorites (protected)
router.delete("/:workflowId", protect, removeFavorite);

// GET /api/v1/favorites — Fetch all user favorites (protected)
router.get("/", protect, getFavorites);

module.exports = router;
