#!/usr/bin/env bash

# Ubicarse de forma 100% portable en la carpeta del proyecto
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$SCRIPT_DIR" || exit 1

# Leer dinámicamente el puerto activo o variable PORT
PORT="${PORT:-8080}"
if [ -f "$SCRIPT_DIR/.active_port" ]; then
    SAVED_PORT=$(cat "$SCRIPT_DIR/.active_port" 2>/dev/null | tr -d '[:space:]')
    if [ -n "$SAVED_PORT" ]; then
        PORT="$SAVED_PORT"
    fi
fi

# Generar llave SSH local si no existe (soluciona el error 'permission denied')
KEY_FILE="$SCRIPT_DIR/.kunkurt_key"
if [ ! -f "$KEY_FILE" ]; then
    ssh-keygen -t ed25519 -N "" -f "$KEY_FILE" -C "kunkurt-tunnel" > /dev/null 2>&1
    chmod 600 "$KEY_FILE"
fi

# Verificar si el servidor local está prendido
if ! curl -s "http://localhost:$PORT" > /dev/null 2>&1; then
    echo "⚡ Iniciando servidor Kunkurt en segundo plano..."
    python3 "$SCRIPT_DIR/server.py" "$PORT" &
    sleep 1.5
    if [ -f "$SCRIPT_DIR/.active_port" ]; then
        PORT=$(cat "$SCRIPT_DIR/.active_port" 2>/dev/null | tr -d '[:space:]')
    fi
fi

clear
echo "=================================================================="
echo "🌐 KUNKURT DEVS - GENERADOR DE ENLACE PÚBLICO MUNDIAL"
echo "=================================================================="
echo "Servidor Kunkurt activo en el puerto: $PORT"
echo ""
echo "Elige qué servicio de túnel gratuito deseas usar:"
echo "1) Pinggy (Recomendado: Rápido, enlace HTTPS instantáneo sin errores)"
echo "2) Localhost.run (Con tu llave SSH configurada)"
echo "3) Serveo"
echo ""
read -t 10 -p "Selecciona una opción [1-3] (Por defecto 1 en 10 seg): " opcion
opcion=${opcion:-1}

echo ""
echo "🚀 Conectando y generando enlace seguro HTTPS..."
echo "Espera unos segundos. Tu enlace público aparecerá a continuación:"
echo "------------------------------------------------------------------"
echo "Presiona Ctrl + C cuando desees apagar el enlace público."
echo "=================================================================="
echo ""

case $opcion in
    2)
        ssh -i "$KEY_FILE" -o StrictHostKeyChecking=no -o ServerAliveInterval=30 -R 80:localhost:$PORT nokey@localhost.run
        ;;
    3)
        ssh -o StrictHostKeyChecking=no -o ServerAliveInterval=30 -R 80:localhost:$PORT serveo.net
        ;;
    *)
        # Pinggy: funciona por el puerto 443 (nunca bloqueado por operadores)
        ssh -p 443 -R0:localhost:$PORT -o StrictHostKeyChecking=no -o ServerAliveInterval=30 a.pinggy.io
        ;;
esac
