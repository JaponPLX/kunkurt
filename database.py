"""
Kunkurt Devs - Database Module with GitHub Sync, Authentication Logs & Public Showcase
"""

import sqlite3
import json
import os
import urllib.parse
from datetime import datetime
from config import DB_PATH, ADMIN_EMAIL, ADMIN_NAME, DEFAULT_GITHUB_USER

def get_connection():
    conn = sqlite3.connect(str(DB_PATH), timeout=20.0)
    try:
        conn.execute("PRAGMA journal_mode=WAL")
    except Exception:
        pass
    conn.row_factory = sqlite3.Row
    return conn

def init_db(force_seed=False):
    conn = get_connection()
    cursor = conn.cursor()

    # Users table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        full_name TEXT NOT NULL,
        email TEXT UNIQUE NOT NULL,
        role TEXT NOT NULL,
        avatar_url TEXT,
        department TEXT,
        badges TEXT DEFAULT '[]',
        points INTEGER DEFAULT 120,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Projects table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        summary TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT NOT NULL,
        tech_stack TEXT NOT NULL,
        status TEXT NOT NULL CHECK(status IN ('planning', 'development', 'testing', 'production')),
        github_url TEXT,
        demo_url TEXT,
        image_url TEXT,
        is_public INTEGER DEFAULT 1,
        featured INTEGER DEFAULT 0,
        author_id INTEGER,
        author_name TEXT NOT NULL,
        author_role TEXT NOT NULL,
        likes_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users (id)
    );
    """)

    # Comments table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        user_name TEXT NOT NULL,
        user_role TEXT NOT NULL,
        avatar_url TEXT,
        content TEXT NOT NULL,
        feedback_type TEXT DEFAULT 'general',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
    );
    """)

    # Likes table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS likes (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        user_id TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(project_id, user_id)
    );
    """)

    # Tasks table (Kanban)
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS tasks (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        title TEXT NOT NULL,
        assignee TEXT NOT NULL,
        status TEXT NOT NULL CHECK(status IN ('todo', 'in_progress', 'review', 'done')),
        priority TEXT NOT NULL CHECK(priority IN ('low', 'medium', 'high', 'urgent')),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
    );
    """)

    # Changelogs table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS changelogs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        project_id INTEGER NOT NULL,
        version TEXT NOT NULL,
        release_date TEXT NOT NULL,
        title TEXT NOT NULL,
        notes TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects (id) ON DELETE CASCADE
    );
    """)

    # Notifications table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS notifications (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        type TEXT DEFAULT 'info',
        time_ago TEXT DEFAULT 'Hace unos momentos',
        is_read INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Login Logs & Email Notifications table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS login_logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email TEXT NOT NULL,
        username TEXT NOT NULL,
        role TEXT NOT NULL,
        ip_address TEXT DEFAULT '127.0.0.1',
        user_agent TEXT,
        notification_sent INTEGER DEFAULT 1,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # App Settings & SMTP table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
    );
    """)

    # Tickets table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS tickets (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ticket_code TEXT UNIQUE NOT NULL,
        title TEXT NOT NULL,
        description TEXT NOT NULL,
        category TEXT DEFAULT 'Soporte',
        priority TEXT DEFAULT 'media',
        status TEXT DEFAULT 'abierto',
        project_id INTEGER,
        project_title TEXT DEFAULT 'General',
        author_name TEXT NOT NULL,
        author_email TEXT NOT NULL,
        author_role TEXT DEFAULT 'cliente',
        assigned_id INTEGER,
        assigned_name TEXT DEFAULT 'Sin Asignar',
        assigned_email TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Ticket comments / responses thread
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS ticket_comments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ticket_id INTEGER NOT NULL,
        user_name TEXT NOT NULL,
        user_email TEXT NOT NULL,
        user_role TEXT DEFAULT 'colaborador',
        user_avatar TEXT,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (ticket_id) REFERENCES tickets (id) ON DELETE CASCADE
    );
    """)

    # Team Live Chat & Announcements table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS team_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_name TEXT NOT NULL,
        user_email TEXT NOT NULL,
        user_role TEXT DEFAULT 'developer',
        user_avatar TEXT,
        message TEXT NOT NULL,
        message_type TEXT DEFAULT 'chat',
        is_pinned INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Knowledge Base / Technical Wiki table
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS knowledge_base (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        category TEXT DEFAULT 'Despliegue & DevOps',
        content TEXT NOT NULL,
        author_name TEXT NOT NULL,
        author_role TEXT DEFAULT 'admin',
        tags TEXT DEFAULT '[]',
        views_count INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    """)

    # Ensure password column exists in users
    cursor.execute("PRAGMA table_info(users)")
    cols = [r["name"] for r in cursor.fetchall()]
    if "password" not in cols:
        cursor.execute("ALTER TABLE users ADD COLUMN password TEXT DEFAULT ''")

    # Seed sample tickets if table is empty
    cursor.execute("SELECT COUNT(*) FROM tickets")
    if cursor.fetchone()[0] == 0:
        seed_sample_tickets(conn)

    # Seed sample announcements and chat messages if empty
    cursor.execute("SELECT COUNT(*) FROM team_messages")
    if cursor.fetchone()[0] == 0:
        seed_sample_team_messages(conn)

    # Seed knowledge base if empty
    cursor.execute("SELECT COUNT(*) FROM knowledge_base")
    if cursor.fetchone()[0] == 0:
        seed_sample_knowledge_base(conn)

    conn.commit()

    if force_seed:
        reset_and_seed_japonplx_data(conn)
    else:
        cursor.execute("SELECT COUNT(*) FROM projects WHERE github_url LIKE '%JaponPLX%'")
        if cursor.fetchone()[0] == 0:
            reset_and_seed_japonplx_data(conn)

    conn.close()

