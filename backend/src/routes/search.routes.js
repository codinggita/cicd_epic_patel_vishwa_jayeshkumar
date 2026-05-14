const express = require("express");
const { search, getTags, getByTag, filter } = require("../controllers/search.controller");

const router = express.Router();

// GET /api/v1/search
// Keyword + category + tag search with pagination and sorting
// Example: /api/v1/search?keyword=docker&category=jenkins&page=1&limit=10
router.get("/", search);

// GET /api/v1/search/tags
// Returns all unique tags in the system (for filter dropdowns)
// Example: /api/v1/search/tags
router.get("/tags", getTags);

// GET /api/v1/search/by-tag/:tag
// Returns all workflows with a specific tag (paginated)
// Example: /api/v1/search/by-tag/beginner?page=1&limit=10
router.get("/by-tag/:tag", getByTag);

// GET /api/v1/search/filter
// Filter workflows by category, tag, and sort — no keyword required
// Example: /api/v1/search/filter?category=github-actions&sortBy=likes&sortOrder=desc
router.get("/filter", filter);

module.exports = router;
