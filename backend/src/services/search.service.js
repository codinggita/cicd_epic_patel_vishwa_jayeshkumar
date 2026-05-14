const Workflow = require("../models/workflow.model");
const { getPaginationParams, buildPaginationMeta } = require("../utils/pagination");
const { buildWorkflowFilter } = require("../utils/filterBuilder");

/**
 * Searches workflows with optional keyword, category, tag filters
 * and returns paginated results.
 *
 * @param {Object} query - Express req.query (keyword, category, tag, page, limit, sortBy, sortOrder)
 * @returns {{ results: Array, pagination: Object }}
 *
 * TODO (future PR): Add text indexes on title/description for better performance
 */
const searchWorkflows = async (query) => {
  const { filter, sortOptions } = buildWorkflowFilter(query);
  const { page, limit, skip } = getPaginationParams(query);

  // Run both the paginated query and the total count in parallel for efficiency
  const [results, totalCount] = await Promise.all([
    Workflow.find(filter)
      .populate("createdBy", "name email")
      .sort(sortOptions)
      .skip(skip)
      .limit(limit),
    Workflow.countDocuments(filter),
  ]);

  const pagination = buildPaginationMeta(page, limit, totalCount);

  return { results, pagination };
};

/**
 * Fetches all unique tags that exist across non-archived workflows.
 * Used to power a tag suggestion / filter UI on the frontend.
 *
 * @returns {string[]} - Sorted array of unique tag strings
 *
 * TODO (future PR): Cache this result (tags rarely change, no need to re-query every time)
 */
const getAllTags = async () => {
  // MongoDB's .distinct() returns unique values for an array field efficiently
  const tags = await Workflow.distinct("tags", { isArchived: false });
  return tags.sort(); // Alphabetical order for consistent UI display
};

/**
 * Fetches all non-archived workflows that contain a specific tag.
 * Results are paginated.
 *
 * @param {string} tag   - Tag to filter by (from URL param)
 * @param {Object} query - Express req.query for pagination options
 * @returns {{ results: Array, pagination: Object }}
 */
const getWorkflowsByTag = async (tag, query) => {
  const { page, limit, skip } = getPaginationParams(query);

  const filter = {
    isArchived: false,
    tags: { $in: [tag.toLowerCase()] },
  };

  const [results, totalCount] = await Promise.all([
    Workflow.find(filter)
      .populate("createdBy", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit),
    Workflow.countDocuments(filter),
  ]);

  const pagination = buildPaginationMeta(page, limit, totalCount);

  return { results, pagination };
};

module.exports = { searchWorkflows, getAllTags, getWorkflowsByTag };
