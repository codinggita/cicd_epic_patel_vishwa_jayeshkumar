// src/validators/index.js
// Central export for all validation middleware
module.exports = {
  // Workflow validators
  createWorkflowValidator: require('./workflow.validator').createWorkflowValidator,
  updateWorkflowValidator: require('./workflow.validator').updateWorkflowValidator,
  // Bookmark validators (if any)
  // Example: const { validateBookmarkWorkflowId } = require('./bookmark.validator');
  // Add other validators here as you create them
};
