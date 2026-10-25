FROM python:3.11-slim

WORKDIR /app

# Copiar archivos del proyecto
COPY . /app

# Variables de entorno
ENV PYTHONUNBUFFERED=1
ENV PORT=8080
ENV HOST=0.0.0.0

EXPOSE 8080

CMD ["python3", "server.py"]
