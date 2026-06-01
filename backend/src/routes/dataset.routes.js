const express = require('express');
const { getDataset } = require('../controllers/dataset.controller');

const router = express.Router();

// GET /api/v1/dataset – returns the full dataset JSON
router.get('/', getDataset);

module.exports = router;