def reset_and_seed_japonplx_data(conn):
    cursor = conn.cursor()

    cursor.execute("DELETE FROM projects")
    cursor.execute("DELETE FROM tasks")
    cursor.execute("DELETE FROM changelogs")
    cursor.execute("DELETE FROM comments")
    cursor.execute("DELETE FROM notifications")
    cursor.execute("DELETE FROM users")

    # Seed Users (SOLO EL ADMINISTRADOR REAL FUNDADOR - Cero personas falsas)
    admin_uname = DEFAULT_GITHUB_USER.lower()
    users = [
        (
            admin_uname,
            ADMIN_NAME,
            ADMIN_EMAIL,
            "admin",
            f"https://avatars.githubusercontent.com/{DEFAULT_GITHUB_USER}",
            "Dirección General & Arquitectura de Software",
            json.dumps(["👑 Administrador Fundador", "⚡ Lead Developer", "GitHub Master"]),
            1000
        )
    ]
    cursor.executemany("""
        INSERT INTO users (username, full_name, email, role, avatar_url, department, badges, points)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    """, users)

    # Seed Real Repositories
    projects = [
        (
            "Acelerador de Integraciones B2B (NoCountry)",
            "acelerador-de-integraciones-b2b",
            "Plataforma inteligente y catálogo interactivo de tecnologías open source con Asistente Consultor RAG y generador IaC.",
            "Acelerador de Integraciones Open Source (B2B) desarrollado en la simulación laboral de NoCountry.\n\nIncluye catálogo interactivo de tecnologías open source curadas con Asistente Consultor de Arquitectura mediante RAG (Retrieval-Augmented Generation), pipeline de ingesta automática con GitHub API v3, generador de infraestructura como código (docker-compose y Dockerfile) y despliegue automatizado con scripts de tunelización segura en Render.",
            "Inteligencia Artificial",
            json.dumps(["Python", "FastAPI", "Docker", "RAG", "GitHub API", "Render", "Vector DB"]),
            "production",
            "https://github.com/JaponPLX/b2b",
            "https://github.com/JaponPLX/b2b",
            "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80",
            1, 1, 1, "JaponPLX (Alejandro)", "developer", 54
        ),
        (
            "CVFlow — SaaS de Automatización de CVs",
            "cvflow-saas-automatizacion-cvs",
            "SaaS corporativo: sube hojas de vida, conviértelas en perfiles estructurados, estandariza con branding y rankea candidatos.",
            "Base funcional (MVP SaaS) para empresas y departamentos de talento humano.\n\nPermite subir CVs en múltiples formatos, procesarlos y convertirlos en perfiles normalizados (JSON/SQLite), generar CVs estandarizados con la marca y estilo corporativo del cliente, y clasificar algorítmicamente a los candidatos comparándolos contra los requerimientos de vacantes activas.\n\nContenerizado con Docker y configurado con Cloudflare Tunnels para conectividad remota segura.",
            "Recursos Humanos & Ops",
            json.dumps(["Python", "FastAPI", "SQLite", "Docker", "Cloudflare", "Uvicorn", "TailwindCSS"]),
            "production",
            "https://github.com/JaponPLX/cvflow",
            "https://github.com/JaponPLX/cvflow",
            "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&auto=format&fit=crop&q=80",
            1, 1, 1, "JaponPLX (Alejandro)", "developer", 47
        ),
        (
            "Hola UI — Responsive Design System",
            "hola-ui-responsive-design",
            "Prototipo interactivo de interfaz web y experimentación de estilos responsivos con CSS3 moderno.",
            "Laboratorio interactivo de interfaz frontend y experimentación de estilos visuales modernos con CSS3 y HTML5.\n\nEstructuración modular de selectores, diseño responsivo adaptativo (Flexbox y Grid), paleta de colores y patrones de componentes visuales para páginas web de alto rendimiento.",
            "Web & Mobile",
            json.dumps(["HTML5", "CSS3", "Responsive Design", "Flexbox"]),
            "development",
            "https://github.com/JaponPLX/hola",
            "https://github.com/JaponPLX/hola",
            "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80",
            1, 0, 1, "JaponPLX (Alejandro)", "developer", 23
        ),
        (
            "WD4E Web Design & Layout Suite",
            "wd4e-web-design-layout-suite",
            "Suite de componentes web interactivos, modelos de visualización y aplicación de layouts avanzados con CSS3.",
            "Suite técnica de diseño web y desarrollo de maquetaciones avanzadas.\n\nContiene implementaciones profundas de CSS Box Model, layouts con display properties, pseudo-clases dinámicas y buenas prácticas de arquitectura frontend para proyectos escalables.",
            "Web & Mobile",
            json.dumps(["HTML5", "CSS3", "JavaScript", "Layouts", "Git"]),
            "production",
            "https://github.com/JaponPLX/WD4E-Intro_to_CSS3",
            "https://github.com/JaponPLX/WD4E-Intro_to_CSS3",
            "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80",
            1, 0, 1, "JaponPLX (Alejandro)", "developer", 31
        )
    ]

    cursor.executemany("""
        INSERT INTO projects (
            title, slug, summary, description, category, tech_stack,
            status, github_url, demo_url, image_url, is_public, featured,
            author_id, author_name, author_role, likes_count
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, projects)

    tasks = [
        (1, "Pipeline de ingesta continua con GitHub API v3", "JaponPLX (Alejandro)", "done", "urgent"),
        (1, "Generador de infraestructura como código (docker-compose)", "JaponPLX (Alejandro)", "done", "high"),
        (1, "Consultor de arquitectura con RAG y embeddings semánticos", "JaponPLX (Alejandro)", "in_progress", "urgent"),
        (1, "Configuración de túneles públicos en Render con public_tunnel.sh", "JaponPLX (Alejandro)", "done", "medium"),
        (2, "Motor de parsing y extracción estructurada de CVs", "JaponPLX (Alejandro)", "done", "urgent"),
        (2, "Algoritmo de scoring y matching candidato vs vacante", "JaponPLX (Alejandro)", "done", "high"),
        (2, "Integración de Cloudflare Tunnels para despliegue remoto seguro", "JaponPLX (Alejandro)", "done", "high")
    ]
    cursor.executemany("""
        INSERT INTO tasks (project_id, title, assignee, status, priority)
        VALUES (?, ?, ?, ?, ?)
    """, tasks)

    changelogs = [
        (1, "v1.2.0", "Octubre 2026", "Integración de Asistente RAG & Pipeline GitHub", "• Consulta inteligente de arquitecturas mediante RAG\n• Pipeline automático de ingesta con GitHub API v3\n• Contenerización con Docker y Docker Compose"),
        (2, "v1.0.0", "Octubre 2026", "Lanzamiento MVP CVFlow", "• Extracción y normalización de perfiles en SQLite\n• Scoring de candidatos contra vacantes\n• Contenedor Docker listo y Cloudflare Tunnels")
    ]
    cursor.executemany("""
        INSERT INTO changelogs (project_id, version, release_date, title, notes)
        VALUES (?, ?, ?, ?, ?)
    """, changelogs)

    notifications = [
        ("🚀 Repositorios Sincronizados", "Se sincronizaron con éxito los repositorios reales de JaponPLX en Kunkurt.", "deploy", "Hace unos momentos", 0),
        ("⭐ Nuevo Proyecto Destacado", "Acelerador B2B y CVFlow ahora lideran el catálogo oficial de Kunkurt.", "approval", "Hace 5 min", 0)
    ]
    cursor.executemany("""
        INSERT INTO notifications (title, message, type, time_ago, is_read)
        VALUES (?, ?, ?, ?, ?)
    """, notifications)

    conn.commit()

# Project Queries
def get_all_projects(is_public_only=False, category=None, search=None, status=None):
    conn = get_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM projects WHERE 1=1"
    params = []

    if is_public_only:
        query += " AND is_public = 1"
    if category and category != "all":
        query += " AND category = ?"
        params.append(category)
    if status and status != "all":
        query += " AND status = ?"
        params.append(status)
    if search:
        query += " AND (title LIKE ? OR summary LIKE ? OR tech_stack LIKE ?)"
        s = f"%{search}%"
        params.extend([s, s, s])

    query += " ORDER BY featured DESC, id DESC"
    cursor.execute(query, params)
    rows = [dict(row) for row in cursor.fetchall()]
    for r in rows:
        r["tech_stack"] = json.loads(r["tech_stack"]) if r.get("tech_stack") else []
    conn.close()
    return rows

def get_project_by_id(project_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM projects WHERE id = ?", (project_id,))
    row = cursor.fetchone()
    if not row:
        conn.close()
        return None
    project = dict(row)
    project["tech_stack"] = json.loads(project["tech_stack"]) if project.get("tech_stack") else []

    cursor.execute("SELECT * FROM comments WHERE project_id = ? ORDER BY id DESC", (project_id,))
    project["comments"] = [dict(c) for c in cursor.fetchall()]

    cursor.execute("SELECT * FROM tasks WHERE project_id = ? ORDER BY id ASC", (project_id,))
    project["tasks"] = [dict(t) for t in cursor.fetchall()]

    cursor.execute("SELECT * FROM changelogs WHERE project_id = ? ORDER BY id DESC", (project_id,))
    project["changelogs"] = [dict(l) for l in cursor.fetchall()]

    conn.close()
    return project

def create_project(data):
    conn = get_connection()
    cursor = conn.cursor()
    slug = data.get("title", "project").lower().replace(" ", "-").replace("/", "-")
    cursor.execute("SELECT COUNT(*) FROM projects WHERE slug LIKE ?", (f"{slug}%",))
    count = cursor.fetchone()[0]
    if count > 0:
        slug = f"{slug}-{count + 1}"

    tech_stack_json = json.dumps(data.get("tech_stack", []))

    cursor.execute("""
        INSERT INTO projects (
            title, slug, summary, description, category, tech_stack,
            status, github_url, demo_url, image_url, is_public, featured,
            author_id, author_name, author_role
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        data.get("title"),
        slug,
        data.get("summary", ""),
        data.get("description", ""),
        data.get("category", "General"),
        tech_stack_json,
        data.get("status", "planning"),
        data.get("github_url", ""),
        data.get("demo_url", ""),
        data.get("image_url", "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80"),
        1 if data.get("is_public", True) else 0,
        1 if data.get("featured", False) else 0,
        data.get("author_id", 1),
        data.get("author_name", "JaponPLX (Alejandro)"),
        data.get("author_role", "developer")
    ))
    new_id = cursor.lastrowid

    # Create initial Kanban tasks
    init_tasks = [
        (new_id, "Definir especificación de requerimientos de Kunkurt", data.get("author_name", "Desarrollador"), "done", "medium"),
        (new_id, "Configurar pipeline CI/CD y contenedor Docker", data.get("author_name", "Desarrollador"), "in_progress", "high"),
        (new_id, "Pruebas integrales de seguridad y QA", "Equipo QA", "todo", "high")
    ]
    cursor.executemany("""
        INSERT INTO tasks (project_id, title, assignee, status, priority)
        VALUES (?, ?, ?, ?, ?)
    """, init_tasks)

    # Add notification
    cursor.execute("""
        INSERT INTO notifications (title, message, type)
        VALUES (?, ?, 'deploy')
    """, (f"🚀 Nuevo Proyecto Creado", f"{data.get('author_name')} registró el proyecto '{data.get('title')}' en Kunkurt."))

    conn.commit()
    conn.close()
    return get_project_by_id(new_id)

