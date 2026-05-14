const express = require("express");
const { register, login, getProfile } = require("../controllers/auth.controller");
const { protect } = require("../middlewares/auth.middleware");

const router = express.Router();

// POST /api/v1/auth/register — Create a new user account
router.post("/register", register);

// POST /api/v1/auth/login — Authenticate user and receive a JWT token
router.post("/login", login);

// GET /api/v1/auth/profile — Get logged-in user's profile (protected)
router.get("/profile", protect, getProfile);

module.exports = router;
