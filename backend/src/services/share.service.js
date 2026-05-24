/**
 * share.service.js
 *
 * Contains business logic for share management operations.
 * This service handles sharing workflows and fetching shared workflows.
 */

const Share = require("../models/share.model");

/**
 * Shares a workflow with another user.
 *
 * @param {string} workflowId - Workflow MongoDB _id
 * @param {string} sharedBy - User MongoDB _id of the sharer
 * @param {string} sharedWith - User MongoDB _id of the recipient
 * @param {string} permission - Permission level (view/edit)
 * @returns {Object} - Newly created share document
 */
const shareWorkflow = async (workflowId, sharedBy, sharedWith, permission) => {
  if (!workflowId) {
    throw new Error("Workflow ID is required");
  }

  if (!sharedBy) {
    throw new Error("Shared by user ID is required");
  }

  if (!sharedWith) {
    throw new Error("Shared with user ID is required");
  }

  const share = await Share.create({
    workflowId,
    sharedBy,
    sharedWith,
    permission,
  });

  return share;
};

/**
 * Fetches all workflows shared with a specific user.
 *
 * @param {string} userId - User MongoDB _id
 * @returns {Array} - Array of share documents with populated workflow and user data
 */
const getSharedWorkflows = async (userId) => {
  if (!userId) {
    throw new Error("User ID is required");
  }

  const shares = await Share.find({ sharedWith: userId })
    .populate("workflowId")
    .populate("sharedBy", "name email")
    .sort({ createdAt: -1 }) // Most recently shared first
    .lean();

  return shares;
};

module.exports = {
  shareWorkflow,
  getSharedWorkflows,
};
