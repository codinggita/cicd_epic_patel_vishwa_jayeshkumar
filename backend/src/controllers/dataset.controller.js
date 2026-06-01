// src/controllers/dataset.controller.js
const dataService = require('../utils/dataService');
const HTTP_STATUS = require('../constants/httpStatus');

/**
 * GET / – returns the entire dataset JSON (all collections).
 */
function getDataset(req, res) {
  const raw = dataService.getRaw();
  return res.status(HTTP_STATUS.OK).json({ success: true, data: raw });
}

module.exports = { getDataset };
