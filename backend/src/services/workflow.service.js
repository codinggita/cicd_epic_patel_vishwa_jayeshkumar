const Workflow = require("../models/workflow.model");

/**
 * Fetches all non-archived workflows from the database.
 *
 * TODO (future PR): Add pagination, filtering by category/tags, sorting
 */
const getAllWorkflows = async () => {
  const workflows = await Workflow.find({ isArchived: false });
  return workflows;
};

/**
 * Fetches a single workflow by its MongoDB _id.
 * Returns null if not found — controller handles the 404 response.
 *
 * TODO (future PR): Increment view count on fetch
 */
const getWorkflowById = async (id) => {
  const workflow = await Workflow.findById(id);
  return workflow;
};

/**
 * Creates a new workflow document in the database.
 *
 * @param {Object} data - Workflow data from the request body
 * @param {string} userId - The _id of the authenticated user (from req.user)
 *
 * TODO (future PR): Add input validation, duplicate title check per user
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
 * Updates the yamlContent of an existing workflow.
 * Only the YAML content is modified — no other fields are touched.
 *
 * @param {string} id - Workflow _id
 * @param {string} yamlContent - New YAML content string
 *
 * TODO (future PR): Add ownership check (only creator can update)
 */
const updateWorkflowContent = async (id, yamlContent) => {
  const workflow = await Workflow.findByIdAndUpdate(
    id,
    { yamlContent },
    { new: true } // Return the updated document
  );
  return workflow;
};

/**
 * Soft-deletes a workflow by setting isArchived to true.
 * We archive instead of permanently deleting to preserve data integrity.
 *
 * TODO (future PR): Add ownership check (only creator or admin can archive)
 */
const deleteWorkflow = async (id) => {
  const workflow = await Workflow.findByIdAndUpdate(
    id,
    { isArchived: true },
    { new: true }
  );
  return workflow;
};

module.exports = {
  getAllWorkflows,
  getWorkflowById,
  createWorkflow,
  updateWorkflowContent,
  deleteWorkflow,
};
