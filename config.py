"""
Kunkurt Devs - Central Configuration Module
Zero hardcoded paths: All paths and parameters are dynamically computed
relative to the project root directory, or configurable via environment variables / .env.
"""

import os
from pathlib import Path

# Project root directory (always calculated dynamically relative to this file)
BASE_DIR = Path(__file__).resolve().parent

# Optional: Load simple .env file if present in the project directory
ENV_FILE = BASE_DIR / ".env"
if ENV_FILE.is_file():
    try:
        with open(ENV_FILE, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if line and not line.startswith("#") and "=" in line:
                    key, val = line.split("=", 1)
                    key = key.strip()
                    val = val.strip().strip('"').strip("'")
                    if key and key not in os.environ:
                        os.environ[key] = val
    except Exception:
        pass

# Server Network Configuration
HOST = os.getenv("HOST", "0.0.0.0")
DEFAULT_PORT = int(os.getenv("PORT", 8080))

# Dynamic Directories (Relative to project root)
STATIC_DIR = Path(os.getenv("KUNKURT_STATIC_DIR", str(BASE_DIR / "static")))
UPLOADS_DIR = Path(os.getenv("KUNKURT_UPLOADS_DIR", str(BASE_DIR / "uploads")))
DB_PATH = Path(os.getenv("KUNKURT_DB_PATH", str(BASE_DIR / "kunkurt.db")))
EMAIL_LOG_PATH = Path(os.getenv("KUNKURT_EMAIL_LOG", str(BASE_DIR / ".email_notifications.log")))
ACTIVE_PORT_FILE = Path(os.getenv("KUNKURT_ACTIVE_PORT_FILE", str(BASE_DIR / ".active_port")))

# Ensure runtime directories exist
UPLOADS_DIR.mkdir(parents=True, exist_ok=True)
(STATIC_DIR / "css").mkdir(parents=True, exist_ok=True)
(STATIC_DIR / "js").mkdir(parents=True, exist_ok=True)

# Application Identity & Admin defaults
ADMIN_EMAIL = os.getenv("ADMIN_EMAIL", "alejandrobelno964@gmail.com").strip().lower()
ADMIN_NAME = os.getenv("ADMIN_NAME", "JaponPLX (Alejandro)").strip()
DEFAULT_GITHUB_USER = os.getenv("DEFAULT_GITHUB_USER", "JaponPLX").strip()

# Optional SMTP Settings (if not provided, email alerts are logged to EMAIL_LOG_PATH)
SMTP_SERVER = os.getenv("SMTP_SERVER", "")
SMTP_PORT = int(os.getenv("SMTP_PORT", 587))
SMTP_USER = os.getenv("SMTP_USER", "")
SMTP_PASSWORD = os.getenv("SMTP_PASSWORD", "")
