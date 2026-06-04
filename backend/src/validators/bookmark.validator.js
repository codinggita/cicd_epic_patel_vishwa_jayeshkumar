const { param, validationResult } = require('express-validator');

/**
 * Validate workflowId param for bookmark actions.
 */
const validateBookmarkWorkflowId = [
  param('id')
    .isMongoId().withMessage('Invalid workflow ID'),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        statusCode: 400,
        message: 'Validation failed',
        errors: errors.array()
      });
    }
    next();
  }
];

module.exports = {
  validateBookmarkWorkflowId,
};
