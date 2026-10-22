"""
Kunkurt Devs - Database Module with GitHub Sync, Authentication Logs & Public Showcase
"""

import sqlite3
import json
import os
from datetime import datetime

DB_PATH = os.path.join(os.path.dirname(__file__), "kunkurt.db")

def get_connection():
    conn = sqlite3.connect(DB_PATH)
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
    users = [
        (
            "japonplx",
            "JaponPLX (Alejandro)",
            "alejandrobelno964@gmail.com",
            "admin",
            "https://avatars.githubusercontent.com/u/171938813?v=4",
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

def find_user_by_email(email):
    if not email:
        return None
    conn = get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, username, full_name, email, role, avatar_url, department, badges, points FROM users WHERE LOWER(email) = LOWER(?)", (email.strip(),))
    row = cursor.fetchone()
    conn.close()
    if row:
        u = dict(row)
        u["badges"] = json.loads(u["badges"]) if u.get("badges") else []
        return u
    return None

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
    if u and "japon" in u["email"].lower():
        conn.close()
        return False
    cursor.execute("DELETE FROM users WHERE id = ?", (user_id,))
    conn.commit()
    conn.close()
    return True


