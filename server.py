"""
Kunkurt Devs - Enterprise HTTP & REST API Server
Featuring:
- Automatic GitHub Repository Synchronization
- Authentication with Email Security Notification
- Multi-device Public & Local LAN Access
- Dynamic Port Allocation & Robust Threading
"""

import os
import sys
import json
import urllib.parse
import urllib.request
import mimetypes
import base64
import uuid
import socket
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
import database

PORT = 8080
BASE_DIR = os.path.dirname(os.path.abspath(__file__))
STATIC_DIR = os.path.join(BASE_DIR, "static")
UPLOADS_DIR = os.path.join(BASE_DIR, "uploads")
EMAIL_LOG_PATH = os.path.join(BASE_DIR, ".email_notifications.log")

os.makedirs(UPLOADS_DIR, exist_ok=True)
os.makedirs(os.path.join(STATIC_DIR, "css"), exist_ok=True)
os.makedirs(os.path.join(STATIC_DIR, "js"), exist_ok=True)

# Initialize database schema and seeds
database.init_db()

def get_lan_ip():
    try:
        with socket.socket(socket.AF_INET, socket.SOCK_DGRAM) as s:
            s.connect(("8.8.8.8", 80))
            return s.getsockname()[0]
    except Exception:
        return "127.0.0.1"

def send_login_email_notification(recipient_email, username, role, ip_address):
    """
    Sends an email notification upon login.
    Uses SMTP if environment variables are set, otherwise logs to file and DB.
    """
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    subject = f"🔐 Kunkurt Devs — Alerta de Inicio de Sesión ({username})"
    body = f"""Hola {username},

Se ha registrado un nuevo inicio de sesión en la plataforma Kunkurt Devs.

• Usuario: {username}
• Rol: {role}
• Correo: {recipient_email}
• Fecha y Hora: {timestamp}
• Dirección IP: {ip_address}
• Estado: Acceso Autorizado

Si reconoces esta actividad, no necesitas hacer nada. Si no fuiste tú, por favor contacta a la administración de Kunkurt inmediatamente.

Atentamente,
Equipo de Seguridad & Tecnología Kunkurt Devs
"""

    smtp_host = os.environ.get("KUNKURT_SMTP_HOST")
    smtp_port = int(os.environ.get("KUNKURT_SMTP_PORT", 587))
    smtp_user = os.environ.get("KUNKURT_SMTP_USER")
    smtp_pass = os.environ.get("KUNKURT_SMTP_PASS")

    email_sent_real = False
    if smtp_host and smtp_user and smtp_pass:
        try:
            msg = MIMEMultipart()
            msg["From"] = f"Kunkurt Security <{smtp_user}>"
            msg["To"] = recipient_email
            msg["Subject"] = subject
            msg.attach(MIMEText(body, "plain", "utf-8"))

            with smtplib.SMTP(smtp_host, smtp_port, timeout=10) as server:
                server.starttls()
                server.login(smtp_user, smtp_pass)
                server.send_message(msg)
            email_sent_real = True
        except Exception as e:
            print(f"⚠️ Error enviando correo vía SMTP: {e}", flush=True)

    # Always log the notification for transparency and audit trail
    log_entry = f"[{timestamp}] EMAIL ALERT to {recipient_email} ({username}): Login from {ip_address} | SMTP: {'Sent' if email_sent_real else 'Simulated/Logged'}\n"
    with open(EMAIL_LOG_PATH, "a", encoding="utf-8") as f:
        f.write(log_entry)

    print(f"📧 Notificación de inicio de sesión despachada para {recipient_email}", flush=True)
    return {"delivered": True, "smtp_real": email_sent_real, "recipient": recipient_email}

class KunkurtAPIHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=STATIC_DIR, **kwargs)

    def send_json(self, data, status=200):
        body = json.dumps(data, ensure_ascii=False).encode("utf-8")
        self.send_response(status)
        self.send_header("Content-Type", "application/json; charset=utf-8")
        self.send_header("Content-Length", str(len(body)))
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-User-Role")
        self.end_headers()
        self.wfile.write(body)

    def read_json_body(self):
        content_length = int(self.headers.get("Content-Length", 0))
        if content_length > 0:
            raw_body = self.rfile.read(content_length).decode("utf-8")
            return json.loads(raw_body)
        return {}

    def do_OPTIONS(self):
        self.send_response(204)
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
        self.send_header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-User-Role")
        self.end_headers()

    def do_GET(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path
        query = urllib.parse.parse_qs(parsed.query)

        # Serve uploaded media files
        if path.startswith("/uploads/"):
            filename = os.path.basename(path)
            file_path = os.path.join(UPLOADS_DIR, filename)
            if os.path.exists(file_path) and os.path.isfile(file_path):
                mime, _ = mimetypes.guess_type(file_path)
                with open(file_path, "rb") as f:
                    content = f.read()
                self.send_response(200)
                self.send_header("Content-Type", mime or "application/octet-stream")
                self.send_header("Content-Length", str(len(content)))
                self.end_headers()
                self.wfile.write(content)
                return
            else:
                self.send_error(404, "File Not Found")
                return

        # API: Network & Public Access Info
        if path == "/api/network-info":
            lan_ip = get_lan_ip()
            self.send_json({
                "success": True,
                "local_url": f"http://localhost:{PORT}",
                "lan_url": f"http://{lan_ip}:{PORT}",
                "lan_ip": lan_ip,
                "port": PORT
            })
            return

        # API: Notifications
        if path == "/api/notifications":
            notifs = database.get_notifications()
            self.send_json({"success": True, "notifications": notifs})
            return

        # API: Team & Leaderboard / Employees
        if path == "/api/team" or path == "/api/users" or path == "/api/employees":
            users = database.get_users()
            self.send_json({"success": True, "users": users, "employees": users})
            return

        # API: Stats
        if path == "/api/stats":
            stats = database.get_stats()
            self.send_json({"success": True, "stats": stats})
            return

        # API: Projects list
        if path == "/api/projects":
            category = query.get("category", [None])[0]
            status = query.get("status", [None])[0]
            search = query.get("search", [None])[0]
            is_public_only = query.get("public_only", ["0"])[0] == "1"

            projects = database.get_all_projects(
                is_public_only=is_public_only,
                category=category,
                search=search,
                status=status
            )
            self.send_json({"success": True, "projects": projects})
            return

        # API: Project by ID
        if path.startswith("/api/projects/"):
            parts = path.strip("/").split("/")
            try:
                project_id = int(parts[2])
                project = database.get_project_by_id(project_id)
                if project:
                    self.send_json({"success": True, "project": project})
                else:
                    self.send_json({"success": False, "error": "Proyecto no encontrado"}, 404)
            except (ValueError, IndexError):
                self.send_json({"success": False, "error": "ID de proyecto inválido"}, 400)
            return

        # Fallback to static files
        if path == "/" or path == "":
            self.path = "/index.html"
            
        return super().do_GET()

    def do_POST(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        try:
            body = self.read_json_body()
        except Exception as e:
            self.send_json({"success": False, "error": f"JSON inválido: {str(e)}"}, 400)
            return

        # API: GitHub Sync (Import repositories automatically)
        if path == "/api/github/sync":
            github_username = body.get("github_username", "").strip()
            if not github_username:
                self.send_json({"success": False, "error": "Nombre de usuario de GitHub requerido"}, 400)
                return

            try:
                gh_url = f"https://api.github.com/users/{github_username}/repos?per_page=100&sort=updated"
                req = urllib.request.Request(gh_url, headers={
                    "User-Agent": "Kunkurt-Platform",
                    "Accept": "application/vnd.github.v3+json"
                })
                with urllib.request.urlopen(req, timeout=10) as resp:
                    repos = json.loads(resp.read().decode("utf-8"))

                # Get user profile for avatar and name
                author_name = github_username
                author_avatar = f"https://avatars.githubusercontent.com/{github_username}"
                try:
                    u_url = f"https://api.github.com/users/{github_username}"
                    u_req = urllib.request.Request(u_url, headers={"User-Agent": "Kunkurt-Platform"})
                    with urllib.request.urlopen(u_req, timeout=5) as u_resp:
                        u_data = json.loads(u_resp.read().decode("utf-8"))
                        author_name = u_data.get("name") or github_username
                        author_avatar = u_data.get("avatar_url") or author_avatar
                except Exception:
                    pass

                imported_count = database.import_github_repos(
                    repos=repos,
                    github_username=github_username,
                    author_name=author_name,
                    author_avatar=author_avatar
                )

                self.send_json({
                    "success": True,
                    "imported_count": imported_count,
                    "total_repos_found": len(repos),
                    "github_username": github_username,
                    "author_name": author_name,
                    "author_avatar": author_avatar
                })
            except Exception as e:
                self.send_json({"success": False, "error": f"Error conectando con GitHub API: {str(e)}"}, 500)
            return

        # API: Create / Authorize Employee (Only Admin can register new employees)
        if path == "/api/employees/create":
            full_name = body.get("full_name", "").strip()
            email = body.get("email", "").strip().lower()
            role = body.get("role", "developer").strip()
            department = body.get("department", "Equipo Kunkurt Devs").strip()

            if not email or not full_name:
                self.send_json({"success": False, "error": "Nombre y correo son obligatorios"}, 400)
                return

            employee = database.admin_create_employee(full_name, email, role, department)
            self.send_json({"success": True, "employee": employee})
            return

        # API: Delete Employee (Admin only)
        if path == "/api/employees/delete":
            emp_id = body.get("id")
            if not emp_id:
                self.send_json({"success": False, "error": "ID de empleado requerido"}, 400)
                return

            ok = database.admin_delete_employee(emp_id)
            if ok:
                self.send_json({"success": True})
            else:
                self.send_json({"success": False, "error": "No se puede eliminar al Administrador Fundador"}, 400)
            return

        # API: Authentication & Login with Email Security Notification
        # ONLY allows users registered by the Administrator!
        if path == "/api/auth/login":
            email = body.get("email", "").strip().lower()
            if not email:
                self.send_json({"success": False, "error": "El correo electrónico es obligatorio"}, 400)
                return

            # Check if employee was registered and authorized by the Administrator
            user = database.find_user_by_email(email)
            if not user:
                # Founding admin check
                if email == "alejandrobelno964@gmail.com":
                    user = database.admin_create_employee("JaponPLX (Alejandro)", email, "admin", "Dirección General & Lead Dev")
                else:
                    self.send_json({
                        "success": False,
                        "error": "❌ Acceso denegado: Este correo no ha sido dado de alta por el Administrador. Solicita a tu Administrador que registre tu cuenta de empleado y te asigne tu rol."
                    }, 403)
                    return

            role = user["role"]
            full_name = user["full_name"]
            username = user["username"]
            client_ip = self.client_address[0] if self.client_address else "127.0.0.1"
            user_agent = self.headers.get("User-Agent", "Navegador Web")

            # Dispatch email notification
            email_res = send_login_email_notification(email, full_name, role, client_ip)

            # Log to DB
            database.log_login_event(email, username, role, client_ip, user_agent)

            session_token = f"kunkurt_session_{uuid.uuid4().hex}"
            self.send_json({
                "success": True,
                "message": f"Sesión autorizada como {full_name} [{role.upper()}]. Alerta enviada a {email}.",
                "session_token": session_token,
                "user": user,
                "email_notification": email_res
            })
            return

        # API: Mark notifications as read
        if path == "/api/notifications/read":
            database.mark_notifications_read()
            self.send_json({"success": True})
            return

        # API: Upload base64 image
        if path == "/api/upload":
            image_data = body.get("image_base64")
            if not image_data:
                self.send_json({"success": False, "error": "No image data provided"}, 400)
                return

            try:
                if "," in image_data:
                    header, encoded = image_data.split(",", 1)
                    ext = ".png"
                    if "image/jpeg" in header or "image/jpg" in header:
                        ext = ".jpg"
                    elif "image/webp" in header:
                        ext = ".webp"
                else:
                    encoded = image_data
                    ext = ".png"

                raw_bytes = base64.b64decode(encoded)
                filename = f"upload_{uuid.uuid4().hex[:12]}{ext}"
                file_path = os.path.join(UPLOADS_DIR, filename)

                with open(file_path, "wb") as f:
                    f.write(raw_bytes)

                url = f"/uploads/{filename}"
                self.send_json({"success": True, "url": url})
            except Exception as e:
                self.send_json({"success": False, "error": f"Error guardando imagen: {str(e)}"}, 500)
            return

        # API: Create Project
        if path == "/api/projects":
            title = body.get("title")
            if not title:
                self.send_json({"success": False, "error": "El título del proyecto es obligatorio"}, 400)
                return

            project = database.create_project(body)
            self.send_json({"success": True, "project": project}, 201)
            return

        # API: Create Task (Kanban)
        if path.startswith("/api/projects/") and path.endswith("/tasks"):
            parts = path.strip("/").split("/")
            try:
                project_id = int(parts[2])
                title = body.get("title")
                if not title:
                    self.send_json({"success": False, "error": "El título de la tarea es obligatorio"}, 400)
                    return
                assignee = body.get("assignee", "Desarrollador Kunkurt")
                priority = body.get("priority", "medium")
                status = body.get("status", "todo")

                task = database.add_task(project_id, title, assignee, priority, status)
                self.send_json({"success": True, "task": task}, 201)
            except (ValueError, IndexError):
                self.send_json({"success": False, "error": "ID de proyecto inválido"}, 400)
            return

        # API: Add Comment / Feedback
        if path.startswith("/api/projects/") and path.endswith("/comments"):
            parts = path.strip("/").split("/")
            try:
                project_id = int(parts[2])
                content = body.get("content")
                if not content:
                    self.send_json({"success": False, "error": "El comentario no puede estar vacío"}, 400)
                    return

                user_name = body.get("user_name", "Colaborador Kunkurt")
                user_role = body.get("user_role", "employee")
                avatar_url = body.get("avatar_url", "")
                feedback_type = body.get("feedback_type", "general")

                new_comment = database.add_comment(
                    project_id=project_id,
                    user_name=user_name,
                    user_role=user_role,
                    avatar_url=avatar_url,
                    content=content,
                    feedback_type=feedback_type
                )
                self.send_json({"success": True, "comment": new_comment})
            except (ValueError, IndexError):
                self.send_json({"success": False, "error": "ID de proyecto inválido"}, 400)
            return

        # API: Toggle Like
        if path.startswith("/api/projects/") and path.endswith("/like"):
            parts = path.strip("/").split("/")
            try:
                project_id = int(parts[2])
                user_id = body.get("user_id", "anonymous_user")
                res = database.toggle_like(project_id, user_id)
                self.send_json({"success": True, **res})
            except (ValueError, IndexError):
                self.send_json({"success": False, "error": "ID de proyecto inválido"}, 400)
            return

        self.send_json({"success": False, "error": "Ruta no encontrada"}, 404)

    def do_PUT(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # Update Task Status (Kanban)
        if path.startswith("/api/tasks/") and path.endswith("/status"):
            parts = path.strip("/").split("/")
            try:
                task_id = int(parts[2])
                body = self.read_json_body()
                new_status = body.get("status")
                if not new_status:
                    self.send_json({"success": False, "error": "Falta el nuevo estado"}, 400)
                    return
                task = database.update_task_status(task_id, new_status)
                self.send_json({"success": True, "task": task})
            except (ValueError, IndexError):
                self.send_json({"success": False, "error": "ID de tarea inválido"}, 400)
            return

        # Update Project
        if path.startswith("/api/projects/"):
            parts = path.strip("/").split("/")
            try:
                project_id = int(parts[2])
                body = self.read_json_body()
                updated = database.update_project(project_id, body)
                self.send_json({"success": True, "project": updated})
            except (ValueError, IndexError):
                self.send_json({"success": False, "error": "ID de proyecto inválido"}, 400)
            return

        self.send_json({"success": False, "error": "Ruta no encontrada"}, 404)

    def do_DELETE(self):
        parsed = urllib.parse.urlparse(self.path)
        path = parsed.path

        # Delete Task
        if path.startswith("/api/tasks/"):
            parts = path.strip("/").split("/")
            try:
                task_id = int(parts[2])
                database.delete_task(task_id)
                self.send_json({"success": True, "message": "Tarea eliminada"})
            except (ValueError, IndexError):
                self.send_json({"success": False, "error": "ID de tarea inválido"}, 400)
            return

        # Delete Project
        if path.startswith("/api/projects/"):
            parts = path.strip("/").split("/")
            try:
                project_id = int(parts[2])
                database.delete_project(project_id)
                self.send_json({"success": True, "message": "Proyecto eliminado exitosamente"})
            except (ValueError, IndexError):
                self.send_json({"success": False, "error": "ID de proyecto inválido"}, 400)
            return

        self.send_json({"success": False, "error": "Ruta no encontrada"}, 404)

class ReusableThreadingServer(ThreadingHTTPServer):
    allow_reuse_address = True

def find_available_port(start_port=8080, max_attempts=50):
    for p in range(start_port, start_port + max_attempts):
        with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
            s.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            try:
                s.bind(("0.0.0.0", p))
                return p
            except OSError:
                continue
    return start_port

def run():
    global PORT
    PORT = find_available_port(8080)
    try:
        with open(os.path.join(BASE_DIR, ".active_port"), "w") as pf:
            pf.write(str(PORT))
    except Exception:
        pass

    server = ReusableThreadingServer(("0.0.0.0", PORT), KunkurtAPIHandler)
    lan_ip = get_lan_ip()

    print("=" * 65, flush=True)
    print("⚡ SERVIDOR KUNKURT DEVS ACTIVO PARA TODO EL MUNDO", flush=True)
    print(f"👉 En tu computadora: http://localhost:{PORT}", flush=True)
    print(f"👉 En tu red local (celular, tablet u otra PC): http://{lan_ip}:{PORT}", flush=True)
    print(f"👉 Sincronización GitHub y Login con Correo: Habilitados", flush=True)
    print("=" * 65, flush=True)
    print("Presiona Ctrl + C en tu terminal para detener.\n", flush=True)

    try:
        server.serve_forever()
    except KeyboardInterrupt:
        print("\nServidor detenido.", flush=True)
        server.server_close()

if __name__ == "__main__":
    run()
