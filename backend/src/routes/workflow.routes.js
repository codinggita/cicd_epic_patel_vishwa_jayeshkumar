// src/routes/workflow.routes.js
const express = require('express');
const router = express.Router();
const { createController } = require('../controllers/generic.controller');
const { protect } = require('../middlewares/auth.middleware');

// Collection name must match the key in dataset.json
const controller = createController('workflows');

// Public GET endpoints
router.get('/', controller.getAll);
router.get('/random', controller.getRandom);
router.get('/latest', controller.getLatest);
router.get('/trending', controller.getTrending);
router.get('/:id', controller.getById);

// Protected write endpoints
router.post('/', protect, controller.create);
router.put('/:id', protect, controller.replace);
router.patch('/:id', protect, controller.update);
router.delete('/:id', protect, controller.delete);

module.exports = router;
