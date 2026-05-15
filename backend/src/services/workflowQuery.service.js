/**
 * workflowQuery.service.js
 *
 * Service layer for advanced workflow query endpoints.
 * All database interaction lives here — controllers stay thin and focused.
 *
 * Responsibilities:
 *   - Query the Workflow collection for specific read-patterns
 *   - Apply consistent filters (isArchived: false) on every query
 *   - Delegate sorting to the reusable sortBuilder utility
 *   - Return plain JS objects (lean()) for performance
 *
 * What belongs here vs. the controller:
 *   Controller  → HTTP concerns (req, res, status codes)
 *   Service     → Business / data-access logic
 */

const Workflow = require("../models/workflow.model");
const { buildSort } = require("../utils/sortBuilder");
const { QUERY_LIMITS } = require("../constants/workflow.constants");

// ─── Shared base filter ───────────────────────────────────────────────────────

/**
 * Every public query should exclude archived workflows.
 * Centralising the filter here avoids repeating it in every function.
 */
const BASE_FILTER = { isArchived: false };

// ─── Service functions ────────────────────────────────────────────────────────

/**
 * getLatestWorkflows
 *
 * Returns the most recently created workflows, sorted by `createdAt` DESC.
 * Classic "new arrivals" feed — newest first.
 *
 * @returns {Promise<Array>} Array of workflow documents
 */
const getLatestWorkflows = async () => {
  const sort = buildSort("createdAt", "desc");

  return Workflow.find(BASE_FILTER)
    .sort(sort)
    .limit(QUERY_LIMITS.LATEST)
    .select("title category tags views likes createdAt")
    .lean();
};

/**
 * getPopularWorkflows
 *
 * Returns workflows with the highest view count.
 * "Popular" = most viewed by the community.
 *
 * @returns {Promise<Array>} Array of workflow documents
 */
const getPopularWorkflows = async () => {
  const sort = buildSort("views", "desc");

  return Workflow.find(BASE_FILTER)
    .sort(sort)
    .limit(QUERY_LIMITS.POPULAR)
    .select("title category tags views likes createdAt")
    .lean();
};

/**
 * getRecommendedWorkflows
 *
 * Returns workflows sorted by `likes` DESC.
 * "Recommended" = community-approved (most liked).
 * Simple, deterministic, and no AI required.
 *
 * @returns {Promise<Array>} Array of workflow documents
 */
const getRecommendedWorkflows = async () => {
  const sort = buildSort("likes", "desc");

  return Workflow.find(BASE_FILTER)
    .sort(sort)
    .limit(QUERY_LIMITS.RECOMMENDED)
    .select("title category tags views likes createdAt")
    .lean();
};

/**
 * getTrendingWorkflows
 *
 * Returns recently created workflows that also have high views.
 * "Trending" = active in the last 7 days, ordered by views.
 * This is the simplest form of a trending signal without aggregation.
 *
 * @returns {Promise<Array>} Array of workflow documents
 */
const getTrendingWorkflows = async () => {
  // Look back 7 days from the current moment
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

  const sort = buildSort("views", "desc");

  return Workflow.find({
    ...BASE_FILTER,
    createdAt: { $gte: sevenDaysAgo },
  })
    .sort(sort)
    .limit(QUERY_LIMITS.TRENDING)
    .select("title category tags views likes createdAt")
    .lean();
};

module.exports = {
  getLatestWorkflows,
  getPopularWorkflows,
  getRecommendedWorkflows,
  getTrendingWorkflows,
};
