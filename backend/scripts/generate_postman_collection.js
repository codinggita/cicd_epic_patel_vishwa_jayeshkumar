// generate_postman_collection.js
// This script scans the Express backend routes and generates a Postman collection (v2.1) and environment.
// It is intended to be run with `node scripts/generate_postman_collection.js`.

const fs = require('fs');
const path = require('path');

const backendRoot = path.resolve(__dirname, '..'); // points to backend directory
const srcDir = path.join(backendRoot, 'src');
const routesDir = path.join(srcDir, 'routes');
const postmanDir = path.join(backendRoot, 'postman');

if (!fs.existsSync(postmanDir)) {
  fs.mkdirSync(postmanDir);
}

// Helper to read file content
function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

// Parse index.routes.js to map base paths to router files
function getBasePathMap() {
  const indexPath = path.join(routesDir, 'index.routes.js');
  const content = readFile(indexPath);
  const map = {};
  const regex = /router\.use\(['"]([^'\"]+)['"],\s*require\(['"](\.\/[^'\"]+)['"]\)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const basePath = match[1]; // e.g., /auth
    const routerFile = path.join(routesDir, match[2] + '.js'); // ./auth.routes
    map[basePath] = routerFile;
  }
  return map;
}

// Parse a router file for endpoint definitions
function parseRouterFile(filePath) {
  const content = readFile(filePath);
  const lines = content.split(/\r?\n/);
  const endpoints = [];
  const methodRegex = /router\.(get|post|put|delete|patch)\s*\(\s*['"]([^'\"]+)['"]\s*,\s*([^\)]*)\)/i;
  for (const line of lines) {
    const m = methodRegex.exec(line);
    if (m) {
      const method = m[1].toUpperCase();
      const subPath = m[2];
      const middlewaresAndHandler = m[3];
      const isProtected = /authMiddleware|protect/.test(middlewaresAndHandler);
      endpoints.push({ method, subPath, protected: isProtected });
    }
  }
  return endpoints;
}

function generateCollection() {
  const basePathMap = getBasePathMap();
  const collection = {
    info: {
      name: 'StackOrbit Generated Collection',
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
    },
    item: [],
  };

  const folderMap = {};

  // Create a login request (assumed path /api/auth/login as per user clarification)
  const loginRequest = {
    name: 'Login',
    request: {
      method: 'POST',
      header: [{ key: 'Content-Type', value: 'application/json' }],
      url: {
        raw: '{{BASE_URL}}/api/auth/login',
        host: ['{{BASE_URL}}'],
        path: ['api', 'auth', 'login'],
      },
      body: {
        mode: 'raw',
        raw: JSON.stringify({ email: 'user@example.com', password: 'password' }, null, 2),
      },
    },
    event: [
      {
        listen: 'test',
        script: {
          exec: [
            'var json = pm.response.json();',
            'if (json.token) {',
            '  pm.environment.set("JWT_TOKEN", json.token);',
            '} else if (json.accessToken) {',
            '  pm.environment.set("JWT_TOKEN", json.accessToken);',
            '}'],
        },
      },
    ],
  };

  // Add login request to Auth folder
  const authFolder = { name: 'Auth', item: [loginRequest] };
  collection.item.push(authFolder);
  folderMap['auth'] = authFolder;

  // Process each router
  for (const [basePath, routerFile] of Object.entries(basePathMap)) {
    const endpoints = parseRouterFile(routerFile);
    if (endpoints.length === 0) continue;
    // Determine folder name (capitalize first segment without leading slash)
    const folderName = basePath.replace(/^\//, '').split('/')[0];
    const folder = { name: folderName.charAt(0).toUpperCase() + folderName.slice(1), item: [] };
    collection.item.push(folder);
    folderMap[folderName] = folder;

    for (const ep of endpoints) {
      const fullPath = `${basePath}${ep.subPath.startsWith('/') ? '' : '/'}${ep.subPath}`;
      const urlParts = fullPath.split('/').filter(Boolean);
      const request = {
        name: `${ep.method} ${fullPath}`,
        request: {
          method: ep.method,
          header: [],
          url: {
            raw: `{{BASE_URL}}${fullPath}`,
            host: ['{{BASE_URL}}'],
            path: urlParts,
          },
        },
      };
      // Add auth header if protected
      if (ep.protected) {
        request.request.header.push({ key: 'Authorization', value: 'Bearer {{JWT_TOKEN}}' });
      }
      // Add placeholder body for POST/PUT/PATCH
      if (['POST', 'PUT', 'PATCH'].includes(ep.method)) {
        request.request.header.push({ key: 'Content-Type', value: 'application/json' });
        request.request.body = {
          mode: 'raw',
          raw: JSON.stringify({ sampleKey: 'sampleValue' }, null, 2),
        };
      }
      folder.item.push(request);
    }
  }

  // Write collection JSON
  const collectionPath = path.join(postmanDir, 'StackOrbit_generated.postman_collection.json');
  fs.writeFileSync(collectionPath, JSON.stringify(collection, null, 2));
  console.log('Postman collection generated at', collectionPath);

  // Generate environment JSON
  const environment = {
    id: 'stackorbit-env',
    name: 'StackOrbit Environment',
    values: [
      { key: 'BASE_URL', value: 'http://localhost:3000', enabled: true },
      { key: 'JWT_TOKEN', value: '', enabled: true },
    ],
    _postman_variable_scope: 'environment',
    _postman_exported_at: new Date().toISOString(),
    _postman_exported_using: 'Antigravity',
  };
  const envPath = path.join(postmanDir, 'StackOrbit_generated.postman_environment.json');
  fs.writeFileSync(envPath, JSON.stringify(environment, null, 2));
  console.log('Postman environment generated at', envPath);
}

generateCollection();
