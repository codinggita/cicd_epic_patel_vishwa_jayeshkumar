// src/routes/workflow.routes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middlewares/auth.middleware');
const workflowController = require('../controllers/workflow.controller');
const { createWorkflowValidator, updateWorkflowValidator } = require('../validators');

// Public GET endpoints
router.get('/', workflowController.getAll);
router.get('/random', workflowController.getRandom);
router.get('/:id', workflowController.getById);

// Protected write endpoints with validation
router.post('/', protect, createWorkflowValidator, workflowController.create);
router.put('/:id', protect, updateWorkflowValidator, workflowController.replace);
router.patch('/:id', protect, updateWorkflowValidator, workflowController.updateContent);
router.delete('/:id', protect, workflowController.remove);

module.exports = router;
