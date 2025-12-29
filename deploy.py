import os
import zipfile

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
BACKEND_DIR = os.path.join(BASE_DIR, "backend")
OUTPUT_ZIP = os.path.join(BASE_DIR, "backend-deploy.zip")

# Directories to skip entirely
EXCLUDE_DIRS = {"node_modules", ".git", "__pycache__"}


def create_zip():
    if not os.path.isdir(BACKEND_DIR):
        raise RuntimeError(f"Backend directory not found: {BACKEND_DIR}")

    with zipfile.ZipFile(OUTPUT_ZIP, "w", zipfile.ZIP_DEFLATED) as z:
        # Add backend contents at the zip root
        for root, dirs, files in os.walk(BACKEND_DIR):
            dirs[:] = [d for d in dirs if d not in EXCLUDE_DIRS]
            for file in files:
                full_path = os.path.join(root, file)
                arcname = os.path.relpath(full_path, BACKEND_DIR) # .replace("\\", "/")
                z.write(full_path, arcname)

    print("ZIP created")
    print(f"Path: {OUTPUT_ZIP}")


if __name__ == "__main__":
    create_zip()
