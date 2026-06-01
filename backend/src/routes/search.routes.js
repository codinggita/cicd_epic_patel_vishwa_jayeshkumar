// src/routes/search.routes.js
const express = require('express');
const { createController } = require('../controllers/generic.controller');
const { protect } = require('../middlewares/auth.middleware');

const router = express.Router();
const searchController = createController('search');

// Public GET endpoints
router.get('/', searchController.getAll);
router.get('/random', searchController.getRandom);
router.get('/latest', searchController.getLatest);
router.get('/trending', searchController.getTrending);
router.get('/:id', searchController.getById);

// Protected write endpoints
router.post('/', protect, searchController.create);
router.put('/:id', protect, searchController.update);
router.delete('/:id', protect, searchController.delete);

module.exports = router;
