const Trash = require("../models/trash.model");
const Workflow = require("../models/workflow.model");
const { TRASH_MESSAGES, RESTORE_STATUS } = require("../constants/trash.constants");

/**
 * Moves a workflow to trash by creating a trash record.
 *
 * @param {String} workflowId - ID of the workflow to move to trash
 * @param {String} userId - ID of the user performing the action
 * @returns {Object} - Newly created trash document
 */
const moveToTrash = async (workflowId, userId) => {
  // Check if workflow exists
  const workflow = await Workflow.findById(workflowId);
  if (!workflow) {
    const error = new Error(TRASH_MESSAGES.WORKFLOW_NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  // Check if workflow is already in trash
  const existingTrash = await Trash.findOne({ workflowId, restoreStatus: RESTORE_STATUS.ACTIVE });
  if (existingTrash) {
    const error = new Error("Workflow is already in trash");
    error.statusCode = 400;
    throw error;
  }

  // Create trash record
  const trash = await Trash.create({
    workflowId,
    deletedBy: userId,
  });

  return trash;
};

/**
 * Restores a workflow from trash by updating restore status.
 *
 * @param {String} workflowId - ID of the workflow to restore
 * @returns {Object} - Updated trash document
 */
const restoreFromTrash = async (workflowId) => {
  // Find active trash record
  const trash = await Trash.findOne({ workflowId, restoreStatus: RESTORE_STATUS.ACTIVE });
  if (!trash) {
    const error = new Error(TRASH_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  // Update restore status
  trash.restoreStatus = RESTORE_STATUS.RESTORED;
  await trash.save();

  return trash;
};

/**
 * Fetches all trashed workflows with active restore status.
 *
 * @returns {Array} - Array of trash documents with workflow details
 */
const fetchTrashedWorkflows = async () => {
  const trashedWorkflows = await Trash.find({ restoreStatus: RESTORE_STATUS.ACTIVE })
    .populate("workflowId")
    .populate("deletedBy", "name email")
    .sort({ deletedAt: -1 });

  return trashedWorkflows;
};

module.exports = {
  moveToTrash,
  restoreFromTrash,
  fetchTrashedWorkflows,
};
