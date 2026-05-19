/**
 * user.routes.js
 *
 * Defines all routes for the user profile feature.
 *
 * Base path (mounted at /api/v1/users in index.routes.js):
 *
 *   GET   /api/v1/users/me  — fetch authenticated user's profile  [protected]
 *   PATCH /api/v1/users/me  — update authenticated user's profile [protected]
 *
 * Both routes are protected — they require a valid JWT in the
 * Authorization header (handled by the `protect` middleware).
 */

const express = require("express");
const { protect } = require("../middlewares/auth.middleware");
const { getProfile, updateProfile } = require("../controllers/user.controller");

const router = express.Router();

// GET   /api/v1/users/me — get own profile (auth required)
router.get("/me", protect, getProfile);

// PATCH /api/v1/users/me — update own profile (auth required)
router.patch("/me", protect, updateProfile);

module.exports = router;
