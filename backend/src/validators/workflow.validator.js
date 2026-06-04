const { body, param } = require('express-validator');

// Validation rules for creating a workflow
const createWorkflowValidator = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isString()
    .withMessage('Title must be a string'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('steps')
    .isArray({ min: 1 })
    .withMessage('Steps must be a non‑empty array'),
  body('steps.*.name')
    .trim()
    .notEmpty()
    .withMessage('Each step must have a name'),
  body('steps.*.command')
    .trim()
    .notEmpty()
    .withMessage('Each step must have a command')
];

// Validation rules for updating a workflow (id param + optional fields)
const updateWorkflowValidator = [
  param('id')
    .isMongoId()
    .withMessage('Invalid workflow ID'),
  body('title')
    .optional()
    .isString()
    .withMessage('Title must be a string'),
  body('description')
    .optional()
    .isString()
    .withMessage('Description must be a string'),
  body('steps')
    .optional()
    .isArray()
    .withMessage('Steps must be an array'),
  body('steps.*.name')
    .optional()
    .isString()
    .withMessage('Step name must be a string'),
  body('steps.*.command')
    .optional()
    .isString()
    .withMessage('Step command must be a string')
];

module.exports = {
  createWorkflowValidator,
  updateWorkflowValidator
};
