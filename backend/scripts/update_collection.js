// update_collection.js
// This script loads the generated Postman collection and environment,
// adds an `x-api-key` header (using {{API_KEY}}) to all protected routes,
// and adds extra environment variables USER_ID, PROJECT_ID, DATASET_ID.

const fs = require('fs');
const path = require('path');

const collectionPath = path.join(__dirname, '..', 'postman', 'StackOrbit_full.postman_collection.json');
const envPath = path.join(__dirname, '..', 'postman', 'StackOrbit_environment.json');

let collection = JSON.parse(fs.readFileSync(collectionPath, 'utf8'));
let env = JSON.parse(fs.readFileSync(envPath, 'utf8'));

// Add extra env variables if not present
const extraVars = [
  { key: 'USER_ID', value: '', enabled: true },
  { key: 'PROJECT_ID', value: '', enabled: true },
  { key: 'DATASET_ID', value: '', enabled: true },
  { key: 'API_KEY', value: '', enabled: true },
];
extraVars.forEach(v => {
  if (!env.values.find(e => e.key === v.key)) {
    env.values.push(v);
  }
});

// Recursive function to walk collection items
function addApiKeyHeader(items) {
  items.forEach(item => {
    if (item.request) {
      // If the request already has Authorization header, add x-api-key
      const hasAuth = item.request.header && item.request.header.some(h => h.key.toLowerCase() === 'authorization');
      if (hasAuth) {
        if (!item.request.header.find(h => h.key.toLowerCase() === 'x-api-key')) {
          item.request.header.push({ key: 'x-api-key', value: '{{API_KEY}}' });
        }
      }
    }
    if (item.item) {
      addApiKeyHeader(item.item);
    }
  });
}

addApiKeyHeader(collection.item);

fs.writeFileSync(collectionPath, JSON.stringify(collection, null, 2));
fs.writeFileSync(envPath, JSON.stringify(env, null, 2));
console.log('Collection and environment updated with API_KEY header and extra variables.');
