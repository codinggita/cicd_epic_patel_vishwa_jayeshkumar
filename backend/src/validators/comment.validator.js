const { body, param, validationResult } = require('express-validator');

/**
 * Validation chain for adding a comment.
 *   - workflowId param must be a valid MongoDB ObjectId.
 *   - content must be a non‑empty string, trimmed, max 1000 chars.
 */
const validateAddComment = [
  param('workflowId')
    .isMongoId().withMessage('Invalid workflow ID'),
  body('content')
    .isString().withMessage('Content must be a string')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Content must be between 1 and 1000 characters')
    .trim(),
  // Middleware to return errors
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

/**
 * Validation chain for updating a comment.
 *   - commentId param must be a valid ObjectId.
 *   - content same constraints as add.
 */
const validateUpdateComment = [
  param('commentId')
    .isMongoId().withMessage('Invalid comment ID'),
  body('content')
    .optional()
    .isString().withMessage('Content must be a string')
    .isLength({ min: 1, max: 1000 })
    .withMessage('Content must be between 1 and 1000 characters')
    .trim(),
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

/**
 * Validation chain for deleting a comment (just validates commentId param).
 */
const validateDeleteComment = [
  param('commentId')
    .isMongoId().withMessage('Invalid comment ID'),
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
  validateAddComment,
  validateUpdateComment,
  validateDeleteComment
};
