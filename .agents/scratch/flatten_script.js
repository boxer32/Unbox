const fs = require('fs');
const path = require('path');

const ROOT = '/Users/test/Projects/Unbox';
const OUTPUT_FILE = path.join(ROOT, 'flatten.txt');

const EXCLUDED_DIRS = [
  'node_modules', 'dist', 'build', 'target', 'bin', 'obj', 'out',
  'cache', 'broadcast', 'lib', '.git', '.next', '.cache', '.agents', '.gemini'
];

const EXCLUDED_EXTENSIONS = [
  '.png', '.jpg', '.jpeg', '.gif', '.mp4', '.pdf', '.exe', '.dll',
  '.class', '.pyc', '.woff', '.woff2', '.ttf', '.eot', '.ico', '.svg',
  '.lock', '.log'
];

const EXCLUDED_FILES = [
  'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'flatten.txt', '.DS_Store'
];

function getFiles(dir, allFiles = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    const relativePath = path.relative(ROOT, filePath);

    if (file.startsWith('.') && file !== '.env') {
        // Skip hidden unless it's .env if we want it (usually not for flattening, but follow rules)
        // Rule says All hidden directories and files (anything starting with a dot)
        continue;
    }

    if (EXCLUDED_DIRS.includes(file)) continue;
    if (EXCLUDED_FILES.includes(file)) continue;
    if (EXCLUDED_EXTENSIONS.includes(path.extname(file))) continue;

    if (fs.statSync(filePath).isDirectory()) {
      getFiles(filePath, allFiles);
    } else {
      allFiles.push(filePath);
    }
  }
  return allFiles;
}

function generateTree(dir, prefix = '') {
    let tree = '';
    const files = fs.readdirSync(dir).filter(f => {
        if (f.startsWith('.')) return false;
        if (EXCLUDED_DIRS.includes(f)) return false;
        return true;
    });

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = path.join(dir, file);
        const isLast = i === files.length - 1;
        const line = prefix + (isLast ? '└── ' : '├── ') + file + '\n';
        tree += line;

        if (fs.statSync(filePath).isDirectory()) {
            tree += generateTree(filePath, prefix + (isLast ? '    ' : '│   '));
        }
    }
    return tree;
}

const allSourceFiles = getFiles(ROOT);
const timestamp = new Date().toISOString();
const tree = generateTree(ROOT);

let output = `================================================================
FLATTENED CODEBASE: Unbox
TIMESTAMP: ${timestamp}
================================================================

FILE TREE:
.
${tree}

`;

for (const file of allSourceFiles) {
  const relativePath = path.relative(ROOT, file);
  const content = fs.readFileSync(file, 'utf8');
  output += `================================================================
FILE: ${relativePath}
================================================================
${content}

`;
}

fs.writeFileSync(OUTPUT_FILE, output);
console.log(`Successfully created flatten.txt with ${allSourceFiles.length} files.`);
