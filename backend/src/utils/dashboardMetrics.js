/**
 * dashboardMetrics.js
 *
 * Reusable helper functions for calculating dashboard metrics.
 * Separates metric calculation logic from service layer.
 */

/**
 * Calculates total workflows for a user.
 *
 * @param {String} userId - User ID
 * @param {Object} Workflow - Workflow model
 * @returns {Promise<number>} - Total workflow count
 */
const calculateTotalWorkflows = async (userId, Workflow) => {
  return await Workflow.countDocuments({ createdBy: userId });
};

/**
 * Calculates total views for user's workflows.
 *
 * @param {String} userId - User ID
 * @param {Object} Workflow - Workflow model
 * @returns {Promise<number>} - Total views count
 */
const calculateTotalViews = async (userId, Workflow) => {
  const result = await Workflow.aggregate([
    { $match: { createdBy: userId } },
    { $group: { _id: null, total: { $sum: "$views" } } },
  ]);
  return result[0]?.total || 0;
};

/**
 * Calculates total likes for user's workflows.
 *
 * @param {String} userId - User ID
 * @param {Object} Workflow - Workflow model
 * @returns {Promise<number>} - Total likes count
 */
const calculateTotalLikes = async (userId, Workflow) => {
  const result = await Workflow.aggregate([
    { $match: { createdBy: userId } },
    { $group: { _id: null, total: { $sum: "$likes" } } },
  ]);
  return result[0]?.total || 0;
};

/**
 * Calculates average views per workflow.
 *
 * @param {String} userId - User ID
 * @param {Object} Workflow - Workflow model
 * @returns {Promise<number>} - Average views
 */
const calculateAverageViews = async (userId, Workflow) => {
  const result = await Workflow.aggregate([
    { $match: { createdBy: userId } },
    { $group: { _id: null, avg: { $avg: "$views" } } },
  ]);
  return result[0]?.avg || 0;
};

/**
 * Calculates average likes per workflow.
 *
 * @param {String} userId - User ID
 * @param {Object} Workflow - Workflow model
 * @returns {Promise<number>} - Average likes
 */
const calculateAverageLikes = async (userId, Workflow) => {
  const result = await Workflow.aggregate([
    { $match: { createdBy: userId } },
    { $group: { _id: null, avg: { $avg: "$likes" } } },
  ]);
  return result[0]?.avg || 0;
};

module.exports = {
  calculateTotalWorkflows,
  calculateTotalViews,
  calculateTotalLikes,
  calculateAverageViews,
  calculateAverageLikes,
};