def import_github_repos(repos, github_username, author_name=None, author_avatar=None):
    """
    Import multiple GitHub repositories into the Kunkurt database automatically.
    """
    conn = get_connection()
    cursor = conn.cursor()
    imported_count = 0

    # Ensure author exists or fetch
    author = author_name or f"GitHub / {github_username}"
    avatar = author_avatar or f"https://avatars.githubusercontent.com/{github_username}"

    category_map = {
        "Python": "Inteligencia Artificial",
        "TypeScript": "Web & Mobile",
        "JavaScript": "Web & Mobile",
        "HTML": "Web & Mobile",
        "CSS": "Web & Mobile",
        "Rust": "Ciberseguridad",
        "Go": "Cloud & DevOps",
        "Solidity": "Fintech"
    }

    images = [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=900&auto=format&fit=crop&q=80"
    ]

    for idx, r in enumerate(repos):
        repo_name = r.get("name", "repo")
        repo_url = r.get("html_url", f"https://github.com/{github_username}/{repo_name}")
        
        # Check if already exists by github_url
        cursor.execute("SELECT id FROM projects WHERE github_url = ?", (repo_url,))
        existing = cursor.fetchone()
        if existing:
            continue

        title = repo_name.replace("-", " ").replace("_", " ").title()
        slug = f"{repo_name.lower()}-{github_username.lower()}"
        summary = r.get("description") or f"Repositorio oficial de {github_username} en GitHub ({r.get('language') or 'Software'})."
        description = f"Proyecto sincronizado automáticamente desde GitHub ({repo_url}).\n\nLenguaje principal: {r.get('language') or 'Multi-tecnología'}. Estrellas: {r.get('stargazers_count', 0)}. Forks: {r.get('forks_count', 0)}."
        primary_lang = r.get("language") or "Python"
        category = category_map.get(primary_lang, "Web & Mobile")
        tech_stack = [primary_lang, "GitHub", "Git"]
        if "FastAPI" in summary or "API" in summary:
            tech_stack.append("FastAPI")
        if "Docker" in summary:
            tech_stack.append("Docker")

        image_url = images[idx % len(images)]

        cursor.execute("""
            INSERT INTO projects (
                title, slug, summary, description, category, tech_stack,
                status, github_url, demo_url, image_url, is_public, featured,
                author_id, author_name, author_role, likes_count
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            title, slug, summary, description, category, json.dumps(tech_stack),
            "production", repo_url, repo_url, image_url, 1, 0,
            1, author, "developer", r.get("stargazers_count", 0) + 10
        ))
        imported_id = cursor.lastrowid
        imported_count += 1

        # Add initial sprint task
        cursor.execute("""
            INSERT INTO tasks (project_id, title, assignee, status, priority)
            VALUES (?, ?, ?, 'done', 'high')
        """, (imported_id, "Sincronización inicial desde GitHub", author))

    if imported_count > 0:
        cursor.execute("""
            INSERT INTO notifications (title, message, type)
            VALUES (?, ?, 'deploy')
        """, (f"🐙 Sincronización GitHub Exitosa", f"Se importaron {imported_count} repositorios desde la cuenta @{github_username} a Kunkurt."))

    conn.commit()
    conn.close()
    return imported_count

def log_login_event(email, username, role, ip_address="127.0.0.1", user_agent=""):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO login_logs (email, username, role, ip_address, user_agent, notification_sent)
        VALUES (?, ?, ?, ?, ?, 1)
    """, (email, username, role, ip_address, user_agent))
    
    # Add security notification
    cursor.execute("""
        INSERT INTO notifications (title, message, type)
        VALUES (?, ?, 'alert')
    """, (f"🔐 Inicio de Sesión", f"Acceso concedido a {email} ({role}) desde {ip_address} con aviso al correo."))

    conn.commit()
    conn.close()
    return True

