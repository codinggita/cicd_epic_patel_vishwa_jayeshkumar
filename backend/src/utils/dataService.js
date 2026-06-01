// src/utils/dataService.js
/**
 * Simple data service that loads the dataset JSON file into memory.
 * The dataset is expected to be a JSON object with top‑level collections such as
 * workflows, infra, search, yaml, analytics, debug, admin, monitoring,
 * notifications and system.
 */
const fs = require('fs');
const path = require('path');

// Resolve the dataset file path (project root --> backend/data/dataset.json)
const DATA_FILE = path.resolve(__dirname, '../../data/dataset.json');
let dataset = {};

function loadDataset() {
  try {
    const raw = fs.readFileSync(DATA_FILE, 'utf8');
    dataset = JSON.parse(raw);
    console.log('🚀 Dataset loaded with collections:', Object.keys(dataset));
  } catch (err) {
    console.warn('⚠️ Could not load dataset.json. Using empty dataset.', err.message);
    dataset = {};
  }
}

// Load once at startup
loadDataset();

module.exports = {
  /** Return the entire collection array (or empty array) */
  getCollection: (name) => {
    return Array.isArray(dataset[name]) ? dataset[name] : [];
  },
  /** Return a single item by id (assumes each item has an `id` field) */
  getById: (name, id) => {
    const coll = module.exports.getCollection(name);
    return coll.find((item) => String(item.id) === String(id));
  },
  /** Return the raw dataset (useful for debugging) */
  getRaw: () => dataset,
};
