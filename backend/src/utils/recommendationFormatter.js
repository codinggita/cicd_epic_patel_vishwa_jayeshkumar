/**
 * Recommendation Formatter Utility
 *
 * Provides reusable functions to format recommendation responses.
 * Ensures consistent output structure across recommendation endpoints.
 */

/**
 * Formats recommended workflows response with metadata.
 *
 * @param {Array} workflows - Array of workflow documents
 * @returns {Object} - Formatted recommended workflows response
 */
const formatRecommended = (workflows) => {
  return {
    workflows,
    count: workflows.length,
    type: "recommended",
    timestamp: new Date().toISOString(),
    note: "This endpoint returns basic workflow recommendations",
  };
};

/**
 * Formats popular workflows response with metadata.
 *
 * @param {Array} workflows - Array of workflow documents
 * @returns {Object} - Formatted popular workflows response
 */
const formatPopular = (workflows) => {
  return {
    workflows,
    count: workflows.length,
    type: "popular",
    timestamp: new Date().toISOString(),
    note: "This endpoint returns workflows sorted by popularity",
  };
};

module.exports = {
  formatRecommended,
  formatPopular,
};