def get_login_logs():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM login_logs ORDER BY id DESC LIMIT 15")
    logs = [dict(r) for r in cursor.fetchall()]
    conn.close()
    return logs

def update_project(project_id, data):
    conn = get_connection()
    cursor = conn.cursor()
    fields = []
    params = []
    allowed = ["title", "summary", "description", "category", "status", "github_url", "demo_url", "image_url", "is_public", "featured"]
    for k in allowed:
        if k in data:
            if k in ["is_public", "featured"]:
                fields.append(f"{k} = ?")
                params.append(1 if data[k] else 0)
            else:
                fields.append(f"{k} = ?")
                params.append(data[k])
                
    if "tech_stack" in data:
        fields.append("tech_stack = ?")
        params.append(json.dumps(data["tech_stack"]))
        
    if fields:
        params.append(project_id)
        sql = f"UPDATE projects SET {', '.join(fields)} WHERE id = ?"
        cursor.execute(sql, params)
        conn.commit()
    conn.close()
    return get_project_by_id(project_id)

def delete_project(project_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM projects WHERE id = ?", (project_id,))
    cursor.execute("DELETE FROM comments WHERE project_id = ?", (project_id,))
    cursor.execute("DELETE FROM likes WHERE project_id = ?", (project_id,))
    cursor.execute("DELETE FROM tasks WHERE project_id = ?", (project_id,))
    cursor.execute("DELETE FROM changelogs WHERE project_id = ?", (project_id,))
    conn.commit()
    conn.close()
    return True

def add_comment(project_id, user_name, user_role, avatar_url, content, feedback_type="general"):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO comments (project_id, user_name, user_role, avatar_url, content, feedback_type)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (project_id, user_name, user_role, avatar_url, content, feedback_type))
    comment_id = cursor.lastrowid

    cursor.execute("UPDATE users SET points = points + 15 WHERE full_name = ?", (user_name,))

    cursor.execute("SELECT title FROM projects WHERE id = ?", (project_id,))
    p = cursor.fetchone()
    p_title = p[0] if p else "Proyecto"
    cursor.execute("""
        INSERT INTO notifications (title, message, type)
        VALUES (?, ?, 'comment')
    """, (f"💬 Nueva Retroalimentación", f"{user_name} ({user_role}) comentó en {p_title}: \"{content[:40]}...\""))

    conn.commit()
    cursor.execute("SELECT * FROM comments WHERE id = ?", (comment_id,))
    res = dict(cursor.fetchone())
    conn.close()
    return res

def toggle_like(project_id, user_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM likes WHERE project_id = ? AND user_id = ?", (project_id, user_id))
    existing = cursor.fetchone()
    if existing:
        cursor.execute("DELETE FROM likes WHERE id = ?", (existing[0],))
        cursor.execute("UPDATE projects SET likes_count = MAX(0, likes_count - 1) WHERE id = ?", (project_id,))
        liked = False
    else:
        cursor.execute("INSERT INTO likes (project_id, user_id) VALUES (?, ?)", (project_id, user_id))
        cursor.execute("UPDATE projects SET likes_count = likes_count + 1 WHERE id = ?", (project_id,))
        liked = True
    conn.commit()
    cursor.execute("SELECT likes_count FROM projects WHERE id = ?", (project_id,))
    new_count = cursor.fetchone()[0]
    conn.close()
    return {"liked": liked, "likes_count": new_count}

def add_task(project_id, title, assignee, priority="medium", status="todo"):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO tasks (project_id, title, assignee, status, priority)
        VALUES (?, ?, ?, ?, ?)
    """, (project_id, title, assignee, status, priority))
    new_id = cursor.lastrowid
    conn.commit()
    cursor.execute("SELECT * FROM tasks WHERE id = ?", (new_id,))
    task = dict(cursor.fetchone())
    conn.close()
    return task

def update_task_status(task_id, new_status):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE tasks SET status = ? WHERE id = ?", (new_status, task_id))
    conn.commit()
    cursor.execute("SELECT * FROM tasks WHERE id = ?", (task_id,))
    task = dict(cursor.fetchone())
    conn.close()
    return task

def delete_task(task_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM tasks WHERE id = ?", (task_id,))
    conn.commit()
    conn.close()
    return True

def get_notifications():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM notifications ORDER BY id DESC LIMIT 20")
    notifs = [dict(n) for n in cursor.fetchall()]
    conn.close()
    return notifs

def add_notification(title, message, n_type="team"):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO notifications (title, message, type, time_ago, is_read)
        VALUES (?, ?, ?, 'Hace un momento', 0)
    """, (title, message, n_type))
    conn.commit()
    conn.close()
    return True

def mark_notifications_read():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE notifications SET is_read = 1")
    conn.commit()
    conn.close()
    return True

def get_stats():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM projects")
    total_projects = cursor.fetchone()[0]
    
    cursor.execute("SELECT COUNT(*) FROM projects WHERE status = 'production'")
    production_projects = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM projects WHERE status = 'development'")
    dev_projects = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM users")
    total_users = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM comments")
    total_comments = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM tasks")
    total_tasks = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM tasks WHERE status = 'done'")
    completed_tasks = cursor.fetchone()[0]

    cursor.execute("SELECT SUM(likes_count) FROM projects")
    sum_likes = cursor.fetchone()[0] or 0

    conn.close()
    return {
        "total_projects": total_projects,
        "production_projects": production_projects,
        "dev_projects": dev_projects,
        "total_users": total_users,
        "total_comments": total_comments,
        "total_tasks": total_tasks,
        "completed_tasks": completed_tasks,
        "total_likes": sum_likes
    }

def get_users():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, username, full_name, email, role, avatar_url, department, badges, points FROM users ORDER BY points DESC")
    rows = cursor.fetchall()
    users = []
    for r in rows:
        u = dict(r)
        u["badges"] = json.loads(u["badges"]) if u.get("badges") else []
        users.append(u)
    conn.close()
    return users

def save_or_update_user(username, full_name, email, role, avatar_url=None, department=None):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, badges, points FROM users WHERE email = ? OR username = ?", (email, username))
    existing = cursor.fetchone()
    if existing:
        cursor.execute("""
            UPDATE users SET 
                full_name = ?, 
                role = ?, 
                avatar_url = COALESCE(?, avatar_url), 
                department = COALESCE(?, department)
            WHERE id = ?
        """, (full_name, role, avatar_url, department, existing["id"]))
        user_id = existing["id"]
    else:
        cursor.execute("""
            INSERT INTO users (username, full_name, email, role, avatar_url, department, badges, points)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            username, 
            full_name, 
            email, 
            role, 
            avatar_url or f"https://ui-avatars.com/api/?name={username}&background=8b5cf6&color=fff", 
            department or "Equipo Kunkurt Devs", 
            json.dumps(["🌟 Empleado Verificado", f"Rol: {role.title()}"]), 
            150
        ))
        user_id = cursor.lastrowid

    conn.commit()
    cursor.execute("SELECT id, username, full_name, email, role, avatar_url, department, badges, points FROM users WHERE id = ?", (user_id,))
    row = dict(cursor.fetchone())
    row["badges"] = json.loads(row["badges"]) if row.get("badges") else []
    conn.close()
    return row

def find_user_by_credentials(identifier):
    if not identifier:
        return None
    ident = identifier.strip().lower()
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT id, username, full_name, email, role, avatar_url, department, badges, points, password 
        FROM users 
        WHERE LOWER(email) = ? OR LOWER(username) = ?
    """, (ident, ident))
    row = cursor.fetchone()
    conn.close()
    if row:
        u = dict(row)
        u["badges"] = json.loads(u["badges"]) if u.get("badges") else []
        return u
    return None

