const {
  getRecommendedWorkflows,
  getPopularWorkflows,
} = require("../services/recommendation.service");
const { sendResponse } = require("../utils/apiResponse");
const asyncHandler = require("../utils/asyncHandler");
const HTTP_STATUS = require("../constants/httpStatus");
const { RECOMMENDATION_MESSAGES } = require("../constants/recommendation.constants");

/**
 * GET /api/v1/recommendations
 * Returns recommended workflows.
 *
 * asyncHandler wraps the function so we don't need try/catch here.
 * Any thrown error is automatically passed to the global error middleware.
 */
const getRecommended = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const recommendations = await getRecommendedWorkflows(limit);
  sendResponse(res, HTTP_STATUS.OK, RECOMMENDATION_MESSAGES.RECOMMENDED_FETCHED, recommendations);
});

/**
 * GET /api/v1/recommendations/popular
 * Returns popular workflows.
 */
const getPopular = asyncHandler(async (req, res) => {
  const limit = parseInt(req.query.limit) || 10;
  const popular = await getPopularWorkflows(limit);
  sendResponse(res, HTTP_STATUS.OK, RECOMMENDATION_MESSAGES.POPULAR_FETCHED, popular);
});

module.exports = { getRecommended, getPopular };
