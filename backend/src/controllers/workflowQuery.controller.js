/**
 * workflowQuery.controller.js
 *
 * Controller layer for advanced workflow query endpoints.
 * Each handler is intentionally thin — it only handles HTTP concerns
 * (parsing req, calling the service, sending the response).
 *
 * All data-access logic lives in workflowQuery.service.js.
 *
 * Endpoints handled:
 *   GET /api/v1/workflows/latest       → getLatest
 *   GET /api/v1/workflows/popular      → getPopular
 *   GET /api/v1/workflows/recommended  → getRecommended
 *   GET /api/v1/workflows/trending     → getTrending
 */

const asyncHandler = require("../utils/asyncHandler");
const { sendResponse } = require("../utils/apiResponse");
const {
  getLatestWorkflows,
  getPopularWorkflows,
  getRecommendedWorkflows,
  getTrendingWorkflows,
} = require("../services/workflowQuery.service");

// HTTP 200 OK — reused across all handlers
const HTTP_OK = 200;

// ─── Handlers ─────────────────────────────────────────────────────────────────

/**
 * getLatest
 *
 * GET /api/v1/workflows/latest
 * Returns the most recently created workflows (newest first).
 */
const getLatest = asyncHandler(async (req, res) => {
  const workflows = await getLatestWorkflows();
  sendResponse(res, HTTP_OK, "Latest workflows fetched successfully", {
    count: workflows.length,
    workflows,
  });
});

/**
 * getPopular
 *
 * GET /api/v1/workflows/popular
 * Returns workflows sorted by view count (highest first).
 */
const getPopular = asyncHandler(async (req, res) => {
  const workflows = await getPopularWorkflows();
  sendResponse(res, HTTP_OK, "Popular workflows fetched successfully", {
    count: workflows.length,
    workflows,
  });
});

/**
 * getRecommended
 *
 * GET /api/v1/workflows/recommended
 * Returns workflows sorted by likes (most liked first).
 */
const getRecommended = asyncHandler(async (req, res) => {
  const workflows = await getRecommendedWorkflows();
  sendResponse(res, HTTP_OK, "Recommended workflows fetched successfully", {
    count: workflows.length,
    workflows,
  });
});

/**
 * getTrending
 *
 * GET /api/v1/workflows/trending
 * Returns recently created workflows (last 7 days) sorted by views.
 */
const getTrending = asyncHandler(async (req, res) => {
  const workflows = await getTrendingWorkflows();
  sendResponse(res, HTTP_OK, "Trending workflows fetched successfully", {
    count: workflows.length,
    workflows,
  });
});

module.exports = {
  getLatest,
  getPopular,
  getRecommended,
  getTrending,
};