def find_user_by_email(email):
    return find_user_by_credentials(email)

def admin_create_employee(full_name, email, role, department):
    import urllib.parse
    email = email.strip().lower()
    full_name = full_name.strip()
    username = email.split("@")[0].lower()
    
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE LOWER(email) = ?", (email,))
    existing = cursor.fetchone()
    if existing:
        cursor.execute("""
            UPDATE users SET full_name = ?, role = ?, department = ?
            WHERE id = ?
        """, (full_name, role, department, existing["id"]))
        user_id = existing["id"]
    else:
        cursor.execute("""
            INSERT INTO users (username, full_name, email, role, avatar_url, department, badges, points)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, (
            username,
            full_name,
            email,
            role,
            f"https://ui-avatars.com/api/?name={urllib.parse.quote(full_name)}&background=8b5cf6&color=fff",
            department or "Equipo Kunkurt Devs",
            json.dumps(["🌟 Empleado Autorizado", f"Cargo: {role.title()}"]),
            200
        ))
        user_id = cursor.lastrowid
    conn.commit()
    cursor.execute("SELECT id, username, full_name, email, role, avatar_url, department, badges, points FROM users WHERE id = ?", (user_id,))
    u = dict(cursor.fetchone())
    u["badges"] = json.loads(u["badges"]) if u.get("badges") else []
    conn.close()
    return u

def admin_delete_employee(user_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT email FROM users WHERE id = ?", (user_id,))
    u = cursor.fetchone()
    if u and (u["email"].lower() == ADMIN_EMAIL.lower() or "japon" in u["email"].lower()):
        conn.close()
        return False
    cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
    conn.commit()
    conn.close()
    return True

def register_user(full_name, email, password="", department="Equipo Kunkurt Devs", username=None):
    import urllib.parse
    email = email.strip().lower()
    full_name = full_name.strip()
    if not username or not username.strip():
        username = email.split("@")[0].lower()
    else:
        username = username.strip().lower().replace(" ", "")

    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE LOWER(email) = ? OR LOWER(username) = ?", (email, username))
    existing = cursor.fetchone()
    if existing:
        conn.close()
        return None, "Ya existe un usuario registrado con este correo o nombre de usuario."

    role = "admin" if email == ADMIN_EMAIL.lower() else "employee"
    badge_label = "👑 Administrador Fundador" if role == "admin" else "🌟 Nuevo Integrante"

    cursor.execute("""
        INSERT INTO users (username, full_name, email, role, avatar_url, department, badges, points, password)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    """, (
        username,
        full_name,
        email,
        role,
        f"https://ui-avatars.com/api/?name={urllib.parse.quote(full_name)}&background=8b5cf6&color=fff",
        department or "Equipo Kunkurt Devs",
        json.dumps([badge_label, f"Rol: {role.title()}"]),
        150,
        password or ""
    ))
    user_id = cursor.lastrowid
    conn.commit()
    cursor.execute("SELECT id, username, full_name, email, role, avatar_url, department, badges, points FROM users WHERE id = ?", (user_id,))
    u = dict(cursor.fetchone())
    u["badges"] = json.loads(u["badges"]) if u.get("badges") else []
    conn.close()
    return u, None

def update_user_password(user_id, new_password):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("UPDATE users SET password = ? WHERE id = ?", (new_password, user_id))
    conn.commit()
    conn.close()
    return True

def update_user_role(user_id, new_role):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT email FROM users WHERE id = ?", (user_id,))
    u = cursor.fetchone()
    if not u:
        conn.close()
        return False, "Usuario no encontrado."
    if u["email"].lower() == ADMIN_EMAIL.lower() and new_role != "admin":
        conn.close()
        return False, "No se puede degradar el rol del Administrador Fundador."

    cursor.execute("UPDATE users SET role = ? WHERE id = ?", (new_role, user_id))
    conn.commit()
    conn.close()
    return True, None

def save_smtp_settings(settings_dict):
    conn = get_connection()
    cursor = conn.cursor()
    for k, v in settings_dict.items():
        cursor.execute("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", (k, str(v)))
    conn.commit()
    conn.close()
    return True

def get_smtp_settings():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT key, value FROM settings")
    rows = cursor.fetchall()
    res = {r["key"]: r["value"] for r in rows}
    conn.close()
    return res

# ============================================================================
# TICKETS & SUPPORT DESK MODULE
# ============================================================================

def seed_sample_tickets(conn):
    cursor = conn.cursor()
    sample_tickets = [
        (
            "TCK-1001",
            "Ticket de Prueba: Verificación del Sistema de Soporte & HelpDesk",
            "Ticket de prueba para verificar la creación, seguimiento, comentarios en tiempo real y asignación de incidencias en Kunkurt Devs.",
            "Soporte Técnico",
            "media",
            "abierto",
            None,
            "Plataforma Kunkurt Devs",
            "Equipo Kunkurt",
            "soporte@kunkurt.dev",
            "support",
            None,
            "Sin Asignar",
            None
        )
    ]

    for t in sample_tickets:
        cursor.execute("""
            INSERT INTO tickets (
                ticket_code, title, description, category, priority, status,
                project_id, project_title, author_name, author_email, author_role,
                assigned_id, assigned_name, assigned_email
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        """, t)
        ticket_id = cursor.lastrowid
        cursor.execute("""
            INSERT INTO ticket_comments (ticket_id, user_name, user_email, user_role, user_avatar, content)
            VALUES (?, ?, ?, ?, ?, ?)
        """, (
            ticket_id,
            "Kunkurt System",
            "system@kunkurt.com",
            "admin",
            "https://ui-avatars.com/api/?name=Kunkurt+Bot&background=8b5cf6&color=fff",
            "Ticket registrado en la mesa de ayuda. Nuestro equipo técnico revisará el caso a la brevedad."
        ))

    conn.commit()

def create_ticket(title, description, category, priority, project_id, project_title, author_name, author_email, author_role="cliente", assigned_id=None, assigned_name="Sin Asignar", assigned_email=None):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT MAX(id) FROM tickets")
    max_id = cursor.fetchone()[0] or 1000
    ticket_code = f"TCK-{max_id + 1}"

    # If assigned_id is provided, resolve name and email
    if assigned_id:
        cursor.execute("SELECT full_name, email FROM users WHERE id = ?", (assigned_id,))
        usr = cursor.fetchone()
        if usr:
            assigned_name = usr["full_name"]
            assigned_email = usr["email"]

    cursor.execute("""
        INSERT INTO tickets (
            ticket_code, title, description, category, priority, status,
            project_id, project_title, author_name, author_email, author_role,
            assigned_id, assigned_name, assigned_email, updated_at
        ) VALUES (?, ?, ?, ?, ?, 'abierto', ?, ?, ?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)
    """, (
        ticket_code, title, description, category or "Soporte", priority or "media",
        project_id, project_title or "General", author_name, author_email, author_role or "cliente",
        assigned_id, assigned_name, assigned_email
    ))
    ticket_id = cursor.lastrowid

    # Add initial auto-reply comment
    cursor.execute("""
        INSERT INTO ticket_comments (ticket_id, user_name, user_email, user_role, user_avatar, content)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        ticket_id,
        "Kunkurt HelpDesk",
        "soporte@kunkurt.com",
        "admin",
        "https://ui-avatars.com/api/?name=Kunkurt+HelpDesk&background=8b5cf6&color=fff",
        f"Ticket #{ticket_code} recibido correctamente con prioridad [{priority.upper()}]. Notificación enviada al equipo de desarrollo."
    ))

    # Add system notification
    cursor.execute("""
        INSERT INTO notifications (title, message, type, time_ago, is_read)
        VALUES (?, ?, 'info', 'Hace un momento', 0)
    """, (f"🎫 Nuevo Ticket Abierto #{ticket_code}", f"{author_name} abrió un ticket: '{title}' ({category})"))

    conn.commit()
    conn.close()
    return get_ticket(ticket_id)

