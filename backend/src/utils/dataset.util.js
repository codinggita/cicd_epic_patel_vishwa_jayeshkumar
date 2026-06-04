const fs = require('fs');
const path = require('path');

// Path to dataset.json at the project root
const datasetPath = path.resolve(__dirname, '../../dataset.json');

let cachedData = null;

function loadDataset() {
  if (cachedData) return cachedData;
  if (!fs.existsSync(datasetPath)) {
    console.warn('Dataset file not found at', datasetPath);
    cachedData = [];
    return cachedData;
  }
  try {
    const raw = fs.readFileSync(datasetPath, 'utf-8');
    cachedData = JSON.parse(raw);
  } catch (err) {
    console.error('Failed to parse dataset.json:', err);
    cachedData = [];
  }
  return cachedData;
}

module.exports = { loadDataset };
