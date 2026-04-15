import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const outputFile = 'flatten.txt';
const outputPath = path.join(rootDir, outputFile);

const excludedDirs = new Set(['node_modules', 'vendor', 'venv', 'env', 'dist', 'build', 'target', 'bin', 'obj', 'out']);
const excludedFiles = new Set(['package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', outputFile]);
const excludedExtensions = new Set(['.png', '.jpg', '.jpeg', '.gif', '.mp4', '.pdf', '.exe', '.dll', '.class', '.pyc', '.woff', '.woff2', '.ttf', '.eot', '.ico', '.zip', '.tar', '.gz']);

function isTextFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    if (excludedExtensions.has(ext)) return false;
    // Basic text file check - can be expanded
    return true;
}

function getFiles(dir, allFiles = []) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const filePath = path.join(dir, file);
        const relativePath = path.relative(rootDir, filePath);
        
        // Exclude hidden files and directories
        if (file.startsWith('.') && file !== '.') continue;
        
        const stats = fs.statSync(filePath);
        if (stats.isDirectory()) {
            if (excludedDirs.has(file)) continue;
            getFiles(filePath, allFiles);
        } else {
            if (excludedFiles.has(file)) continue;
            if (isTextFile(filePath)) {
                allFiles.push(relativePath);
            }
        }
    }
    return allFiles;
}

console.log('Analyzing space...');
const filesToInclude = getFiles(rootDir);
filesToInclude.sort();

console.log('Generating file tree...');
function generateTree(files) {
    let tree = '';
    const structure = {};
    files.forEach(file => {
        const parts = file.split(path.sep);
        let curr = structure;
        parts.forEach(part => {
            if (!curr[part]) curr[part] = {};
            curr = curr[part];
        });
    });

    function printTree(obj, prefix = '') {
        const keys = Object.keys(obj).sort();
        keys.forEach((key, index) => {
            const isLast = index === keys.length - 1;
            const connector = isLast ? '└── ' : '├── ';
            tree += `${prefix}${connector}${key}\n`;
            const newPrefix = prefix + (isLast ? '    ' : '│   ');
            printTree(obj[key], newPrefix);
        });
    }

    printTree(structure);
    return tree;
}

const fileTree = generateTree(filesToInclude);
const timestamp = new Date().toISOString();

let outputContent = `================================================================
UNBOX PROJECT CODEBASE FLATTEN
Timestamp: ${timestamp}
================================================================

FILE TREE:
${fileTree}

`;

console.log('Compiling codebase...');
filesToInclude.forEach(file => {
    const fullPath = path.join(rootDir, file);
    try {
        const content = fs.readFileSync(fullPath, 'utf8');
        outputContent += `================================================================
FILE: ${file}
================================================================
${content}

`;
    } catch (err) {
        console.error(`Error reading file ${file}: ${err.message}`);
    }
});

fs.writeFileSync(outputPath, outputContent);
console.log(`flatten.txt created successfully with ${filesToInclude.length} files.`);
