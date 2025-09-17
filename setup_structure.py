import os
import subprocess

# Create directory structure
dirs_to_create = [
    'backend/models',
    'backend/schemas',
    'backend/routers',
    'backend/crud',
    'backend/utils',
    'backend/migrations/versions',
    'frontend/public',
    'frontend/src/components/common',
    'frontend/src/components/theme',
    'frontend/src/components',
    'frontend/src/pages',
    'frontend/src/services',
    'frontend/src/hooks',
    'frontend/src/types',
    'frontend/src'
]

# Create directories
for dir_path in dirs_to_create:
    os.makedirs(dir_path, exist_ok=True)

# Create empty files (touch equivalent)
files_to_touch = [
    # Root
    'README.md',
    '.env',
    # Backend
    'backend/main.py',
    'backend/database.py',
    'backend/models/__init__.py',
    'backend/models/user.py',
    'backend/models/location.py',
    'backend/schemas/__init__.py',
    'backend/schemas/user.py',
    'backend/schemas/weather.py',
    'backend/routers/__init__.py',
    'backend/routers/auth.py',
    'backend/routers/weather.py',
    'backend/routers/user.py',
    'backend/crud/__init__.py',
    'backend/crud/user.py',
    'backend/crud/location.py',
    'backend/utils/__init__.py',
    'backend/utils/security.py',
    'backend/utils/email.py',
    'backend/migrations/env.py',
    'backend/alembic.ini',
    # Frontend
    'frontend/public/index.html',
    'frontend/public/favicon.ico',
    'frontend/src/index.tsx',
    'frontend/src/App.tsx',
    'frontend/src/index.css',
    'frontend/src/components/WeatherCard.tsx',
    'frontend/src/components/theme/ThemeToggle.tsx',
    'frontend/src/components/theme/ThemeProvider.tsx',
    'frontend/src/components/common/Button.tsx',
    'frontend/src/components/common/Input.tsx',
    'frontend/src/pages/Home.tsx',
    'frontend/src/pages/Login.tsx',
    'frontend/src/pages/Register.tsx',
    'frontend/src/pages/Dashboard.tsx',
    'frontend/src/services/api.ts',
    'frontend/src/services/auth.ts',
    'frontend/src/hooks/useAuth.ts',
    'frontend/src/types/index.ts',
    'frontend/tailwind.config.js',
    'frontend/postcss.config.js',
    'frontend/tsconfig.json',
    'frontend/package.json',
    # Root extra
    'docker-compose.yml'
]

for file_path in files_to_touch:
    with open(file_path, 'w') as f:
        f.write('')  # Empty file

# Init Git
subprocess.run(['git', 'init'], check=True)

# Create .gitignore
gitignore_content = """# Byte-compiled / optimized / DLL files
__pycache__/
*.py[cod]
*$py.class

# C extensions
*.so

# Distribution / packaging
.Python
build/
develop-eggs/
dist/
downloads/
eggs/
.eggs/
lib/
lib64/
parts/
sdist/
var/
wheels/
*.egg-info/
.installed.cfg
*.egg

# PyInstaller
#  Usually these files are written by a python script from a template
#  before PyInstaller builds the exe, so as to inject date/other infos into it.
*.manifest
*.spec

# Installer logs
pip-log.txt
pip-delete-this-directory.txt

# Unit test / coverage reports
htmlcov/
.tox/
.coverage
.coverage.*
.cache
nosetests.xml
coverage.xml
*.cover
.hypothesis/
.pytest_cache/

# Translations
*.mo
*.pot

# Django stuff:
*.log
local_settings.py
db.sqlite3

# Flask stuff:
instance/
.webassets-cache

# Scrapy stuff:
.scrapy

# Sphinx documentation
docs/_build/

# PyBuilder
target/

# Jupyter Notebook
.ipynb_checkpoints

# pyenv
.python-version

# celery beat schedule file
celerybeat-schedule

# SageMath parsed files
*.sage.py

# dotenv
.env
.venv
env/
venv/
ENV/
env.bak/
venv.bak/

# Spyder project settings
.spyderproject
.spyproject

# Rope project settings
.ropeproject

# mkdocs documentation
/site

# mypy
.mypy_cache/

# IDE
.vscode/
.idea/
*.swp
*.swo

# OS generated files
.DS_Store
.DS_Store?
._*
.Spotlight-V100
.Trashes
ehthumbs.db
Thumbs.db

# Node
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnp
.pnp.js

# Frontend build
build/
dist/

# Database
*.db
*.sqlite
*.sqlite3

# Alembic migrations
migrations/versions/

# Temporary files
*.tmp
*.temp

# Logs
*.log
logs/

# Docker
.dockerignore
"""
with open('.gitignore', 'w') as f:
    f.write(gitignore_content)

# Initial commit
subprocess.run(['git', 'add', '.gitignore'], check=True)
subprocess.run(['git', 'commit', '-m', 'Initial commit with project structure'], check=True)

print("Project structure created, Git initialized, and initial commit done!")