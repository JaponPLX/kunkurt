#!/usr/bin/env bash

# Ubicarse de forma 100% dinámica en la carpeta donde reside este script
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" || exit 1

# Leer puerto activo dinámicamente si existe o tomar variable de entorno
PORT="${PORT:-8080}"
if [ -f "$SCRIPT_DIR/.active_port" ]; then
    SAVED_PORT=$(cat "$SCRIPT_DIR/.active_port" 2>/dev/null | tr -d '[:space:]')
    if [ -n "$SAVED_PORT" ]; then
        PORT="$SAVED_PORT"
    fi
fi

# Si el servidor no está corriendo, iniciarlo en segundo plano
if ! pgrep -f "server.py" > /dev/null 2>&1; then
    echo "⚡ Iniciando servidor local en segundo plano..."
    if [ -x "$SCRIPT_DIR/start.sh" ]; then
        "$SCRIPT_DIR/start.sh" &
        sleep 1.2
    else
        python3 "$SCRIPT_DIR/server.py" &
        sleep 1.2
    fi

    if [ -f "$SCRIPT_DIR/.active_port" ]; then
        PORT=$(cat "$SCRIPT_DIR/.active_port" 2>/dev/null | tr -d '[:space:]')
    fi
fi

TARGET_URL="http://localhost:${PORT}"

# Abrir el navegador con la herramienta disponible en el sistema
if command -v xdg-open > /dev/null 2>&1; then
    xdg-open "$TARGET_URL" 2>/dev/null || xdg-open "$SCRIPT_DIR/static/index.html"
elif command -v sensible-browser > /dev/null 2>&1; then
    sensible-browser "$TARGET_URL" 2>/dev/null || sensible-browser "$SCRIPT_DIR/static/index.html"
else
    python3 -m webbrowser "$TARGET_URL" 2>/dev/null || python3 -m webbrowser "file://$SCRIPT_DIR/static/index.html"
fi
