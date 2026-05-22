const Version = require("../models/version.model");

/**
 * Fetches all versions for a specific workflow.
 *
 * @param {String} workflowId - ID of the workflow
 * @returns {Array} - Array of version documents
 */
const getWorkflowVersions = async (workflowId) => {
  const versions = await Version.find({ workflowId }).sort({ versionNumber: -1 });
  return versions;
};

/**
 * Creates a new workflow version document in the database.
 *
 * @param {Object} data - Version fields from the request body
 * @param {String} userId - ID of the user creating the version
 * @returns {Object} - Newly created version document
 */
const createWorkflowVersion = async (data, userId) => {
  const { workflowId, versionNumber, content } = data;

  const version = await Version.create({
    workflowId,
    versionNumber,
    content,
    createdBy: userId,
  });

  return version;
};

module.exports = {
  getWorkflowVersions,
  createWorkflowVersion,
};
