/**
 * debug.routes.js
 *
 * Provides generic CRUD endpoints useful for debugging internal collections.
 */

const express = require('express');
const { createController } = require('../controllers/generic.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();
const debugController = createController('debug');

// Public read endpoints
router.get('/', debugController.getAll);
router.get('/:id', debugController.getById);
router.get('/random', debugController.getRandom);
router.get('/latest', debugController.getLatest);
router.get('/trending', debugController.getTrending);

// Protected write endpoints
router.post('/', protect, debugController.create);
router.put('/:id', protect, debugController.replace);
router.patch('/:id', protect, debugController.update);
router.delete('/:id', protect, debugController.delete);

module.exports = router;
