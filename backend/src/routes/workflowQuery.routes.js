/**
 * workflowQuery.routes.js
 *
 * Defines the advanced workflow query routes.
 * All routes are public (no authentication required) — they power
 * the discovery/browse experience of the StackOrbit frontend.
 *
 * IMPORTANT — Route ordering matters:
 *   These named routes (/latest, /popular, etc.) MUST be registered
 *   BEFORE the existing /:id route in the parent router, otherwise
 *   Express will treat "latest" as an ID and route to the wrong handler.
 *
 * Base path (mounted in index.routes.js):
 *   /api/v1/workflows
 *
 * Full endpoints:
 *   GET /api/v1/workflows/latest
 *   GET /api/v1/workflows/popular
 *   GET /api/v1/workflows/recommended
 *   GET /api/v1/workflows/trending
 */

const express = require("express");
const {
  getLatest,
  getPopular,
  getRecommended,
  getTrending,
} = require("../controllers/workflowQuery.controller");

const router = express.Router();

// GET /api/v1/workflows/latest — most recently created workflows
router.get("/latest", getLatest);

// GET /api/v1/workflows/popular — workflows with highest view count
router.get("/popular", getPopular);

// GET /api/v1/workflows/recommended — workflows with highest like count
router.get("/recommended", getRecommended);

// GET /api/v1/workflows/trending — high-view workflows from the last 7 days
router.get("/trending", getTrending);

module.exports = router;
