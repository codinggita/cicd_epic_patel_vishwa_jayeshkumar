const Workflow = require("../models/workflow.model");
const { RECOMMENDATION_DEFAULTS } = require("../config/constants");
const {
  formatRecommended,
  formatPopular,
} = require("../utils/recommendationFormatter");

/**
 * Fetches recommended workflows.
 * Returns recent workflows that are not archived.
 *
 * @param {Number} limit - Maximum number of workflows to return
 * @returns {Object} - Formatted recommended workflows response
 */
const getRecommendedWorkflows = async (limit = RECOMMENDATION_DEFAULTS.LIMIT) => {
  const workflows = await Workflow.find({ isArchived: false })
    .sort({ createdAt: -1 })
    .limit(limit);

  const formatted = formatRecommended(workflows);
  return formatted;
};

/**
 * Fetches popular workflows.
 * Returns workflows sorted by likes and views.
 *
 * @param {Number} limit - Maximum number of workflows to return
 * @returns {Object} - Formatted popular workflows response
 */
const getPopularWorkflows = async (limit = RECOMMENDATION_DEFAULTS.LIMIT) => {
  const workflows = await Workflow.find({ isArchived: false })
    .sort({ likes: -1, views: -1 })
    .limit(limit);

  const formatted = formatPopular(workflows);
  return formatted;
};

module.exports = {
  getRecommendedWorkflows,
  getPopularWorkflows,
};
