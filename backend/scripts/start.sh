#!/usr/bin/env bash
set -e

# Detectar raíz del proyecto
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
ROOT="$(cd "$SCRIPT_DIR/../.." && pwd)"

# 1) Backend: entorno y deps
cd "$ROOT/backend"
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt

# 2) Frontend: deps y build
cd "$ROOT/frontend"
npm install
npm run build

# 3) Integrar build correctamente
mkdir -p "$ROOT/backend/static/js"
mkdir -p "$ROOT/backend/static/css"
mkdir -p "$ROOT/backend/static/images"
rm -rf "$ROOT/backend/static/js/"*
rm -rf "$ROOT/backend/static/images/"*
rm -rf "$ROOT/backend/static/css/"*
cp -R "$ROOT/frontend/build/static/js/"*  "$ROOT/backend/static/js/"
cp -R "$ROOT/frontend/build/static/css/"* "$ROOT/backend/static/css/"
cp -R "$ROOT/frontend/build/images/"*     "$ROOT/backend/static/images/"
cp    "$ROOT/frontend/build/index.html"   "$ROOT/backend/static/index.html"
cp    "$ROOT/frontend/build/favicon.ico"  "$ROOT/backend/static/favicon.ico"

# 4) Levantar Flask
cd "$ROOT/backend"
export FLASK_APP=app.py
export FLASK_ENV=development
flask run --host=0.0.0.0 --port=5000


