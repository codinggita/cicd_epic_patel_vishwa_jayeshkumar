const Workflow = require("../models/workflow.model");

/**
 * Fetches all workflows from the database.
 * Only returns non-archived workflows to keep the list clean.
 *
 * TODO (future PR): Add pagination, filtering by category/tags, sorting
 */
const getAllWorkflows = async () => {
  const workflows = await Workflow.find({ isArchived: false }).populate(
    "createdBy",
    "name email" // Only expose safe user fields, never the password
  );
  return workflows;
};

/**
 * Fetches a single workflow by its MongoDB _id.
 * Returns null if not found — the controller handles the 404 response.
 *
 * TODO (future PR): Increment view count on each fetch
 */
const getWorkflowById = async (id) => {
  const workflow = await Workflow.findById(id).populate(
    "createdBy",
    "name email"
  );
  return workflow;
};

/**
 * Creates a new workflow document in the database.
 *
 * @param {Object} data   - Validated workflow fields from the request body
 * @param {string} userId - _id of the authenticated user (from req.user)
 *
 * TODO (future PR): Check for duplicate title per user before creating
 */
const createWorkflow = async (data, userId) => {
  const { title, description, category, tags, yamlContent } = data;

  const workflow = await Workflow.create({
    title,
    description,
    category,
    tags,
    yamlContent,
    createdBy: userId,
  });

  return workflow;
};

/**
 * Permanently deletes a workflow from the database by its _id.
 *
 * Returns the deleted document so the controller can confirm it existed.
 * Returns null if no document matched — controller handles the 404.
 *
 * TODO (future PR): Add ownership check (only creator or admin can delete)
 */
const deleteWorkflow = async (id) => {
  const workflow = await Workflow.findByIdAndDelete(id);
  return workflow;
};

module.exports = {
  getAllWorkflows,
  getWorkflowById,
  createWorkflow,
  deleteWorkflow,
};
