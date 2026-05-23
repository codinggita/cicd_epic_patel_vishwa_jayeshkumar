/**
 * export.service.js
 *
 * Contains business logic for workflow export operations.
 * This service handles data retrieval and formatting for exports.
 */

const Workflow = require("../models/workflow.model");
const {
  formatWorkflowExport,
  formatWorkflowSummary,
} = require("../utils/exportFormatter");

/**
 * Exports complete workflow data by ID.
 *
 * @param {string} workflowId - Workflow MongoDB _id
 * @returns {Object|null} - Formatted export data or null if not found
 */
const exportWorkflowById = async (workflowId) => {
  if (!workflowId) {
    throw new Error("Workflow ID is required");
  }

  const workflow = await Workflow.findById(workflowId)
    .populate("createdBy", "name email")
    .lean();

  if (!workflow || workflow.isArchived) {
    return null;
  }

  return formatWorkflowExport(workflow);
};

/**
 * Exports workflow summary by ID.
 *
 * @param {string} workflowId - Workflow MongoDB _id
 * @returns {Object|null} - Formatted summary data or null if not found
 */
const exportWorkflowSummary = async (workflowId) => {
  if (!workflowId) {
    throw new Error("Workflow ID is required");
  }

  const workflow = await Workflow.findById(workflowId).lean();

  if (!workflow || workflow.isArchived) {
    return null;
  }

  return formatWorkflowSummary(workflow);
};

module.exports = {
  exportWorkflowById,
  exportWorkflowSummary,
};
