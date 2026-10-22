# ⚡ Kunkurt Devs — Plataforma Innovadora de Proyectos & Colaboración

Plataforma corporativa y portal de ingeniería para la empresa **Kunkurt**, diseñada con una estética futurista **Cyber-Violet / Dark Neon** (morado neón, glassmorphism, orbes ambientales flotantes y microinteracciones de alta gama) y un sistema dinámico de roles de acceso.

---

## 🚀 Cómo Iniciar la Plataforma

Para ejecutar la aplicación localmente, solo necesitas ejecutar:

```bash
python3 server.py
# o usando el script directo:
./start.sh
```

Luego abre en tu navegador web:
👉 **[http://localhost:8080](http://localhost:8080)**

> *Nota: Funciona de forma 100% nativa con la librería estándar de Python y SQLite, sin requerir instalar paquetes externos.*

---

## 👥 Sistema de Roles Integrado

En la barra de navegación superior encontrarás un **selector de roles y portal de empleados**:

| Rol | Usuario Encargado | Permisos & Capacidades |
|---|---|---|
| 👑 **Administrador Fundador** | **JaponPLX (Alejandro)** | Control total de la plataforma, dar de alta y autorizar a nuevos empleados, asignación de roles específicos, auditoría de accesos y métricas globales. |
| 💻 **Desarrollador** | **Personal Asignado por Admin** | Subir nuevos proyectos, sincronizar repositorios de GitHub, configurar stack tecnológico, gestionar tareas y versiones técnicas. |
| 🎯 **Control de Calidad (QA)** | **Personal Asignado por Admin** | Auditoría y testing de proyectos, reporte y verificación de bugs, aprobación de despliegues. |
| 🎨 **Diseñador UI/UX** | **Personal Asignado por Admin** | Subir capturas y mockups de interfaces, feedback estético y experiencia digital. |
| 📊 **Project Manager** | **Personal Asignado por Admin** | Gestión de tablero Kanban, asignación de tareas a colaboradores y control de sprints. |
| 👥 **Empleado / Colaborador** | **Personal Asignado por Admin** | Participar en discusiones técnicas, dar votos/likes y consultar la documentación interna. |
| 🌐 **Público (Clientes)** | **Visitante Externo** | Vista limpia tipo portafolio corporativo donde solo se muestran los proyectos públicos autorizados para clientes de Kunkurt. |

---

## 🎨 Características de la Interfaz Innovadora (Cyber-Violet)

1. **Estética Visual Distintiva:**
   - Paleta de colores profunda: morados oscuros (`#07040d`, `#120824`), violeta neón brillante (`#a855f7`, `#8b5cf6`) y acentos fucsia/cian.
   - Efecto **Glassmorphism** translúcido con desenfoque de fondo y bordes iluminados con resplandor (*neon glow*).
   - Fondos animados con orbes flotantes y cuadrícula sutil de datos.

2. **Subida Interactiva de Proyectos:**
   - Selector visual de etiquetas de tecnologías populares (Python, FastAPI, React, Docker, Kubernetes, Rust, Go, PyTorch, etc.) más entrada de tags personalizados.
   - Zona de arrastre (*drag & drop*) de imágenes y capturas de pantalla con previsualización inmediata.
   - Indicador de ciclo de vida con LEDs pulsantes según el estado del proyecto.

3. **Zona de Colaboración:**
   - Panel de comentarios y retroalimentación para cada proyecto con categorización de aportes por rol y tipo.

4. **Búsqueda & Filtros en Tiempo Real:**
   - Filtrado instantáneo por áreas técnicas (Inteligencia Artificial, Ciberseguridad, Fintech, Cloud & DevOps, Talento).
   - Filtrado por estado de despliegue y buscador con autocompletado reactivo.

---

## 📁 Estructura del Proyecto

```
kunkurt devs/
├── server.py              # Servidor multihilo HTTP y API REST (Python Standard Library)
├── database.py            # Esquema SQLite, migraciones, semillas y funciones CRUD
├── kunkurt.db             # Base de datos SQLite local (persistente)
├── start.sh               # Script de inicio rápido
├── static/
│   ├── index.html         # Interfaz web futurista y responsiva
│   ├── css/
│   │   └── style.css      # Estilos personalizados Cyber-Violet, glassmorphism y orbes
│   └── js/
│       └── app.js         # Lógica reactiva SPA, gestión de roles y eventos
└── uploads/               # Directorio para capturas y archivos subidos
```
