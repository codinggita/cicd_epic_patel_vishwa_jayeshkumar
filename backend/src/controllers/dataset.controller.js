const path = require('path');
const fs = require('fs').promises;
const { sendResponse } = require('../utils/apiResponse');
const HTTP_STATUS = require('../constants/httpStatus');

/**
 * GET /api/v1/dataset
 * Returns the full contents of dataset.json located at the project root.
 */
const getDataset = async (req, res) => {
  try {
    // __dirname = <project>/backend/src/controllers
    // Navigate up three levels to reach the project root where dataset.json resides.
    const datasetPath = path.resolve(__dirname, '../../../', 'dataset.json');
    const data = await fs.readFile(datasetPath, 'utf-8');
    const json = JSON.parse(data);
    sendResponse(res, HTTP_STATUS.OK, 'Dataset retrieved', json);
  } catch (err) {
    console.error('Failed to load dataset:', err);
    sendResponse(res, HTTP_STATUS.INTERNAL_SERVER_ERROR, 'Failed to load dataset');
  }
};

module.exports = { getDataset };
