const { searchWorkflows, getAllTags, getWorkflowsByTag } = require("../services/search.service");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatus");

/**
 * GET /api/v1/search
 * Searches workflows using keyword, category, tag filters with pagination.
 *
 * Accepted query params:
 *   ?keyword=docker&category=jenkins&tag=beginner&page=1&limit=10&sortBy=createdAt&sortOrder=desc
 */
const search = asyncHandler(async (req, res) => {
  const { results, pagination } = await searchWorkflows(req.query);

  sendResponse(res, HTTP_STATUS.OK, "Search results fetched successfully", {
    workflows: results,
    pagination,
  });
});

/**
 * GET /api/v1/search/tags
 * Returns a list of all unique tags available across all active workflows.
 * Useful for building tag filter dropdowns or suggestion chips on the frontend.
 */
const getTags = asyncHandler(async (req, res) => {
  const tags = await getAllTags();

  sendResponse(res, HTTP_STATUS.OK, "Tags fetched successfully", { tags });
});

/**
 * GET /api/v1/search/by-tag/:tag
 * Returns all workflows that contain a specific tag, paginated.
 *
 * Accepted query params:
 *   ?page=1&limit=10
 */
const getByTag = asyncHandler(async (req, res) => {
  const { tag } = req.params;
  const { results, pagination } = await getWorkflowsByTag(tag, req.query);

  sendResponse(res, HTTP_STATUS.OK, `Workflows with tag "${tag}" fetched successfully`, {
    workflows: results,
    pagination,
  });
});

/**
 * GET /api/v1/search/filter
 * Advanced filtering endpoint — supports combining category, tag, and sorting
 * without a keyword, making it suitable for browsing/filtering UI patterns.
 *
 * Accepted query params:
 *   ?category=github-actions&tag=intermediate&sortBy=likes&sortOrder=desc&page=1&limit=10
 *
 * NOTE: This reuses the same searchWorkflows service — the filter utility
 * handles the combination of params cleanly under the hood.
 */
const filter = asyncHandler(async (req, res) => {
  const { results, pagination } = await searchWorkflows(req.query);

  sendResponse(res, HTTP_STATUS.OK, "Filtered workflows fetched successfully", {
    workflows: results,
    pagination,
  });
});

module.exports = { search, getTags, getByTag, filter };
