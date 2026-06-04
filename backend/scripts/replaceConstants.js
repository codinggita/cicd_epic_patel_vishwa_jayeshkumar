const fs = require('fs');
const path = require('path');

const srcDir = path.resolve(__dirname, '..', 'src');

function processFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const newContent = content.replace(/require\("\.\.\/constants\/[^\"]+"\)/g, 'require("../config/constants")');
  if (newContent !== content) {
    fs.writeFileSync(filePath, newContent, 'utf8');
    console.log('Updated', filePath);
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile() && fullPath.endsWith('.js')) {
      processFile(fullPath);
    }
  }
}

walk(srcDir);
console.log('Replacement complete');