def get_tickets(status=None, priority=None, category=None, search=None):
    conn = get_connection()
    cursor = conn.cursor()
    query = """
        SELECT t.*, 
               (SELECT COUNT(*) FROM ticket_comments c WHERE c.ticket_id = t.id) as comments_count
        FROM tickets t
        WHERE 1=1
    """
    params = []

    if status and status != "all":
        query += " AND t.status = ?"
        params.append(status.lower())

    if priority and priority != "all":
        query += " AND t.priority = ?"
        params.append(priority.lower())

    if category and category != "all":
        query += " AND t.category = ?"
        params.append(category)

    if search:
        s = f"%{search.lower()}%"
        query += " AND (LOWER(t.title) LIKE ? OR LOWER(t.description) LIKE ? OR LOWER(t.ticket_code) LIKE ? OR LOWER(t.author_name) LIKE ? OR LOWER(t.assigned_name) LIKE ?)"
        params.extend([s, s, s, s, s])

    query += " ORDER BY CASE t.priority WHEN 'critica' THEN 1 WHEN 'alta' THEN 2 WHEN 'media' THEN 3 ELSE 4 END, t.created_at DESC"

    cursor.execute(query, params)
    rows = cursor.fetchall()
    tickets = [dict(r) for r in rows]
    conn.close()
    return tickets

