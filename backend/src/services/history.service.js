const History = require("../models/history.model");

/**
 * Creates a new history record.
 *
 * @param {Object} data - History fields from the request body
 * @returns {Object} - Newly created history document
 */
const createHistory = async (data) => {
  const { workflowId, userId, action, description } = data;

  const history = await History.create({
    workflowId,
    userId,
    action,
    description,
  });

  return history;
};

/**
 * Fetches all history records for a specific workflow.
 *
 * @param {String} workflowId - ID of the workflow to fetch history for
 * @returns {Array} - Array of history documents
 */
const getWorkflowHistory = async (workflowId) => {
  const history = await History.find({ workflowId })
    .sort({ createdAt: -1 })
    .exec();

  return history;
};

module.exports = {
  createHistory,
  getWorkflowHistory,
};
