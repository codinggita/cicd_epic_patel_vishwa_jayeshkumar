const Workflow = require("../models/workflow.model");
const { WORKFLOW_MESSAGES, RUN_STATUS } = require("../config/constants");

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

/**
 * Replaces an entire workflow document.
 *
 * @param {String} id - Workflow ID
 * @param {Object} data - Complete workflow data
 * @param {String} userId - User ID for ownership check
 * @returns {Object} - Updated workflow document
 */
const replaceWorkflow = async (id, data, userId) => {
  const workflow = await Workflow.findById(id);
  if (!workflow) {
    const error = new Error(WORKFLOW_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  if (workflow.createdBy.toString() !== userId) {
    const error = new Error("Unauthorized: Only workflow owner can replace");
    error.statusCode = 403;
    throw error;
  }

  const updatedWorkflow = await Workflow.findByIdAndUpdate(
    id,
    { ...data, createdBy: userId },
    { new: true, runValidators: true }
  ).populate("createdBy", "name email");

  return updatedWorkflow;
};

/**
 * Updates workflow content only.
 *
 * @param {String} id - Workflow ID
 * @param {Object} data - Content data (yamlContent, description, etc.)
 * @param {String} userId - User ID for ownership check
 * @returns {Object} - Updated workflow document
 */
const updateWorkflowContent = async (id, data, userId) => {
  const workflow = await Workflow.findById(id);
  if (!workflow) {
    const error = new Error(WORKFLOW_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  if (workflow.createdBy.toString() !== userId) {
    const error = new Error("Unauthorized: Only workflow owner can update content");
    error.statusCode = 403;
    throw error;
  }

  const updatedWorkflow = await Workflow.findByIdAndUpdate(
    id,
    data,
    { new: true, runValidators: true }
  ).populate("createdBy", "name email");

  return updatedWorkflow;
};

/**
 * Fetches a random workflow.
 *
 * @returns {Object} - Random workflow document
 */
const getRandomWorkflow = async () => {
  const count = await Workflow.countDocuments({ isArchived: false });
  if (count === 0) {
    const error = new Error(WORKFLOW_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  const random = Math.floor(Math.random() * count);
  const workflow = await Workflow.findOne({ isArchived: false })
    .skip(random)
    .populate("createdBy", "name email");

  return workflow;
};

/**
 * Fetches workflow history.
 *
 * @param {String} id - Workflow ID
 * @returns {Object} - Workflow history data
 */
const getWorkflowHistory = async (id) => {
  const workflow = await Workflow.findById(id);
  if (!workflow) {
    const error = new Error(WORKFLOW_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  // Return basic history information (createdAt, updatedAt)
  return {
    workflowId: workflow._id,
    title: workflow.title,
    createdAt: workflow.createdAt,
    updatedAt: workflow.updatedAt,
  };
};

/**
 * Archives a workflow.
 *
 * @param {String} id - Workflow ID
 * @param {String} userId - User ID for ownership check
 * @returns {Object} - Updated workflow document
 */
const archiveWorkflow = async (id, userId) => {
  const workflow = await Workflow.findById(id);
  if (!workflow) {
    const error = new Error(WORKFLOW_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  if (workflow.createdBy.toString() !== userId) {
    const error = new Error("Unauthorized: Only workflow owner can archive");
    error.statusCode = 403;
    throw error;
  }

  workflow.isArchived = true;
  await workflow.save();

  return workflow;
};

/**
 * Restores an archived workflow.
 *
 * @param {String} id - Workflow ID
 * @param {String} userId - User ID for ownership check
 * @returns {Object} - Updated workflow document
 */
const restoreWorkflow = async (id, userId) => {
  const workflow = await Workflow.findById(id);
  if (!workflow) {
    const error = new Error(WORKFLOW_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  if (workflow.createdBy.toString() !== userId) {
    const error = new Error("Unauthorized: Only workflow owner can restore");
    error.statusCode = 403;
    throw error;
  }

  workflow.isArchived = false;
  await workflow.save();

  return workflow;
};

/**
 * Clones a workflow.
 *
 * @param {String} id - Workflow ID to clone
 * @param {String} userId - User ID who is cloning
 * @returns {Object} - New cloned workflow document
 */
const cloneWorkflow = async (id, userId) => {
  const originalWorkflow = await Workflow.findById(id);
  if (!originalWorkflow) {
    const error = new Error(WORKFLOW_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  const clonedWorkflow = await Workflow.create({
    title: `${originalWorkflow.title} (Clone)`,
    description: originalWorkflow.description,
    category: originalWorkflow.category,
    tags: originalWorkflow.tags,
    yamlContent: originalWorkflow.yamlContent,
    createdBy: userId,
  });

  return clonedWorkflow;
};

/**
 * Fetches workflow logs.
 *
 * @param {String} id - Workflow ID
 * @returns {Object} - Workflow logs data
 */
const getWorkflowLogs = async (id) => {
  const workflow = await Workflow.findById(id);
  if (!workflow) {
    const error = new Error(WORKFLOW_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  // Return mock logs data (in real implementation, this would fetch from a logs collection)
  return {
    workflowId: workflow._id,
    title: workflow.title,
    logs: [
      {
        timestamp: workflow.createdAt,
        level: "info",
        message: "Workflow created",
      },
    ],
  };
};

/**
 * Fetches workflow metrics.
 *
 * @param {String} id - Workflow ID
 * @returns {Object} - Workflow metrics data
 */
const getWorkflowMetrics = async (id) => {
  const workflow = await Workflow.findById(id);
  if (!workflow) {
    const error = new Error(WORKFLOW_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  return {
    workflowId: workflow._id,
    title: workflow.title,
    views: workflow.views,
    likes: workflow.likes,
    createdAt: workflow.createdAt,
    updatedAt: workflow.updatedAt,
  };
};

/**
 * Triggers a workflow run.
 *
 * @param {String} id - Workflow ID
 * @param {String} userId - User ID for ownership check
 * @returns {Object} - Run status data
 */
const triggerWorkflowRun = async (id, userId) => {
  const workflow = await Workflow.findById(id);
  if (!workflow) {
    const error = new Error(WORKFLOW_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  if (workflow.createdBy.toString() !== userId) {
    const error = new Error("Unauthorized: Only workflow owner can trigger run");
    error.statusCode = 403;
    throw error;
  }

  // Return mock run status (in real implementation, this would trigger actual CI/CD run)
  return {
    workflowId: workflow._id,
    title: workflow.title,
    status: RUN_STATUS.PENDING,
    triggeredAt: new Date(),
    triggeredBy: userId,
  };
};

/**
 * Cancels a running workflow.
 *
 * @param {String} id - Workflow ID
 * @param {String} userId - User ID for ownership check
 * @returns {Object} - Cancellation status data
 */
const cancelWorkflowRun = async (id, userId) => {
  const workflow = await Workflow.findById(id);
  if (!workflow) {
    const error = new Error(WORKFLOW_MESSAGES.NOT_FOUND);
    error.statusCode = 404;
    throw error;
  }

  if (workflow.createdBy.toString() !== userId) {
    const error = new Error("Unauthorized: Only workflow owner can cancel run");
    error.statusCode = 403;
    throw error;
  }

  // Return mock cancellation status (in real implementation, this would cancel actual CI/CD run)
  return {
    workflowId: workflow._id,
    title: workflow.title,
    status: RUN_STATUS.CANCELLED,
    cancelledAt: new Date(),
    cancelledBy: userId,
  };
};

module.exports = {
  getAllWorkflows,
  getWorkflowById,
  createWorkflow,
  deleteWorkflow,
  replaceWorkflow,
  updateWorkflowContent,
  getRandomWorkflow,
  getWorkflowHistory,
  archiveWorkflow,
  restoreWorkflow,
  cloneWorkflow,
  getWorkflowLogs,
  getWorkflowMetrics,
  triggerWorkflowRun,
  cancelWorkflowRun,
};
