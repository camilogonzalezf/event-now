# EventNow – Prueba Técnica Integral

## 🎯 Descripción

EventNow es un portal web que permite a sus usuarios **buscar eventos**, **reservar entradas** y **gestionar sus reservas**. Implementa:

- **Frontend** en React 18 + TypeScript + Ant Design, sólo captura datos y ofrece validaciones y feedback.
- **Backend** en Flask 3 + Jinja2 + Pydantic, expone la API REST y renderiza la vista de reservas con plantillas seguras.
- **Almacenamiento temporal** en JSON.
- **Despliegue unificado**: un único script Bash instala dependencias, compila React, copia los assets y arranca Flask.

## 📂 Estructura del proyecto

event-now/
├── backend/
│ ├── app.py
│ ├── config.py
│ ├── events.json
│ ├── reservations.json
│ ├── requirements.txt
│ ├── static/
│ │ ├── js/ ← bundles React (JS + index.html)
│ │ └── css/ ← bundles React (CSS)
│ │ └── images/ ← Images React
│ └── scripts/
│ └── start.sh ← instala deps, compila y arranca Flask
└── frontend/
├── package.json
├── tsconfig.json
├── public/
└── src/
├── services/ ← llamadas API y manejo de errores
├── hooks/ ← lógica de negocio (useManageEvents)
├── components/
│ ├── Filter.tsx
│ └── ReservationForm.tsx
├── App.tsx
└── index.tsx

## 🛠️ Instalación y ejecución

### 1. Clonar repositorio

git clone <repo-url> event-now
cd event-now

### 2. Modo “producción” integrado

cd backend
chmod +x scripts/start.sh
./scripts/start.sh

Esto:

Crea/activa el virtualenv de Python e instala requirements.txt.

Instala dependencias de Node, compila React y genera build/.

Copia build/static/js, build/static/css e index.html a backend/static/{js,css}.

Arranca Flask en http://127.0.0.1:5000.

### 3. Desarrollo separado

#### Frontend (Hot-Reload)

cd frontend
npm install
npm start

Servidor CRA en http://localhost:3000 con HMR.

#### Backend (Auto-Reload)

cd backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
export FLASK_ENV=development
flask run --reload

Flask en http://127.0.0.1:5000, recarga al cambiar código Python o plantillas Jinja.

## ⚙️ Configuración

#### Crear .env dentro de /backend.

EVENTS_PATH=events.json
JSON_PATH=reservations.json

## 📋 Instrucciones de uso

### Buscar eventos

Utiliza el componente Filter para filtrar por texto, ciudad o fecha.

### Reservar entradas

Completa el formulario ReservationForm.
Recibirás mensajes de éxito o error (AntD message).

### Ver reservas

Navega a http://127.0.0.1:5000/reservations para ver la tabla renderizada con Jinja2.

### ✅ Cumplimiento de la prueba

- Requisito Estado
- Formulario en React con validaciones
- API REST en Flask para recibir reservas
- Vista Jinja2 de reservas ordenadas
- Almacenamiento temporal en JSON
- Escape automático en Jinja2 para prevenir XSS
- React sólo captura datos; Flask sólo sirve estáticos y plantillas
- Entornos independientes (venv + pip vs node_modules + npm)
- Script Bash único que instala, compila, copia y arranca

## 📖 Decisiones técnicas

- React 18 + TypeScript + Ant Design: validaciones declarativas, componentes estilizados y tipado estático.

- Flask 3 + Jinja2 + Pydantic: API robusta, validación de payloads y plantillas seguras.

- JSON para almacenamiento temporal: cumple especificación sin base de datos.

- Script Bash (start.sh) unifica instalación y despliegue con un solo comando, facilitando al evaluador.

- Proxy en desarrollo y CORS whitelist permiten comunicación fluida entre frontend y backend en local.
