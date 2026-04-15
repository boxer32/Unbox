import os
import datetime

# Configuration
WORKSPACE_ROOT = '/Users/test/Projects/Unbox'
OUTPUT_FILE = os.path.join(WORKSPACE_ROOT, 'flatten.txt')

EXCLUDE_DIRS = {
    'node_modules', 'dist', 'build', 'target', 'bin', 'obj', 'out', 'cache',
    'vendor', 'venv', 'env', '.git', '.next', '.cache', '.agents', '.gemini',
    'lib', 'broadcast' # foundry broadcast
}

EXCLUDE_FILES = {
    'package-lock.json', 'yarn.lock', 'pnpm-lock.yaml', 'flatten.txt', '.DS_Store'
}

EXCLUDE_EXTENSIONS = {
    '.png', '.jpg', '.jpeg', '.mp4', '.pdf', '.exe', '.dll', '.class', 
    '.pyc', '.woff', '.woff2', '.ico', '.log', '.zip', '.gz', '.tar'
}

def should_exclude(path, is_dir=False):
    dirname = os.path.basename(path)
    if dirname.startswith('.') and dirname != '.':
        return True
    
    if is_dir:
        return dirname in EXCLUDE_DIRS
    
    # File checks
    ext = os.path.splitext(dirname)[1].lower()
    if ext in EXCLUDE_EXTENSIONS:
        return True
    if dirname in EXCLUDE_FILES:
        return True
    
    return False

def get_file_tree(startpath):
    tree = []
    for root, dirs, files in os.walk(startpath):
        # In-place modify dirs to skip excluded ones
        dirs[:] = [d for d in dirs if not should_exclude(os.path.join(root, d), is_dir=True)]
        
        level = root.replace(startpath, '').count(os.sep)
        indent = ' ' * 4 * (level)
        tree.append(f'{indent}{os.path.basename(root)}/')
        subindent = ' ' * 4 * (level + 1)
        for f in files:
            if not should_exclude(os.path.join(root, f)):
                tree.append(f'{subindent}{f}')
    return "\n".join(tree)

def main():
    print(f"Starting flattening at {WORKSPACE_ROOT}")
    
    all_files = []
    for root, dirs, files in os.walk(WORKSPACE_ROOT):
        # Prune dirs
        dirs[:] = [d for d in dirs if not should_exclude(os.path.join(root, d), is_dir=True)]
        
        for f in files:
            full_path = os.path.join(root, f)
            if not should_exclude(full_path):
                all_files.append(full_path)
    
    all_files.sort()
    
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f_out:
        # Header
        f_out.write(f"UNBOX CODEBASE FLATTENED\n")
        f_out.write(f"TIMESTAMP: {datetime.datetime.now().isoformat()}\n")
        f_out.write(f"WORKSPACE: {WORKSPACE_ROOT}\n")
        f_out.write(f"\n================================================================\n")
        f_out.write(f"FILE TREE\n")
        f_out.write(f"================================================================\n")
        f_out.write(get_file_tree(WORKSPACE_ROOT))
        f_out.write(f"\n\n")
        
        # Files content
        file_count = 0
        for file_path in all_files:
            rel_path = os.path.relpath(file_path, WORKSPACE_ROOT)
            try:
                with open(file_path, 'r', encoding='utf-8', errors='ignore') as f_in:
                    content = f_in.read()
                    
                f_out.write(f"================================================================\n")
                f_out.write(f"FILE: {rel_path}\n")
                f_out.write(f"================================================================\n")
                f_out.write(content)
                f_out.write(f"\n\n")
                file_count += 1
            except Exception as e:
                print(f"Skipping {rel_path} due to error: {e}")
                
    print(f"Done! Included {file_count} files.")
    size_kb = os.path.getsize(OUTPUT_FILE) / 1024
    print(f"Final size: {size_kb:.2f} KB")

if __name__ == "__main__":
    main()
