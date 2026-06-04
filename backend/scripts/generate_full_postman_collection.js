const fs = require('fs');
const path = require('path');

const ROUTES_DIR = path.join(__dirname, '..', 'src', 'routes');
const OUTPUT_DIR = path.join(__dirname, '..', 'postman');

function getAllRouteFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(getAllRouteFiles(filePath));
    } else if (file.endsWith('.routes.js')) {
      results.push(filePath);
    }
  });
  return results;
}

function parseRoutes(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const lines = content.split(/\r?\n/);
  const routes = [];
  const routerName = path.basename(filePath).replace('.routes.js', '');
  lines.forEach(line => {
    line = line.trim();
    // Match patterns like router.get('/path', middleware?, handler)
    const match = line.match(/^router\.(get|post|put|patch|delete)\s*\(\s*(['"])([^'\"]+)\2\s*,\s*(.*)\);/);
    if (match) {
      const method = match[1].toUpperCase();
      const rawPath = match[3];
      const middlePart = match[4];
      const isProtected = /protect/.test(middlePart);
      routes.push({ method, rawPath, isProtected, filePath });
    }
  });
  return routes;
}

function convertPathToPostman(rawPath) {
  // Convert Express params like :id to {{id}}
  return rawPath.replace(/:([a-zA-Z0-9_]+)/g, '{{$1}}');
}

function generateCollection() {
  const collection = {
    info: {
      name: 'StackOrbit Full Collection',
      schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json'
    },
    item: []
  };

  const routeFiles = getAllRouteFiles(ROUTES_DIR);
  const folderMap = {};

  routeFiles.forEach(file => {
    const routes = parseRoutes(file);
    routes.forEach(route => {
      const folderName = path.basename(path.dirname(file)); // e.g., src/routes or subfolder
      const item = {
        name: `${route.method} ${route.rawPath}`,
        request: {
          method: route.method,
          header: [],
          url: {
            raw: `{{BASE_URL}}/api${route.rawPath.startsWith('/') ? '' : '/'}${route.rawPath}`,
            host: ['{{BASE_URL}}'],
            path: route.rawPath.split('/').filter(Boolean).map(p => p.startsWith(':') ? `{{${p.slice(1)}}}` : p)
          }
        }
      };
      // Add Authorization header if protected
      if (route.isProtected) {
        item.request.header.push({ key: 'Authorization', value: 'Bearer {{JWT_TOKEN}}' });
      }
      // Add placeholder body for methods that usually have payload
      if (['POST', 'PUT', 'PATCH'].includes(route.method)) {
        item.request.body = {
          mode: 'raw',
          raw: JSON.stringify({ sampleKey: 'sampleValue' }, null, 2)
        };
        item.request.header.push({ key: 'Content-Type', value: 'application/json' });
      }
      // Organize into folder based on file name (e.g., auth, workflow)
      const folderKey = path.basename(file).replace('.routes.js', '').replace('.js', '');
      if (!folderMap[folderKey]) {
        folderMap[folderKey] = { name: folderKey, item: [] };
      }
      folderMap[folderKey].item.push(item);
    });
  });

  // Add folders to collection
  collection.item = Object.values(folderMap);
  return collection;
}

function generateEnvironment() {
  return {
    id: 'stackorbit-env',
    name: 'StackOrbit Environment',
    values: [
      { key: 'BASE_URL', value: 'http://localhost:3000', enabled: true },
      { key: 'JWT_TOKEN', value: '', enabled: true }
    ],
    _postman_variable_scope: 'environment',
    _postman_exported_at: new Date().toISOString(),
    _postman_exported_using: 'Antigravity'
  };
}

if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

fs.writeFileSync(path.join(OUTPUT_DIR, 'StackOrbit_full.postman_collection.json'), JSON.stringify(generateCollection(), null, 2));
fs.writeFileSync(path.join(OUTPUT_DIR, 'StackOrbit_environment.json'), JSON.stringify(generateEnvironment(), null, 2));
console.log('Postman collection and environment generated.');
