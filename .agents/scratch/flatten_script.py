import os
from datetime import datetime

ROOT = '/Users/test/Projects/Unbox'
OUTPUT_FILE = os.path.join(ROOT, 'flatten.txt')

EXCLUDED_DIRS = {
    'node_modules', 'dist', 'build', 'target', 'bin', 'obj', 'out',
    'cache', 'broadcast', 'lib', '.git', '.next', '.cache', '.agents', '.gemini'
}

EXCLUDED_EXTENSIONS = {
    '.png', '.jpg', '.jpeg', '.gif', '.mp4', '.pdf', '.exe', '.dll',
    '.class', '.pyc', '.woff', '.woff2', '.ttf', '.eot', '.ico', '.svg',
    '.lock', '.log'
}

EXCLUDED_FILES = {
    'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'flatten.txt', '.DS_Store'
}

def get_files(directory):
    all_files = []
    for root, dirs, files in os.walk(directory):
        # Filter directories in-place to prevent os.walk from descending
        dirs[:] = [d for d in dirs if d not in EXCLUDED_DIRS and not d.startswith('.')]
        
        for file in files:
            if file.startswith('.') and file != '.env':
                continue
            if file in EXCLUDED_FILES:
                continue
            if os.path.splitext(file)[1].lower() in EXCLUDED_EXTENSIONS:
                continue
            
            all_files.append(os.path.join(root, file))
    return sorted(all_files)

def generate_tree(dir_path, prefix=''):
    tree = ""
    try:
        entries = sorted([e for e in os.listdir(dir_path) if not e.startswith('.') and e not in EXCLUDED_DIRS])
        for i, entry in enumerate(entries):
            full_path = os.path.join(dir_path, entry)
            is_last = i == len(entries) - 1
            connector = "└── " if is_last else "├── "
            tree += f"{prefix}{connector}{entry}\n"
            if os.path.isdir(full_path):
                new_prefix = prefix + ("    " if is_last else "│   ")
                tree += generate_tree(full_path, new_prefix)
    except Exception:
        pass
    return tree

all_source_files = get_files(ROOT)
timestamp = datetime.now().isoformat()
tree_str = generate_tree(ROOT)

header = f"""================================================================
FLATTENED CODEBASE: Unbox
TIMESTAMP: {timestamp}
================================================================

FILE TREE:
.
{tree_str}

"""

with open(OUTPUT_FILE, 'w', encoding='utf-8') as f_out:
    f_out.write(header)
    for file_path in all_source_files:
        rel_path = os.path.relpath(file_path, ROOT)
        try:
            with open(file_path, 'r', encoding='utf-8') as f_in:
                content = f_in.read()
                f_out.write("================================================================\n")
                f_out.write(f"FILE: {rel_path}\n")
                f_out.write("================================================================\n")
                f_out.write(content)
                f_out.write("\n\n")
        except Exception as e:
            f_out.write(f"ERROR READING FILE {rel_path}: {str(e)}\n\n")

print(f"Successfully created flatten.txt with {len(all_source_files)} files.")
