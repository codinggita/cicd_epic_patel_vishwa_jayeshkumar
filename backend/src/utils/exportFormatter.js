/**
 * exportFormatter utility
 *
 * Provides reusable functions to format workflow data for export.
 * Ensures consistent export structure across the export module.
 */

/**
 * Formats complete workflow data for export.
 *
 * @param {Object} workflow - Workflow document from database
 * @returns {Object} - Formatted export data
 */
const formatWorkflowExport = (workflow) => {
  if (!workflow) {
    return null;
  }

  return {
    metadata: {
      id: workflow._id,
      title: workflow.title,
      description: workflow.description,
      category: workflow.category,
      tags: workflow.tags,
      createdAt: workflow.createdAt,
      updatedAt: workflow.updatedAt,
    },
    content: {
      yamlContent: workflow.yamlContent,
    },
    stats: {
      views: workflow.views || 0,
      likes: workflow.likes || 0,
    },
    creator: workflow.createdBy
      ? {
          id: workflow.createdBy._id,
          name: workflow.createdBy.name,
          email: workflow.createdBy.email,
        }
      : null,
  };
};

/**
 * Formats workflow summary for export.
 *
 * @param {Object} workflow - Workflow document from database
 * @returns {Object} - Formatted summary data
 */
const formatWorkflowSummary = (workflow) => {
  if (!workflow) {
    return null;
  }

  return {
    id: workflow._id,
    title: workflow.title,
    description: workflow.description,
    category: workflow.category,
    tags: workflow.tags,
    stats: {
      views: workflow.views || 0,
      likes: workflow.likes || 0,
    },
    createdAt: workflow.createdAt,
    updatedAt: workflow.updatedAt,
  };
};

module.exports = {
  formatWorkflowExport,
  formatWorkflowSummary,
};
