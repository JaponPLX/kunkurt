#!/usr/bin/env bash

# Ubicarse automáticamente y de forma 100% portable en la carpeta del proyecto
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" || exit 1

export PYTHONUNBUFFERED=1

# Permitir configurar puerto por argumento (./start.sh 3000) o variable de entorno PORT
export PORT="${PORT:-${1:-8080}}"
export HOST="${HOST:-0.0.0.0}"

# Cerrar cualquier instancia previa que haya quedado abierta en segundo plano
pkill -f "python.*server.py" 2>/dev/null || true
sleep 0.5

echo "========================================================"
echo "⚡ Iniciando Plataforma Kunkurt Devs & JaponPLX..."
echo "Configuración: Host ${HOST} | Puerto Inicial ${PORT}"
echo "========================================================"

if ! command -v python3 &> /dev/null; then
    echo "❌ Error: Python 3 no está instalado o no se encuentra en el PATH."
    exit 1
fi

python3 server.py "$PORT"
