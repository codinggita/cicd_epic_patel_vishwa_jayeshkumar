/**
 * admin.routes.js
 *
 * Defines restricted admin management REST API endpoints.
 *
 * Routes:
 *   GET /api/v1/admin/users     - Fetch all registered users (admin-only)
 *   GET /api/v1/admin/users/:id - Fetch details of a single user (admin-only)
 */

const express = require("express");
const { getUsers, getUserDetails } = require("../controllers/admin.controller");
const { protect } = require("../middlewares/auth.middleware");
const { isAdmin } = require("../middlewares/admin.middleware");

const router = express.Router();

// Apply global admin-protection to all sub-routes
router.use(protect);
router.use(isAdmin);

// GET /api/v1/admin/users — Retrieve all users
router.get("/users", getUsers);

// GET /api/v1/admin/users/:id — Retrieve user details by ID
router.get("/users/:id", getUserDetails);

module.exports = router;
