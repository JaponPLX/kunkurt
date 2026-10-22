#!/usr/bin/env bash

# Ubicarse automáticamente en la carpeta del proyecto
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" || exit 1

export PYTHONUNBUFFERED=1

# Cerrar cualquier instancia previa que haya quedado abierta en segundo plano
pkill -f "python.*server.py" 2>/dev/null || true
sleep 0.5

echo "========================================================"
echo "⚡ Iniciando Plataforma Kunkurt Devs & JaponPLX..."
echo "========================================================"

if ! command -v python3 &> /dev/null; then
    echo "❌ Error: Python 3 no está instalado o no se encuentra en el PATH."
    exit 1
fi

python3 server.py