def get_ticket(ticket_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tickets WHERE id = ? OR ticket_code = ?", (ticket_id, str(ticket_id)))
    row = cursor.fetchone()
    if not row:
        conn.close()
        return None

    ticket = dict(row)
    cursor.execute("SELECT * FROM ticket_comments WHERE ticket_id = ? ORDER BY created_at ASC", (ticket["id"],))
    comments = [dict(c) for c in cursor.fetchall()]
    ticket["comments"] = comments
    conn.close()
    return ticket

def update_ticket_status(ticket_id, new_status, updated_by_name=None):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM tickets WHERE id = ?", (ticket_id,))
    t = cursor.fetchone()
    if not t:
        conn.close()
        return None

    cursor.execute("""
        UPDATE tickets 
        SET status = ?, updated_at = CURRENT_TIMESTAMP 
        WHERE id = ?
    """, (new_status.lower(), ticket_id))

    by_str = f" por {updated_by_name}" if updated_by_name else ""
    cursor.execute("""
        INSERT INTO ticket_comments (ticket_id, user_name, user_email, user_role, user_avatar, content)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        ticket_id,
        updated_by_name or "Kunkurt Bot",
        "soporte@kunkurt.com",
        "system",
        "https://ui-avatars.com/api/?name=Kunkurt&background=8b5cf6&color=fff",
        f"Estado del ticket actualizado a [{new_status.upper()}]{by_str}."
    ))

    cursor.execute("""
        INSERT INTO notifications (title, message, type, time_ago, is_read)
        VALUES (?, ?, 'info', 'Hace un momento', 0)
    """, (f"Ticket #{t['ticket_code']} Actualizado", f"El estado cambió a [{new_status.upper()}]{by_str}."))

    conn.commit()
    conn.close()
    return get_ticket(ticket_id)

def assign_ticket(ticket_id, user_id, assigned_by_name=None):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM users WHERE id = ?", (user_id,))
    u = cursor.fetchone()
    if not u:
        conn.close()
        return None

    cursor.execute("""
        UPDATE tickets
        SET assigned_id = ?, assigned_name = ?, assigned_email = ?, updated_at = CURRENT_TIMESTAMP
        WHERE id = ?
    """, (u["id"], u["full_name"], u["email"], ticket_id))

    cursor.execute("""
        INSERT INTO ticket_comments (ticket_id, user_name, user_email, user_role, user_avatar, content)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (
        ticket_id,
        assigned_by_name or "Kunkurt Lead",
        "soporte@kunkurt.com",
        "admin",
        "https://ui-avatars.com/api/?name=Kunkurt&background=8b5cf6&color=fff",
        f"Ticket asignado a {u['full_name']} [{u['role'].upper()}]."
    ))

    cursor.execute("""
        INSERT INTO notifications (title, message, type, time_ago, is_read)
        VALUES (?, ?, 'info', 'Hace un momento', 0)
    """, (f"Ticket #{ticket_id} Asignado", f"Asignado a {u['full_name']} [{u['role'].upper()}]."))

    conn.commit()
    conn.close()
    return get_ticket(ticket_id)

def add_ticket_comment(ticket_id, user_name, user_email, user_role, content, user_avatar=None):
    conn = get_connection()
    cursor = conn.cursor()
    avatar = user_avatar or f"https://ui-avatars.com/api/?name={urllib.parse.quote(user_name)}&background=8b5cf6&color=fff"
    cursor.execute("""
        INSERT INTO ticket_comments (ticket_id, user_name, user_email, user_role, user_avatar, content)
        VALUES (?, ?, ?, ?, ?, ?)
    """, (ticket_id, user_name, user_email, user_role, avatar, content))
    comment_id = cursor.lastrowid

    cursor.execute("UPDATE tickets SET updated_at = CURRENT_TIMESTAMP WHERE id = ?", (ticket_id,))
    conn.commit()

    cursor.execute("SELECT * FROM ticket_comments WHERE id = ?", (comment_id,))
    c = dict(cursor.fetchone())
    conn.close()
    return c

def get_ticket_stats():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT COUNT(*) FROM tickets")
    total = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM tickets WHERE status = 'abierto'")
    abiertos = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM tickets WHERE status = 'en_progreso'")
    en_progreso = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM tickets WHERE status IN ('resuelto', 'cerrado')")
    resueltos = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM tickets WHERE priority = 'critica' AND status != 'cerrado'")
    criticos = cursor.fetchone()[0]

    conn.close()
    return {
        "total": total,
        "abiertos": abiertos,
        "en_progreso": en_progreso,
        "resueltos": resueltos,
        "criticos": criticos
    }

# ============================================================================
# TEAM CHAT & ANNOUNCEMENTS MODULE
# ============================================================================

def seed_sample_team_messages(conn):
    cursor = conn.cursor()
    sample_msgs = [
        (
            "Alejandro (JaponPLX)",
            ADMIN_EMAIL,
            "admin",
            "https://ui-avatars.com/api/?name=Alejandro+JaponPLX&background=8b5cf6&color=fff",
            "📢 [ANUNCIO OFICIAL] ¡Bienvenidos al panel de operaciones Kunkurt Devs! Todas las actualizaciones de infraestructura, tickets de soporte y cotizaciones ahora se sincronizan en tiempo real.",
            "announcement",
            1
        ),
        (
            "Alejandro (JaponPLX)",
            ADMIN_EMAIL,
            "admin",
            "https://ui-avatars.com/api/?name=Alejandro+JaponPLX&background=8b5cf6&color=fff",
            "🚀 Hemos activado el cotizador inteligente para nuevos clientes y el canal de webhooks para notificaciones automáticas.",
            "chat",
            0
        )
    ]
    for m in sample_msgs:
        cursor.execute("""
            INSERT INTO team_messages (user_name, user_email, user_role, user_avatar, message, message_type, is_pinned)
            VALUES (?, ?, ?, ?, ?, ?, ?)
        """, m)
    conn.commit()

def get_team_messages(limit=60):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT * FROM team_messages
        ORDER BY is_pinned DESC, id ASC
        LIMIT ?
    """, (limit,))
    rows = cursor.fetchall()
    msgs = [dict(r) for r in rows]
    conn.close()
    return msgs

def add_team_message(user_name, user_email, user_role, message, message_type="chat", is_pinned=0, user_avatar=None):
    conn = get_connection()
    cursor = conn.cursor()
    avatar = user_avatar or f"https://ui-avatars.com/api/?name={urllib.parse.quote(user_name)}&background=8b5cf6&color=fff"
    cursor.execute("""
        INSERT INTO team_messages (user_name, user_email, user_role, user_avatar, message, message_type, is_pinned)
        VALUES (?, ?, ?, ?, ?, ?, ?)
    """, (user_name, user_email, user_role, avatar, message, message_type, 1 if is_pinned else 0))
    msg_id = cursor.lastrowid
    conn.commit()

    cursor.execute("SELECT * FROM team_messages WHERE id = ?", (msg_id,))
    msg = dict(cursor.fetchone())
    conn.close()
    return msg

def delete_team_message(message_id):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM team_messages WHERE id = ?", (message_id,))
    conn.commit()
    conn.close()
    return True

# ============================================================================
# KNOWLEDGE BASE / TECHNICAL WIKI MODULE
# ============================================================================

def seed_sample_knowledge_base(conn):
    cursor = conn.cursor()
    sample_articles = [
        (
            "Arquitectura Kunkurt Microservices & RAG",
            "arquitectura-kunkurt-microservices",
            "Arquitectura & Backend",
            "## Visión General de la Arquitectura\n\nEl ecosistema Kunkurt Devs está diseñado bajo una arquitectura modular y reactiva:\n\n1. **Core Backend**: Servidor HTTP en Python puro sin dependencias externas para garantizar 100% portabilidad.\n2. **Persistencia**: SQLite en modo WAL (Write-Ahead Logging) optimizado para transacciones concurrentes de baja latencia.\n3. **Front-End Cyber UI**: HTML5/CSS3/Vanilla JS con diseño Cyber-Violet (`#07040d`, `#8b5cf6`), widgets SVG nativos y Web Audio API.\n4. **Seguridad**: Control de accesos RBAC (Admin, Developer, QA, Lead, Cliente) con hashing SHA-256 y auditoría en login_logs.\n5. **Mesa de Ayuda & HelpDesk**: Sistema integral de tickets enlazado al cotizador interactivo.",
            "Alejandro (JaponPLX)",
            "admin",
            json.dumps(["Arquitectura", "Backend", "Python", "SQLite", "RAG"]),
            14
        ),
        (
            "Manual de Despliegue CI/CD y Túneles Públicos Seguros",
            "manual-despliegue-cicd",
            "DevOps & Cloud",
            "## Guía de Despliegue y Exposición Segura\n\n### 1. Variables de Entorno y Portabilidad\nTodas las rutas deben resolver a través de `config.py` utilizando `Path(__file__).parent.resolve()` para evitar fallos por rutas absolutas.\n\n### 2. Configuración de Túnel SSH (Localhost.run / Cloudflare Tunnel)\nPara exponer el servidor local a internet sin abrir puertos en el router:\n```bash\nssh -R 80:localhost:8000 nokey@localhost.run\n```\n\n### 3. Buenas Prácticas\n- Activar siempre modo WAL en SQLite.\n- Validar el email de destino antes del envío SMTP.\n- Comprobar encabezados de respuesta con CORS y UTF-8.",
            "Alejandro (JaponPLX)",
            "admin",
            json.dumps(["DevOps", "CI/CD", "Cloud", "SSH", "Docker"]),
            9
        ),
        (
            "Estándares de Código, Git Workflow y Convenciones",
            "estandares-codigo-git",
            "Estándares & QA",
            "## Convenciones de Desarrollo Kunkurt\n\n- **Commits**: Seguir Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `perf:`).\n- **Python**: PEP 8 estricto, uso de `urllib.parse` para codificación URL y manejo limpio de excepciones con logs.\n- **JavaScript**: Modularización sin frameworks pesados, renderizado reactivo a través de plantillas de texto e interactividad sin lag.\n- **Estilos**: Variables CSS (`--accent-purple`, `--bg-card`, `--border-color`) para coherencia estética.",
            "Alejandro (JaponPLX)",
            "admin",
            json.dumps(["Git", "CleanCode", "JavaScript", "PEP8"]),
            6
        ),
        (
            "Protocolo de Gestión de Tickets e Incidencias Críticas",
            "protocolo-tickets-incidencias",
            "Operaciones & Soporte",
            "## Matriz de Prioridad en Soporte\n\n- **Crítica (P1)**: Caída de servicio o fallo de seguridad. Tiempo de respuesta objetivo: < 1 hora. Notificación por webhook y correo a administración.\n- **Alta (P2)**: Degradación de rendimiento o fallo en módulos clave. Respuesta objetivo: < 4 horas.\n- **Media (P3)**: Peticiones de clientes o nuevas características. Respuesta: < 24 horas.\n- **Baja (P4)**: Mejoras visuales o sugerencias generales.\n\nTodo ticket resuelto debe contener un comentario de cierre documentando la solución aplicada.",
            "Alejandro (JaponPLX)",
            "admin",
            json.dumps(["HelpDesk", "SLA", "Tickets", "Soporte"]),
            11
        )
    ]

    for a in sample_articles:
        cursor.execute("""
            INSERT INTO knowledge_base (title, slug, category, content, author_name, author_role, tags, views_count)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        """, a)
    conn.commit()

def get_knowledge_articles(category=None, search=None):
    conn = get_connection()
    cursor = conn.cursor()
    query = "SELECT * FROM knowledge_base"
    params = []
    conditions = []

    if category and category != "all":
        conditions.append("category = ?")
        params.append(category)

    if search:
        conditions.append("(title LIKE ? OR content LIKE ? OR tags LIKE ?)")
        s_term = f"%{search}%"
        params.extend([s_term, s_term, s_term])

    if conditions:
        query += " WHERE " + " AND ".join(conditions)

    query += " ORDER BY updated_at DESC"
    cursor.execute(query, params)
    rows = cursor.fetchall()
    articles = []
    for r in rows:
        d = dict(r)
        try:
            d["tags"] = json.loads(d["tags"])
        except Exception:
            d["tags"] = []
        articles.append(d)
    conn.close()
    return articles

def get_knowledge_article(article_id_or_slug):
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("""
        SELECT * FROM knowledge_base
        WHERE id = ? OR slug = ?
    """, (article_id_or_slug, str(article_id_or_slug)))
    row = cursor.fetchone()
    if not row:
        conn.close()
        return None

    article = dict(row)
    try:
        article["tags"] = json.loads(article["tags"])
    except Exception:
        article["tags"] = []

    # Increment view counter
    cursor.execute("UPDATE knowledge_base SET views_count = views_count + 1 WHERE id = ?", (article["id"],))
    conn.commit()
    conn.close()
    return article

def create_knowledge_article(title, content, category, author_name, author_role, tags=None):
    conn = get_connection()
    cursor = conn.cursor()
    import re
    slug = re.sub(r'[^a-zA-Z0-9]+', '-', title.lower()).strip('-')
    if not slug:
        slug = f"article-{int(datetime.now().timestamp())}"
    
    # Check slug collision
    cursor.execute("SELECT id FROM knowledge_base WHERE slug = ?", (slug,))
    if cursor.fetchone():
        slug = f"{slug}-{int(datetime.now().timestamp())}"

    tags_json = json.dumps(tags or ["General"])
    cursor.execute("""
        INSERT INTO knowledge_base (title, slug, category, content, author_name, author_role, tags, views_count)
        VALUES (?, ?, ?, ?, ?, ?, ?, 0)
    """, (title, slug, category or "General", content, author_name, author_role or "developer", tags_json))
    art_id = cursor.lastrowid
    conn.commit()
    conn.close()
    return get_knowledge_article(art_id)

# ============================================================================
# ADVANCED ANALYTICS & METRICS MODULE
# ============================================================================

def get_advanced_analytics():
    conn = get_connection()
    cursor = conn.cursor()

    # Total counts
    cursor.execute("SELECT COUNT(*) FROM projects")
    total_projects = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM users")
    total_users = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM tickets")
    total_tickets = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM team_messages")
    total_messages = cursor.fetchone()[0]

    cursor.execute("SELECT COUNT(*) FROM knowledge_base")
    total_articles = cursor.fetchone()[0]

    cursor.execute("SELECT SUM(likes_count) FROM projects")
    total_likes = cursor.fetchone()[0] or 0

    # Tech stack breakdown from projects
    cursor.execute("SELECT tech_stack FROM projects")
    tech_counter = {}
    for r in cursor.fetchall():
        try:
            val = r[0]
            if val.startswith('['):
                items = json.loads(val)
            else:
                items = [x.strip() for x in val.split(',') if x.strip()]
            for item in items:
                tech = item.strip()
                if tech:
                    tech_counter[tech] = tech_counter.get(tech, 0) + 1
        except Exception:
            pass

    sorted_tech = sorted(tech_counter.items(), key=lambda x: x[1], reverse=True)[:8]

    # Tickets by status
    cursor.execute("SELECT status, COUNT(*) FROM tickets GROUP BY status")
    tickets_by_status = dict(cursor.fetchall())

    # Tickets by priority
    cursor.execute("SELECT priority, COUNT(*) FROM tickets GROUP BY priority")
    tickets_by_priority = dict(cursor.fetchall())

    # Projects by category
    cursor.execute("SELECT category, COUNT(*) FROM projects GROUP BY category")
    projects_by_category = dict(cursor.fetchall())

    # Users by role
    cursor.execute("SELECT role, COUNT(*) FROM users GROUP BY role")
    users_by_role = dict(cursor.fetchall())

    # Top viewed knowledge base articles
    cursor.execute("SELECT title, views_count, category FROM knowledge_base ORDER BY views_count DESC LIMIT 5")
    top_articles = [dict(r) for r in cursor.fetchall()]

    conn.close()

    return {
        "totals": {
            "projects": total_projects,
            "users": total_users,
            "tickets": total_tickets,
            "messages": total_messages,
            "articles": total_articles,
            "likes": total_likes
        },
        "tech_stack": sorted_tech,
        "tickets_by_status": tickets_by_status,
        "tickets_by_priority": tickets_by_priority,
        "projects_by_category": projects_by_category,
        "users_by_role": users_by_role,
        "top_articles": top_articles
    }

# ============================================================================
# WEBHOOK SETTINGS MODULE
# ============================================================================

def get_webhook_settings():
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT key, value FROM settings WHERE key LIKE 'webhook_%'")
    rows = cursor.fetchall()
    settings = {r["key"]: r["value"] for r in rows}
    conn.close()
    return {
        "discord_url": settings.get("webhook_discord_url", ""),
        "telegram_token": settings.get("webhook_telegram_token", ""),
        "telegram_chat_id": settings.get("webhook_telegram_chat_id", ""),
        "enabled": settings.get("webhook_enabled", "false") == "true",
        "notify_on_ticket": settings.get("webhook_notify_ticket", "true") == "true",
        "notify_on_login": settings.get("webhook_notify_login", "true") == "true",
        "notify_on_quote": settings.get("webhook_notify_quote", "true") == "true"
    }

def save_webhook_settings(settings_dict):
    conn = get_connection()
    cursor = conn.cursor()
    mapping = {
        "webhook_discord_url": settings_dict.get("discord_url", ""),
        "webhook_telegram_token": settings_dict.get("telegram_token", ""),
        "webhook_telegram_chat_id": settings_dict.get("telegram_chat_id", ""),
        "webhook_enabled": "true" if settings_dict.get("enabled") else "false",
        "webhook_notify_ticket": "true" if settings_dict.get("notify_on_ticket", True) else "false",
        "webhook_notify_login": "true" if settings_dict.get("notify_on_login", True) else "false",
        "webhook_notify_quote": "true" if settings_dict.get("notify_on_quote", True) else "false"
    }
    for k, v in mapping.items():
        cursor.execute("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)", (k, str(v)))
    conn.commit()
    conn.close()
    return get_webhook_settings()




