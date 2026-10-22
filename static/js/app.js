/**
 * Kunkurt Devs - Enterprise Application Engine
 * With Hybrid Online (REST API) & Offline (Direct File / LocalStorage) Support.
 * Connects directly to JaponPLX GitHub Repositories.
 */

// Verified founding profiles (CERO personas falsas - Solo el Administrador Real)
const PROFILES = {
  admin: {
    id: 1,
    username: "japonplx",
    name: "JaponPLX (Alejandro)",
    email: "alejandrobelno964@gmail.com",
    role: "admin",
    roleName: "Administrador Fundador & Lead",
    department: "Dirección General & Arquitectura",
    avatar: "https://avatars.githubusercontent.com/u/171938813?v=4",
    badgeClass: "from-fuchsia-500 to-purple-600"
  },
  developer: {
    id: 1,
    username: "japonplx",
    name: "JaponPLX (Alejandro)",
    email: "alejandrobelno964@gmail.com",
    role: "developer",
    roleName: "Desarrollador Lead & Arquitecto",
    department: "Lead Software Engineering",
    avatar: "https://avatars.githubusercontent.com/u/171938813?v=4",
    badgeClass: "from-violet-500 to-indigo-600"
  },
  public: {
    id: 0,
    username: "guest",
    name: "Visitante Externo",
    email: "cliente@kunkurt.com",
    role: "public",
    roleName: "Vista Portafolio Cliente",
    department: "Clientes y Aliados",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    badgeClass: "from-slate-600 to-slate-700"
  }
};

// Default Real Repositories from GitHub JaponPLX
const DEFAULT_PROJECTS = [
  {
    id: 1,
    title: "Acelerador de Integraciones B2B (NoCountry)",
    slug: "acelerador-de-integraciones-b2b",
    summary: "Plataforma inteligente y catálogo interactivo de tecnologías open source con Asistente Consultor RAG y generador IaC.",
    description: "Acelerador de Integraciones Open Source (B2B) desarrollado en la simulación laboral de NoCountry.\n\nIncluye catálogo interactivo de tecnologías open source curadas con Asistente Consultor de Arquitectura mediante RAG (Retrieval-Augmented Generation), pipeline de ingesta automática con GitHub API v3, generador de infraestructura como código (docker-compose y Dockerfile) y scripts de tunelización para despliegues remotos en Render.",
    category: "Inteligencia Artificial",
    tech_stack: ["Python", "FastAPI", "Docker", "RAG", "GitHub API", "Render", "Vector DB"],
    status: "production",
    github_url: "https://github.com/JaponPLX/b2b",
    demo_url: "https://github.com/JaponPLX/b2b",
    image_url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900&auto=format&fit=crop&q=80",
    is_public: 1,
    featured: 1,
    author_name: "JaponPLX (Alejandro)",
    author_role: "developer",
    likes_count: 54,
    tasks: [
      { id: 101, title: "Pipeline de ingesta continua con GitHub API v3", assignee: "JaponPLX (Alejandro)", status: "done", priority: "urgent" },
      { id: 102, title: "Generador de infraestructura como código (docker-compose)", assignee: "JaponPLX (Alejandro)", status: "done", priority: "high" },
      { id: 103, title: "Consultor de arquitectura con RAG y embeddings semánticos", assignee: "JaponPLX (Alejandro)", status: "in_progress", priority: "urgent" },
      { id: 104, title: "Configuración de túneles públicos en Render con public_tunnel.sh", assignee: "JaponPLX (Alejandro)", status: "done", priority: "medium" }
    ],
    changelogs: [
      { version: "v1.2.0", release_date: "Octubre 2026", title: "Integración de Asistente RAG & Pipeline GitHub", notes: "• Consulta inteligente de arquitecturas mediante RAG\n• Pipeline automático de ingesta con GitHub API v3\n• Contenerización con Docker y Docker Compose" }
    ],
    comments: [
      { user_name: "JaponPLX (Alejandro)", user_role: "admin", content: "Arquitectura validada y probada en producción con FastAPI y RAG.", feedback_type: "kudos" }
    ]
  },
  {
    id: 2,
    title: "CVFlow — SaaS de Automatización de CVs",
    slug: "cvflow-saas-automatizacion-cvs",
    summary: "SaaS corporativo: sube hojas de vida, conviértelas en perfiles estructurados, estandariza con branding y rankea candidatos.",
    description: "Base funcional (MVP SaaS) para empresas y departamentos de talento humano.\n\nPermite subir CVs en múltiples formatos, procesarlos y convertirlos en perfiles normalizados (JSON/SQLite), generar CVs estandarizados con la marca y estilo corporativo del cliente, y clasificar algorítmicamente a los candidatos comparándolos contra los requerimientos de vacantes activas.\n\nContenerizado con Docker y configurado con Cloudflare Tunnels para conectividad remota segura.",
    category: "Recursos Humanos & Ops",
    tech_stack: ["Python", "FastAPI", "SQLite", "Docker", "Cloudflare", "Uvicorn", "TailwindCSS"],
    status: "production",
    github_url: "https://github.com/JaponPLX/cvflow",
    demo_url: "https://github.com/JaponPLX/cvflow",
    image_url: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?w=900&auto=format&fit=crop&q=80",
    is_public: 1,
    featured: 1,
    author_name: "JaponPLX (Alejandro)",
    author_role: "developer",
    likes_count: 47,
    tasks: [
      { id: 201, title: "Motor de parsing y extracción estructurada de CVs", assignee: "JaponPLX (Alejandro)", status: "done", priority: "urgent" },
      { id: 202, title: "Algoritmo de scoring y matching candidato vs vacante", assignee: "JaponPLX (Alejandro)", status: "done", priority: "high" },
      { id: 203, title: "Integración de Cloudflare Tunnels para despliegue remoto seguro", assignee: "JaponPLX (Alejandro)", status: "done", priority: "high" }
    ],
    changelogs: [
      { version: "v1.0.0", release_date: "Octubre 2026", title: "Lanzamiento MVP CVFlow", notes: "• Extracción y normalización de perfiles en SQLite\n• Scoring de candidatos contra vacantes\n• Contenedor Docker listo y Cloudflare Tunnels" }
    ],
    comments: [
      { user_name: "JaponPLX (Alejandro)", user_role: "admin", content: "MVP funcional listo para procesar hojas de vida con Cloudflare Tunnels.", feedback_type: "general" }
    ]
  },
  {
    id: 3,
    title: "Hola UI — Responsive Design System",
    slug: "hola-ui-responsive-design",
    summary: "Prototipo interactivo de interfaz web y experimentación de estilos responsivos con CSS3 moderno.",
    description: "Laboratorio interactivo de interfaz frontend y experimentación de estilos visuales modernos con CSS3 y HTML5.\n\nEstructuración modular de selectores, diseño responsivo adaptativo (Flexbox y Grid), paleta de colores y patrones de componentes visuales para páginas web de alto rendimiento.",
    category: "Web & Mobile",
    tech_stack: ["HTML5", "CSS3", "Responsive Design", "Flexbox"],
    status: "development",
    github_url: "https://github.com/JaponPLX/hola",
    demo_url: "https://github.com/JaponPLX/hola",
    image_url: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?w=900&auto=format&fit=crop&q=80",
    is_public: 1,
    featured: 0,
    author_name: "JaponPLX (Alejandro)",
    author_role: "developer",
    likes_count: 23,
    tasks: [
      { id: 301, title: "Optimizar Flexbox y maquetación responsiva móvil", assignee: "JaponPLX (Alejandro)", status: "done", priority: "medium" },
      { id: 302, title: "Implementar animaciones con keyframes en style.css", assignee: "JaponPLX (Alejandro)", status: "in_progress", priority: "low" }
    ],
    changelogs: [],
    comments: []
  },
  {
    id: 4,
    title: "WD4E Web Design & Layout Suite",
    slug: "wd4e-web-design-layout-suite",
    summary: "Suite de componentes web interactivos, modelos de visualización y aplicación de layouts avanzados con CSS3.",
    description: "Suite técnica de diseño web y desarrollo de maquetaciones avanzadas.\n\nContiene implementaciones profundas de CSS Box Model, layouts con display properties, pseudo-clases dinámicas y buenas prácticas de arquitectura frontend para proyectos escalables.",
    category: "Web & Mobile",
    tech_stack: ["HTML5", "CSS3", "JavaScript", "Layouts", "Git"],
    status: "production",
    github_url: "https://github.com/JaponPLX/WD4E-Intro_to_CSS3",
    demo_url: "https://github.com/JaponPLX/WD4E-Intro_to_CSS3",
    image_url: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=900&auto=format&fit=crop&q=80",
    is_public: 1,
    featured: 0,
    author_name: "JaponPLX (Alejandro)",
    author_role: "developer",
    likes_count: 31,
    tasks: [
      { id: 401, title: "Revisión de selectores y reglas de especificidad CSS3", assignee: "JaponPLX (Alejandro)", status: "done", priority: "medium" }
    ],
    changelogs: [],
    comments: []
  }
];

const DEFAULT_USERS = [
  { full_name: "JaponPLX (Alejandro)", role: "admin", points: 1000, avatar_url: "https://avatars.githubusercontent.com/u/171938813?v=4", department: "Dirección General & Arquitectura", badges: ["👑 Administrador Fundador", "⚡ Lead Developer", "GitHub Master"] }
];

const DEFAULT_NOTIFICATIONS = [
  { title: "🚀 Repositorios Sincronizados", message: "Se sincronizaron con éxito los repositorios reales de JaponPLX en Kunkurt.", time_ago: "Hace unos momentos", is_read: 0 },
  { title: "⭐ Plataforma Kunkurt Activa", message: "Catálogo oficial listo con seguridad y roles por el Administrador.", time_ago: "Hace 5 min", is_read: 0 }
];

let currentRole = "admin";
let activeProfile = PROFILES[currentRole];
let allProjects = [];
let currentCategory = "all";
let currentStatus = "all";
let currentSearch = "";
let selectedTechTags = new Set(["Python", "FastAPI", "Docker", "RAG"]);
let currentDetailProject = null;
let uploadedImageUrl = "";
let pitchDeckCurrentIndex = 0;
let matrixActive = false;

// DOM Ready
document.addEventListener("DOMContentLoaded", () => {
  setupRoleSwitcher();
  setupEventListeners();
  loadStats();
  loadProjects();
  loadNotifications();
  loadAuthorizedEmployees();
  initTechTagPills();
  setupTerminal();
  setupKeyboardShortcuts();
});

// Setup Role Switcher & Persistent Sessions
function setupRoleSwitcher() {
  const savedRole = localStorage.getItem("kunkurt_active_role");
  const savedProfile = localStorage.getItem("kunkurt_active_profile");
  if (savedRole && PROFILES[savedRole]) {
    currentRole = savedRole;
    activeProfile = PROFILES[savedRole];
  }
  if (savedProfile) {
    try {
      const parsed = JSON.parse(savedProfile);
      if (parsed && parsed.role) {
        currentRole = parsed.role;
        activeProfile = { ...(PROFILES[parsed.role] || {}), ...parsed };
        PROFILES[parsed.role] = activeProfile;
      }
    } catch (e) {}
  }

  const roleSelect = document.getElementById("roleSelect");
  if (!roleSelect) return;
  roleSelect.value = currentRole;
  updateRoleUI();

  roleSelect.addEventListener("change", (e) => {
    switchRole(e.target.value);
  });
}

function switchRole(newRole) {
  if (!PROFILES[newRole]) return;
  currentRole = newRole;
  activeProfile = PROFILES[newRole];

  localStorage.setItem("kunkurt_active_role", newRole);
  localStorage.setItem("kunkurt_active_profile", JSON.stringify(activeProfile));

  const roleSelect = document.getElementById("roleSelect");
  if (roleSelect) roleSelect.value = newRole;

  updateRoleUI();
  loadProjects();
  showToast(`Rol activo: ${activeProfile.roleName} (${activeProfile.name})`, "info");
}

function updateRoleUI() {
  const userAvatar = document.getElementById("currentUserAvatar");
  const userName = document.getElementById("currentUserName");
  const userRoleBadge = document.getElementById("currentUserRoleBadge");
  const uploadBtnContainer = document.getElementById("uploadBtnContainer");
  const publicBanner = document.getElementById("publicBanner");

  if (userAvatar) userAvatar.src = activeProfile.avatar;
  if (userName) userName.textContent = activeProfile.name;
  if (userRoleBadge) {
    userRoleBadge.textContent = activeProfile.roleName;
    userRoleBadge.className = `text-[10px] font-semibold px-2 py-0.5 rounded-full text-white bg-gradient-to-r ${activeProfile.badgeClass}`;
  }

  // Upload is permitted for developers, admins, and UI/UX designers
  const canUpload = currentRole === "developer" || currentRole === "admin" || currentRole === "designer";
  if (uploadBtnContainer) uploadBtnContainer.style.display = canUpload ? "block" : "none";
  if (publicBanner) publicBanner.style.display = currentRole === "public" ? "block" : "none";

  // Only Administrator can view the employee registration panel button
  const adminBtn = document.getElementById("navAdminEmployeesBtn");
  if (adminBtn) adminBtn.style.display = currentRole === "admin" ? "inline-flex" : "none";
}

// Global Event Listeners
function setupEventListeners() {
  const catButtons = document.querySelectorAll(".filter-cat-btn");
  catButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      catButtons.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      currentCategory = btn.dataset.category;
      loadProjects();
    });
  });

  const statusFilter = document.getElementById("statusFilter");
  if (statusFilter) {
    statusFilter.addEventListener("change", (e) => {
      currentStatus = e.target.value;
      loadProjects();
    });
  }

  const searchInput = document.getElementById("searchInput");
  let searchTimeout = null;
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      clearTimeout(searchTimeout);
      searchTimeout = setTimeout(() => {
        currentSearch = e.target.value.trim();
        loadProjects();
      }, 200);
    });
  }

  const imageInput = document.getElementById("projectImageInput");
  const imageDropZone = document.getElementById("imageDropZone");
  if (imageInput) {
    imageInput.addEventListener("change", (e) => {
      if (e.target.files[0]) handleImageFile(e.target.files[0]);
    });
  }
  if (imageDropZone) {
    imageDropZone.addEventListener("dragover", (e) => { e.preventDefault(); imageDropZone.classList.add("border-purple-400"); });
    imageDropZone.addEventListener("dragleave", () => { imageDropZone.classList.remove("border-purple-400"); });
    imageDropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      imageDropZone.classList.remove("border-purple-400");
      if (e.dataTransfer.files.length) handleImageFile(e.dataTransfer.files[0]);
    });
  }

  const projectForm = document.getElementById("projectForm");
  if (projectForm) projectForm.addEventListener("submit", handleCreateProject);

  const commentForm = document.getElementById("commentForm");
  if (commentForm) commentForm.addEventListener("submit", handleAddComment);

  const taskForm = document.getElementById("newTaskForm");
  if (taskForm) taskForm.addEventListener("submit", handleAddTask);

  const authLoginForm = document.getElementById("authLoginForm");
  if (authLoginForm) authLoginForm.addEventListener("submit", handleLoginSubmit);

  const createEmpForm = document.getElementById("createEmployeeForm");
  if (createEmpForm) createEmpForm.addEventListener("submit", handleCreateEmployee);
}

function setupKeyboardShortcuts() {
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      toggleTerminal();
    }
    if (e.key === "Escape") {
      closeUploadModal();
      closeDetailModal();
      closeTerminal();
      closeHallOfFame();
      closePitchDeck();
      closeNotificationsDropdown();
      closeGithubSyncModal();
      closeLoginModal();
      closeShareModal();
      closeEmployeeAdminModal();
    }
    const pitchModal = document.getElementById("pitchDeckModal");
    if (pitchModal && !pitchModal.classList.contains("hidden")) {
      if (e.key === "ArrowRight") nextPitchSlide();
      if (e.key === "ArrowLeft") prevPitchSlide();
    }
  });
}

function handleImageFile(file) {
  if (!file.type.startsWith("image/")) {
    showToast("Selecciona una imagen válida", "error");
    return;
  }
  const reader = new FileReader();
  reader.onload = async (e) => {
    const base64 = e.target.result;
    uploadedImageUrl = base64;
    const preview = document.getElementById("imagePreview");
    const container = document.getElementById("imagePreviewContainer");
    const dropzone = document.getElementById("imageDropZone");
    if (preview) preview.src = base64;
    if (container) container.classList.remove("hidden");
    if (dropzone) dropzone.classList.add("hidden");

    if (window.location.protocol.startsWith("http")) {
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ image_base64: base64 })
        });
        const data = await res.json();
        if (data.success) uploadedImageUrl = data.url;
      } catch {}
    }
  };
  reader.readAsDataURL(file);
}

function removeImagePreview() {
  uploadedImageUrl = "";
  const container = document.getElementById("imagePreviewContainer");
  const dropzone = document.getElementById("imageDropZone");
  const input = document.getElementById("projectImageInput");
  if (container) container.classList.add("hidden");
  if (dropzone) dropzone.classList.remove("hidden");
  if (input) input.value = "";
}

// Popular tech tags
const POPULAR_TAGS = ["Python", "FastAPI", "Docker", "RAG", "GitHub API", "React", "TypeScript", "SQLite", "Cloudflare", "HTML5", "CSS3"];
function initTechTagPills() {
  const container = document.getElementById("popularTagsContainer");
  if (!container) return;
  container.innerHTML = "";
  POPULAR_TAGS.forEach(tag => {
    const isSelected = selectedTechTags.has(tag);
    const pill = document.createElement("button");
    pill.type = "button";
    pill.className = `px-3 py-1 rounded-full text-xs font-mono transition-all border ${
      isSelected ? "bg-purple-600/40 text-purple-200 border-purple-400 shadow-[0_0_10px_rgba(168,85,247,0.4)]" : "bg-purple-950/20 text-purple-400/80 border-purple-900/40 hover:border-purple-600/50"
    }`;
    pill.textContent = (isSelected ? "✓ " : "+ ") + tag;
    pill.onclick = () => {
      if (selectedTechTags.has(tag)) selectedTechTags.delete(tag);
      else selectedTechTags.add(tag);
      initTechTagPills();
    };
    container.appendChild(pill);
  });
}

function addCustomTechTag() {
  const input = document.getElementById("customTagInput");
  if (!input) return;
  const val = input.value.trim();
  if (val && !selectedTechTags.has(val)) {
    selectedTechTags.add(val);
    input.value = "";
    initTechTagPills();
  }
}

// Load stats with auto fallback
async function loadStats() {
  try {
    if (window.location.protocol.startsWith("http")) {
      const res = await fetch("/api/stats");
      const data = await res.json();
      if (data.success) {
        animateCounter("statTotalProjects", data.stats.total_projects);
        animateCounter("statProdProjects", data.stats.production_projects);
        animateCounter("statDevProjects", data.stats.dev_projects);
        animateCounter("statUsers", data.stats.total_users);
        return;
      }
    }
  } catch {}

  // Offline stats calculation
  const total = allProjects.length || DEFAULT_PROJECTS.length;
  const prod = (allProjects.length ? allProjects : DEFAULT_PROJECTS).filter(p => p.status === "production").length;
  const dev = (allProjects.length ? allProjects : DEFAULT_PROJECTS).filter(p => p.status === "development").length;
  animateCounter("statTotalProjects", total);
  animateCounter("statProdProjects", prod);
  animateCounter("statDevProjects", dev);
  animateCounter("statUsers", DEFAULT_USERS.length);
}

function animateCounter(id, target) {
  const el = document.getElementById(id);
  if (!el) return;
  let current = 0;
  const step = Math.max(1, Math.ceil(target / 12));
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = current;
    }
  }, 25);
}

// Load projects with hybrid online/offline fallback
async function loadProjects() {
  const grid = document.getElementById("projectsGrid");
  const emptyState = document.getElementById("emptyState");
  if (!grid) return;

  let loaded = null;

  // Try fetching from server if running over HTTP
  if (window.location.protocol.startsWith("http")) {
    try {
      const isPublicOnly = currentRole === "public" ? 1 : 0;
      const url = new URL("/api/projects", window.location.origin);
      url.searchParams.set("public_only", isPublicOnly);
      if (currentCategory !== "all") url.searchParams.set("category", currentCategory);
      if (currentStatus !== "all") url.searchParams.set("status", currentStatus);
      if (currentSearch) url.searchParams.set("search", currentSearch);

      const res = await fetch(url);
      const data = await res.json();
      if (data.success && data.projects.length) {
        loaded = data.projects;
      }
    } catch {}
  }

  // Fallback to local data (allows opening directly with double click)
  if (!loaded) {
    let list = JSON.parse(localStorage.getItem("kunkurt_projects")) || DEFAULT_PROJECTS;
    if (currentRole === "public") list = list.filter(p => p.is_public);
    if (currentCategory !== "all") list = list.filter(p => p.category === currentCategory);
    if (currentStatus !== "all") list = list.filter(p => p.status === currentStatus);
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      list = list.filter(p => p.title.toLowerCase().includes(q) || p.summary.toLowerCase().includes(q) || p.tech_stack.some(t => t.toLowerCase().includes(q)));
    }
    loaded = list;
  }

  allProjects = loaded;
  renderProjects(allProjects);
}

function renderProjects(projects) {
  const grid = document.getElementById("projectsGrid");
  const emptyState = document.getElementById("emptyState");
  if (!grid) return;

  if (projects.length === 0) {
    grid.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");
  grid.innerHTML = "";
  projects.forEach(project => {
    grid.appendChild(createProjectCard(project));
  });
}

function createProjectCard(p) {
  const card = document.createElement("div");
  card.className = "glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group relative border border-purple-900/40 hover:border-purple-500/60 transition-all duration-300";

  const statusMap = {
    production: { text: "Producción", class: "status-production" },
    development: { text: "En Desarrollo", class: "status-development" },
    testing: { text: "En Pruebas", class: "status-testing" },
    planning: { text: "Planeación", class: "status-planning" }
  };
  const statusInfo = statusMap[p.status] || { text: p.status, class: "status-planning" };

  const techPills = p.tech_stack.slice(0, 4).map(t => `<span class="tech-pill">${t}</span>`).join("");
  const extraCount = p.tech_stack.length > 4 ? `<span class="tech-pill">+${p.tech_stack.length - 4}</span>` : "";

  const isAdmin = currentRole === "admin";
  const deleteBtnHtml = isAdmin ? `
    <button onclick="event.stopPropagation(); deleteProject(${p.id}, '${p.title.replace(/'/g, "\\'")}')" 
      class="p-1.5 rounded-lg bg-red-950/60 border border-red-500/30 text-red-400 hover:bg-red-900/80 transition-colors"
      title="Eliminar proyecto (Admin)">
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg>
    </button>
  ` : "";

  card.innerHTML = `
    <!-- Card Media & Overlay -->
    <div class="relative h-48 w-full overflow-hidden bg-purple-950/40">
      <img src="${p.image_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900'}" 
           alt="${p.title}" 
           class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out">
      <div class="absolute inset-0 bg-gradient-to-t from-[#07040d] via-[#07040d]/40 to-transparent"></div>
      
      <!-- Top Badges -->
      <div class="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
        <span class="badge-status ${statusInfo.class}">
          <span class="pulse-dot"></span>
          ${statusInfo.text}
        </span>
        
        <div class="flex items-center gap-1.5">
          ${p.is_public ? '<span class="px-2 py-0.5 rounded-full text-[10px] bg-purple-950/80 text-purple-300 border border-purple-500/40 font-mono">Público</span>' : '<span class="px-2 py-0.5 rounded-full text-[10px] bg-amber-950/80 text-amber-300 border border-amber-500/40 font-mono">Interno</span>'}
          ${deleteBtnHtml}
        </div>
      </div>

      <!-- Category Tag -->
      <div class="absolute bottom-3 left-3 z-10">
        <span class="text-xs uppercase tracking-wider font-semibold text-purple-300/90 bg-purple-950/80 px-2.5 py-1 rounded-md border border-purple-500/30">
          ${p.category}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 flex-1 flex flex-col justify-between">
      <div>
        <h3 class="text-lg font-bold text-white group-hover:text-purple-300 transition-colors line-clamp-1 mb-2">
          ${p.title}
        </h3>
        <p class="text-sm text-purple-200/70 line-clamp-2 leading-relaxed mb-4">
          ${p.summary}
        </p>
      </div>

      <!-- Tech Stack -->
      <div class="mb-4">
        <div class="flex flex-wrap gap-1.5">
          ${techPills}
          ${extraCount}
        </div>
      </div>

      <!-- Footer Info -->
      <div class="pt-4 border-t border-purple-900/30 flex items-center justify-between text-xs text-purple-300/80">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-purple-600 to-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">
            ${p.author_name.charAt(0)}
          </div>
          <span class="truncate max-w-[120px] font-medium">${p.author_name}</span>
        </div>

        <div class="flex items-center gap-3">
          <!-- Like button -->
          <button onclick="event.stopPropagation(); handleToggleLike(${p.id}, this)" 
            class="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-purple-900/40 transition-colors text-purple-300 hover:text-pink-400">
            <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span class="font-mono font-medium">${p.likes_count}</span>
          </button>

          <!-- Detail link -->
          <button onclick="openDetailModal(${p.id})" 
            class="px-3 py-1 rounded-lg bg-purple-600/20 text-purple-200 border border-purple-500/30 hover:bg-purple-600/40 hover:border-purple-400 font-medium transition-all flex items-center gap-1">
            Explorar
            <svg class="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path></svg>
          </button>
        </div>
      </div>
    </div>
  `;
  return card;
}

// Like Toggle (Online + Offline)
async function handleToggleLike(projectId, btnElement) {
  let liked = true;
  let count = 0;

  if (window.location.protocol.startsWith("http")) {
    try {
      const res = await fetch(`/api/projects/${projectId}/like`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: activeProfile.username })
      });
      const data = await res.json();
      if (data.success) {
        liked = data.liked;
        count = data.likes_count;
      }
    } catch {}
  }

  // Fallback locally
  const target = allProjects.find(p => p.id === projectId);
  if (target) {
    target.likes_count = (target.likes_count || 0) + 1;
    count = target.likes_count;
  }

  const span = btnElement.querySelector("span");
  if (span) span.textContent = count;
  btnElement.classList.add("text-pink-400");
  showToast("¡Voto registrado en Kunkurt!", "success");
}

// Create Project (Online + Offline)
async function handleCreateProject(e) {
  e.preventDefault();
  if (currentRole !== "developer" && currentRole !== "admin") {
    showToast("Permisos insuficientes", "error");
    return;
  }

  const title = document.getElementById("projectTitle").value.trim();
  const category = document.getElementById("projectCategory").value;
  const status = document.getElementById("projectStatus").value;
  const summary = document.getElementById("projectSummary").value.trim();
  const description = document.getElementById("projectDescription").value.trim();
  const github_url = document.getElementById("projectGithub").value.trim();
  const demo_url = document.getElementById("projectDemo").value.trim();
  const is_public = document.getElementById("projectPublic").checked;

  if (!title || !summary) {
    showToast("Completa los campos obligatorios", "error");
    return;
  }

  const tech_stack = Array.from(selectedTechTags);
  const payload = {
    id: Date.now(),
    title, category, status, summary,
    description: description || summary,
    tech_stack: tech_stack.length ? tech_stack : ["Python", "FastAPI"],
    github_url: github_url || "https://github.com/JaponPLX",
    demo_url: demo_url || github_url || "https://github.com/JaponPLX",
    is_public: is_public ? 1 : 0,
    featured: 0,
    image_url: uploadedImageUrl || "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900",
    author_id: activeProfile.id,
    author_name: activeProfile.name,
    author_role: activeProfile.role,
    likes_count: 0,
    tasks: [],
    changelogs: [],
    comments: []
  };

  if (window.location.protocol.startsWith("http")) {
    try {
      await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });
    } catch {}
  }

  // Save in local projects
  allProjects.unshift(payload);
  localStorage.setItem("kunkurt_projects", JSON.stringify(allProjects));

  showToast("¡Proyecto publicado con éxito!", "success");
  closeUploadModal();
  document.getElementById("projectForm").reset();
  removeImagePreview();
  renderProjects(allProjects);
  loadStats();
}

function deleteProject(id, title) {
  if (currentRole !== "admin") {
    showToast("Solo administradores pueden eliminar proyectos", "error");
    return;
  }
  if (!confirm(`¿Eliminar permanentemente "${title}"?`)) return;

  if (window.location.protocol.startsWith("http")) {
    fetch(`/api/projects/${id}`, { method: "DELETE" }).catch(() => {});
  }

  allProjects = allProjects.filter(p => p.id !== id);
  localStorage.setItem("kunkurt_projects", JSON.stringify(allProjects));
  showToast(`Proyecto "${title}" eliminado.`, "info");
  renderProjects(allProjects);
  loadStats();
}

// Project Detail Modal with Tabs
async function openDetailModal(projectId) {
  const modal = document.getElementById("detailModal");
  if (!modal) return;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  let proj = null;
  if (window.location.protocol.startsWith("http")) {
    try {
      const res = await fetch(`/api/projects/${projectId}`);
      const data = await res.json();
      if (data.success) proj = data.project;
    } catch {}
  }

  if (!proj) {
    proj = allProjects.find(p => p.id === projectId) || DEFAULT_PROJECTS.find(p => p.id === projectId);
  }

  currentDetailProject = proj;
  populateDetailModal(currentDetailProject);
  switchDetailTab('overview');
}

function switchDetailTab(tabName) {
  document.querySelectorAll(".detail-tab-btn").forEach(btn => {
    const isTarget = btn.dataset.tab === tabName;
    btn.classList.toggle("border-purple-400", isTarget);
    btn.classList.toggle("text-purple-200", isTarget);
    btn.classList.toggle("bg-purple-900/40", isTarget);
    btn.classList.toggle("text-purple-400/70", !isTarget);
    btn.classList.toggle("border-transparent", !isTarget);
  });
  document.querySelectorAll(".detail-tab-panel").forEach(panel => {
    panel.classList.toggle("hidden", panel.id !== `tabPanel-${tabName}`);
  });
}

function populateDetailModal(p) {
  document.getElementById("detailTitle").textContent = p.title;
  document.getElementById("detailCategory").textContent = p.category;
  document.getElementById("detailSummary").textContent = p.summary;
  document.getElementById("detailDescription").textContent = p.description || p.summary;
  document.getElementById("detailImage").src = p.image_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900';
  document.getElementById("detailAuthor").textContent = p.author_name;
  document.getElementById("detailAuthorRole").textContent = p.author_role.toUpperCase();

  const statusEl = document.getElementById("detailStatus");
  const statusLabels = { production: "Producción", development: "En Desarrollo", testing: "En Pruebas", planning: "Planeación" };
  statusEl.textContent = statusLabels[p.status] || p.status;
  statusEl.className = `badge-status status-${p.status}`;

  const techContainer = document.getElementById("detailTechStack");
  techContainer.innerHTML = p.tech_stack.map(t => `<span class="tech-pill text-xs px-3 py-1">${t}</span>`).join("");

  const githubBtn = document.getElementById("detailGithubBtn");
  if (p.github_url) {
    githubBtn.href = p.github_url;
    githubBtn.classList.remove("hidden");
  } else {
    githubBtn.classList.add("hidden");
  }

  const demoBtn = document.getElementById("detailDemoBtn");
  if (p.demo_url) {
    demoBtn.href = p.demo_url;
    demoBtn.classList.remove("hidden");
  } else {
    demoBtn.classList.add("hidden");
  }

  renderKanbanBoard(p.tasks || []);
  renderChangelog(p.changelogs || []);
  renderCommentsList(p.comments || []);
}

function renderKanbanBoard(tasks) {
  const cols = {
    todo: document.getElementById("kanbanCol-todo"),
    in_progress: document.getElementById("kanbanCol-in_progress"),
    review: document.getElementById("kanbanCol-review"),
    done: document.getElementById("kanbanCol-done")
  };
  Object.values(cols).forEach(col => { if (col) col.innerHTML = ""; });

  const priorityClasses = { urgent: "priority-urgent", high: "priority-high", medium: "priority-medium", low: "priority-low" };
  const isDevOrAdmin = currentRole === "developer" || currentRole === "admin";
  const taskFormContainer = document.getElementById("taskFormContainer");
  if (taskFormContainer) taskFormContainer.style.display = isDevOrAdmin ? "block" : "none";

  tasks.forEach(task => {
    const targetCol = cols[task.status];
    if (!targetCol) return;

    const nextStatuses = {
      todo: { next: "in_progress", label: "Iniciar →" },
      in_progress: { next: "review", label: "A QA / Review →" },
      review: { next: "done", label: "Aprobar & Done ✓" },
      done: { next: "todo", label: "↺ Reabrir" }
    };
    const moveInfo = nextStatuses[task.status] || { next: "done", label: "Listo" };

    const card = document.createElement("div");
    card.className = "kanban-card space-y-2";
    card.innerHTML = `
      <div class="flex items-center justify-between text-[10px]">
        <span class="px-2 py-0.5 rounded-full font-mono uppercase ${priorityClasses[task.priority] || priorityClasses.medium}">
          ${task.priority}
        </span>
        <span class="text-purple-300/60 font-medium">${task.assignee}</span>
      </div>
      <p class="text-xs text-white font-medium">${task.title}</p>
      ${isDevOrAdmin ? `
        <div class="pt-2 border-t border-purple-900/30 flex items-center justify-between">
          <button onclick="advanceTaskStatus(${task.id}, '${moveInfo.next}')" 
            class="text-[10px] text-purple-300 hover:text-purple-100 font-semibold bg-purple-950/60 px-2 py-0.5 rounded border border-purple-500/30">
            ${moveInfo.label}
          </button>
          <button onclick="deleteTask(${task.id})" class="text-red-400 hover:text-red-300 text-xs">✕</button>
        </div>
      ` : ""}
    `;
    targetCol.appendChild(card);
  });
}

function advanceTaskStatus(taskId, nextStatus) {
  if (currentDetailProject && currentDetailProject.tasks) {
    const t = currentDetailProject.tasks.find(x => x.id === taskId);
    if (t) t.status = nextStatus;
  }
  if (window.location.protocol.startsWith("http")) {
    fetch(`/api/tasks/${taskId}/status`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: nextStatus })
    }).catch(() => {});
  }
  showToast("Tarea actualizada en el Sprint", "info");
  if (currentDetailProject) renderKanbanBoard(currentDetailProject.tasks);
}

function handleAddTask(e) {
  e.preventDefault();
  if (!currentDetailProject) return;

  const titleInput = document.getElementById("taskTitleInput");
  const prioritySelect = document.getElementById("taskPrioritySelect");
  const title = titleInput.value.trim();
  const priority = prioritySelect.value;
  if (!title) return;

  const newTask = {
    id: Date.now(),
    title, priority, status: "todo",
    assignee: activeProfile.name
  };

  if (!currentDetailProject.tasks) currentDetailProject.tasks = [];
  currentDetailProject.tasks.push(newTask);

  if (window.location.protocol.startsWith("http")) {
    fetch(`/api/projects/${currentDetailProject.id}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newTask)
    }).catch(() => {});
  }

  showToast("Tarea añadida al Sprint", "success");
  titleInput.value = "";
  renderKanbanBoard(currentDetailProject.tasks);
}

function deleteTask(taskId) {
  if (!confirm("¿Eliminar tarea?")) return;
  if (currentDetailProject && currentDetailProject.tasks) {
    currentDetailProject.tasks = currentDetailProject.tasks.filter(t => t.id !== taskId);
    renderKanbanBoard(currentDetailProject.tasks);
  }
  if (window.location.protocol.startsWith("http")) {
    fetch(`/api/tasks/${taskId}`, { method: "DELETE" }).catch(() => {});
  }
}

function renderChangelog(logs) {
  const container = document.getElementById("changelogContainer");
  if (!container) return;
  if (logs.length === 0) {
    container.innerHTML = `<div class="py-6 text-center text-purple-400/60 text-sm">Este proyecto aún se encuentra en su versión inicial.</div>`;
    return;
  }
  container.innerHTML = logs.map(l => `
    <div class="relative pl-6 pb-6 border-l-2 border-purple-500/30 last:border-transparent last:pb-0">
      <div class="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-600 border-2 border-[#0d071a] shadow-[0_0_8px_#a855f7]"></div>
      <div class="glass-panel p-4 rounded-xl border border-purple-900/40">
        <div class="flex items-center justify-between mb-1">
          <span class="font-mono font-bold text-sm text-purple-300">${l.version}</span>
          <span class="text-xs text-purple-400/60">${l.release_date}</span>
        </div>
        <h5 class="text-sm font-semibold text-white mb-2">${l.title}</h5>
        <p class="text-xs text-purple-200/80 whitespace-pre-line leading-relaxed">${l.notes}</p>
      </div>
    </div>
  `).join("");
}

function renderCommentsList(comments) {
  const container = document.getElementById("commentsContainer");
  const countEl = document.getElementById("commentsCount");
  if (!container) return;
  if (countEl) countEl.textContent = comments.length;
  if (comments.length === 0) {
    container.innerHTML = `<div class="py-6 text-center text-purple-400/60 text-sm">Aún no hay aportes del equipo. ¡Comenta el primero!</div>`;
    return;
  }

  const typeMap = {
    general: { label: "Comentario", class: "bg-purple-950/80 text-purple-300 border-purple-500/30" },
    bug: { label: "Bug Report 🐛", class: "bg-red-950/80 text-red-300 border-red-500/40" },
    feature_request: { label: "Sugerencia 💡", class: "bg-blue-950/80 text-blue-300 border-blue-500/40" },
    kudos: { label: "Felicitación 🎉", class: "bg-emerald-950/80 text-emerald-300 border-emerald-500/40" }
  };

  container.innerHTML = comments.map(c => {
    const t = typeMap[c.feedback_type] || typeMap.general;
    return `
      <div class="p-3.5 rounded-xl bg-purple-950/30 border border-purple-900/40 space-y-1.5">
        <div class="flex items-center justify-between text-xs">
          <div class="flex items-center gap-2">
            <div class="w-6 h-6 rounded-full bg-purple-700 flex items-center justify-center font-bold text-[10px]">
              ${c.user_name.charAt(0)}
            </div>
            <span class="font-semibold text-purple-200">${c.user_name}</span>
            <span class="text-[10px] text-purple-400/70 uppercase">(${c.user_role})</span>
          </div>
          <span class="px-2 py-0.5 rounded-full text-[10px] border ${t.class}">${t.label}</span>
        </div>
        <p class="text-xs sm:text-sm text-purple-100/90 leading-relaxed pl-8">${c.content}</p>
      </div>
    `;
  }).join("");
}

function handleAddComment(e) {
  e.preventDefault();
  if (!currentDetailProject) return;

  const content = document.getElementById("commentContent").value.trim();
  const feedback_type = document.getElementById("commentType").value;
  if (!content) return;

  const newC = {
    id: Date.now(),
    content, feedback_type,
    user_name: activeProfile.name,
    user_role: activeProfile.role,
    avatar_url: activeProfile.avatar
  };

  if (!currentDetailProject.comments) currentDetailProject.comments = [];
  currentDetailProject.comments.unshift(newC);

  if (window.location.protocol.startsWith("http")) {
    fetch(`/api/projects/${currentDetailProject.id}/comments`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newC)
    }).catch(() => {});
  }

  showToast("+15 Puntos obtenidos por feedback", "success");
  document.getElementById("commentContent").value = "";
  renderCommentsList(currentDetailProject.comments);
}

function printProjectOnePager() {
  window.print();
}

function openUploadModal() {
  if (currentRole !== "developer" && currentRole !== "admin") {
    showToast("Permiso exclusivo para Desarrolladores o Admin", "error");
    return;
  }
  const modal = document.getElementById("uploadModal");
  if (modal) { modal.classList.remove("hidden"); document.body.style.overflow = "hidden"; }
}

function closeUploadModal() {
  const modal = document.getElementById("uploadModal");
  if (modal) { modal.classList.add("hidden"); document.body.style.overflow = "auto"; }
}

function closeDetailModal() {
  const modal = document.getElementById("detailModal");
  if (modal) { modal.classList.add("hidden"); document.body.style.overflow = "auto"; }
}

// Notifications
async function loadNotifications() {
  let list = DEFAULT_NOTIFICATIONS;
  if (window.location.protocol.startsWith("http")) {
    try {
      const res = await fetch("/api/notifications");
      const data = await res.json();
      if (data.success) list = data.notifications;
    } catch {}
  }
  const unreadCount = list.filter(n => !n.is_read).length;
  const badge = document.getElementById("notifBadge");
  if (badge) {
    badge.textContent = unreadCount;
    badge.style.display = unreadCount > 0 ? "flex" : "none";
  }
  const container = document.getElementById("notifListContainer");
  if (container) {
    container.innerHTML = list.map(n => `
      <div class="p-3 rounded-xl ${n.is_read ? 'bg-purple-950/20' : 'bg-purple-900/30 border border-purple-500/30'} space-y-1">
        <div class="flex items-center justify-between text-[11px]">
          <span class="font-bold text-purple-200">${n.title}</span>
          <span class="text-[10px] text-purple-400/60">${n.time_ago}</span>
        </div>
        <p class="text-xs text-purple-100/80">${n.message}</p>
      </div>
    `).join("");
  }
}

function toggleNotificationsDropdown() {
  const dropdown = document.getElementById("notifDropdown");
  if (!dropdown) return;
  const isHidden = dropdown.classList.contains("hidden");
  dropdown.classList.toggle("hidden", !isHidden);
  if (isHidden) {
    const badge = document.getElementById("notifBadge");
    if (badge) badge.style.display = "none";
    if (window.location.protocol.startsWith("http")) fetch("/api/notifications/read", { method: "POST" }).catch(() => {});
  }
}

function closeNotificationsDropdown() {
  const dropdown = document.getElementById("notifDropdown");
  if (dropdown) dropdown.classList.add("hidden");
}

// Hall of Fame
async function openHallOfFame() {
  const modal = document.getElementById("hallOfFameModal");
  if (!modal) return;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";

  let users = DEFAULT_USERS;
  if (window.location.protocol.startsWith("http")) {
    try {
      const res = await fetch("/api/team");
      const data = await res.json();
      if (data.success) users = data.users;
    } catch {}
  }

  const container = document.getElementById("hallOfFameList");
  container.innerHTML = users.map((u, idx) => {
    const medal = idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `#${idx + 1}`;
    const badgesHtml = (u.badges || []).map(b => `<span class="px-2 py-0.5 rounded-full text-[10px] bg-purple-950/80 text-purple-300 border border-purple-500/40">${b}</span>`).join(" ");
    return `
      <div class="glass-panel p-4 rounded-2xl flex items-center justify-between border border-purple-500/20 hover:border-purple-400/50 transition-all">
        <div class="flex items-center gap-3">
          <span class="text-lg font-bold font-mono w-8 text-center text-purple-300">${medal}</span>
          <img src="${u.avatar_url}" alt="${u.full_name}" class="w-11 h-11 rounded-xl object-cover ring-2 ring-purple-500/40">
          <div>
            <h4 class="text-sm font-bold text-white">${u.full_name}</h4>
            <p class="text-xs text-purple-300/70 mb-1.5">${u.department}</p>
            <div class="flex flex-wrap gap-1">${badgesHtml}</div>
          </div>
        </div>
        <div class="text-right">
          <span class="text-xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-fuchsia-300 font-mono">${u.points}</span>
          <span class="block text-[10px] text-purple-400 uppercase tracking-wider font-semibold">PUNTOS</span>
        </div>
      </div>
    `;
  }).join("");
}

function closeHallOfFame() {
  const modal = document.getElementById("hallOfFameModal");
  if (modal) { modal.classList.add("hidden"); document.body.style.overflow = "auto"; }
}

// Pitch Deck Presentation Mode
function openPitchDeck() {
  const modal = document.getElementById("pitchDeckModal");
  if (!modal || allProjects.length === 0) return;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  pitchDeckCurrentIndex = 0;
  renderPitchSlide();
}

function closePitchDeck() {
  const modal = document.getElementById("pitchDeckModal");
  if (modal) { modal.classList.add("hidden"); document.body.style.overflow = "auto"; }
}

function nextPitchSlide() {
  if (allProjects.length === 0) return;
  pitchDeckCurrentIndex = (pitchDeckCurrentIndex + 1) % allProjects.length;
  renderPitchSlide();
}

function prevPitchSlide() {
  if (allProjects.length === 0) return;
  pitchDeckCurrentIndex = (pitchDeckCurrentIndex - 1 + allProjects.length) % allProjects.length;
  renderPitchSlide();
}

function renderPitchSlide() {
  const p = allProjects[pitchDeckCurrentIndex];
  if (!p) return;
  document.getElementById("pitchSlideNumber").textContent = `${pitchDeckCurrentIndex + 1} / ${allProjects.length}`;
  document.getElementById("pitchTitle").textContent = p.title;
  document.getElementById("pitchCategory").textContent = p.category;
  document.getElementById("pitchSummary").textContent = p.summary;
  document.getElementById("pitchDescription").textContent = p.description || p.summary;
  document.getElementById("pitchImage").src = p.image_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900';
  document.getElementById("pitchTechStack").innerHTML = p.tech_stack.map(t => `<span class="tech-pill text-sm px-3.5 py-1.5">${t}</span>`).join("");
  const demoBtn = document.getElementById("pitchDemoBtn");
  if (p.github_url || p.demo_url) {
    demoBtn.href = p.github_url || p.demo_url;
    demoBtn.classList.remove("hidden");
  } else {
    demoBtn.classList.add("hidden");
  }
}

// Terminal CLI
function setupTerminal() {
  const input = document.getElementById("terminalInput");
  if (!input) return;
  input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      const command = input.value.trim();
      input.value = "";
      if (command) await executeTerminalCommand(command);
    }
  });
}

function toggleTerminal() {
  const modal = document.getElementById("terminalModal");
  if (!modal) return;
  const isHidden = modal.classList.contains("hidden");
  modal.classList.toggle("hidden", !isHidden);
  if (isHidden) {
    const input = document.getElementById("terminalInput");
    if (input) setTimeout(() => input.focus(), 50);
  }
}

function closeTerminal() {
  const modal = document.getElementById("terminalModal");
  if (modal) modal.classList.add("hidden");
}

async function executeTerminalCommand(cmd) {
  const body = document.getElementById("terminalBody");
  if (!body) return;

  const userLine = document.createElement("div");
  userLine.className = "flex items-center gap-2 text-xs font-mono";
  userLine.innerHTML = `<span class="text-fuchsia-400">kunkurt@system:~$</span> <span class="text-white">${cmd}</span>`;
  body.appendChild(userLine);

  const parts = cmd.toLowerCase().split(" ");
  const action = parts[0];
  const arg = parts.slice(1).join(" ");
  const resLine = document.createElement("div");
  resLine.className = "text-xs font-mono pb-2 text-purple-200/90";

  switch (action) {
    case "help":
      resLine.innerHTML = `
        <span class="text-fuchsia-300 font-bold">=== COMANDOS KUNKURT CLI ===</span><br>
        • <span class="text-purple-300 font-semibold">status</span> : Métricas del sistema en tiempo real.<br>
        • <span class="text-purple-300 font-semibold">projects</span> : Lista todos los repositorios de JaponPLX.<br>
        • <span class="text-purple-300 font-semibold">filter &lt;categoría&gt;</span> : Filtra proyectos en el catálogo.<br>
        • <span class="text-purple-300 font-semibold">role &lt;admin|dev|emp|public&gt;</span> : Cambia el rol activo.<br>
        • <span class="text-purple-300 font-semibold">deploy &lt;id&gt;</span> : Simulación de pipeline CI/CD en vivo.<br>
        • <span class="text-purple-300 font-semibold">team</span> : Ranking de colaboradores y puntos.<br>
        • <span class="text-purple-300 font-semibold">matrix</span> : Activa o desactiva la lluvia digital morada.<br>
        • <span class="text-purple-300 font-semibold">clear</span> : Limpia la pantalla de la terminal.
      `;
      break;

    case "status":
      resLine.innerHTML = `
        <span class="terminal-success">● SISTEMA OPERACIONAL (LATENCIA: 1.2ms)</span><br>
        • Proyectos Cargados: <span class="text-white font-bold">${allProjects.length}</span><br>
        • Desarrollador Principal: <span class="text-fuchsia-300 font-bold">JaponPLX (Alejandro)</span><br>
        • Repositorios GitHub: <span class="terminal-cyan font-bold">b2b, cvflow, hola, WD4E</span><br>
        • Modo: <span class="terminal-success font-bold">${window.location.protocol.startsWith("http") ? 'Servidor Conectado' : 'Modo Standalone Directo'}</span>
      `;
      break;

    case "projects":
      resLine.innerHTML = allProjects.map(p => 
        `[#${p.id}] <span class="text-white font-semibold">${p.title}</span> — <span class="terminal-cyan">${p.github_url}</span>`
      ).join("<br>");
      break;

    case "role":
      const roleMap = { admin: "admin", dev: "developer", developer: "developer", emp: "employee", employee: "employee", public: "public" };
      const targetRole = roleMap[arg];
      if (targetRole) {
        switchRole(targetRole);
        resLine.innerHTML = `<span class="terminal-success">✓ Rol modificado a: ${targetRole.toUpperCase()}</span>`;
      } else {
        resLine.innerHTML = `<span class="text-red-400">Rol no reconocido. Usa: admin, dev, emp, public</span>`;
      }
      break;

    case "filter":
      currentCategory = arg || "all";
      loadProjects();
      resLine.innerHTML = `<span class="terminal-success">✓ Filtro aplicado: ${currentCategory}</span>`;
      break;

    case "deploy":
      resLine.innerHTML = `
        <span class="terminal-yellow">Iniciando pipeline de despliegue para artefacto JaponPLX...</span><br>
        [1/3] Compilando contenedores Docker con FastAPI... OK<br>
        [2/3] Verificando túneles Cloudflare y endpoints... OK<br>
        [3/3] Desplegando en infraestructura Kunkurt... <span class="terminal-success">¡EXITOSO! En línea en 0.7s</span>
      `;
      showToast("¡Despliegue simulado ejecutado con éxito!", "success");
      break;

    case "team":
      resLine.innerHTML = DEFAULT_USERS.map((u, i) => `#${i+1} <span class="text-white font-bold">${u.full_name}</span> (${u.role}) — ${u.points} pts`).join("<br>");
      break;

    case "matrix":
      toggleMatrixRain();
      resLine.innerHTML = `<span class="terminal-cyan">Efecto Matrix Rain: ${matrixActive ? 'ACTIVADO' : 'DESACTIVADO'}</span>`;
      break;

    case "clear":
      body.innerHTML = "";
      return;

    default:
      resLine.innerHTML = `<span class="text-red-400">Comando no reconocido: '${action}'. Escribe 'help' para ver la lista.</span>`;
  }

  body.appendChild(resLine);
  body.scrollTop = body.scrollHeight;
}

function toggleMatrixRain() {
  const canvas = document.getElementById("matrixCanvas");
  if (!canvas) return;
  matrixActive = !matrixActive;
  canvas.style.display = matrixActive ? "block" : "none";
  if (!matrixActive) return;

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  const letters = "0101JAPONPLXKUNKURTFASTAPIDOCKER";
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = Array.from({ length: Math.floor(columns) }, () => 1);

  function draw() {
    if (!matrixActive) return;
    ctx.fillStyle = "rgba(7, 4, 13, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "#c084fc";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = letters.charAt(Math.floor(Math.random() * letters.length));
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
    requestAnimationFrame(draw);
  }
  draw();
}

function showToast(message, type = "info") {
  let toastContainer = document.getElementById("toastContainer");
  if (!toastContainer) {
    toastContainer = document.createElement("div");
    toastContainer.id = "toastContainer";
    toastContainer.className = "fixed bottom-5 right-5 z-50 flex flex-col gap-2 pointer-events-none";
    document.body.appendChild(toastContainer);
  }

  const toast = document.createElement("div");
  const bgColors = {
    success: "bg-purple-900/90 border-purple-400 text-purple-100",
    error: "bg-red-950/90 border-red-500 text-red-100",
    info: "bg-indigo-950/90 border-indigo-500 text-indigo-100"
  };

  toast.className = `px-4 py-3 rounded-xl border backdrop-blur-md shadow-2xl flex items-center gap-3 text-sm pointer-events-auto transform translate-y-3 opacity-0 transition-all duration-300 ${bgColors[type] || bgColors.info}`;
  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full ${type === 'error' ? 'bg-red-400' : 'bg-purple-400'} animate-ping"></span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => toast.classList.remove("translate-y-3", "opacity-0"), 10);
  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-3");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ============================================================================
// GITHUB AUTO-SYNC FUNCTIONALITY
// ============================================================================
function openGithubSyncModal() {
  const modal = document.getElementById("githubSyncModal");
  if (modal) modal.classList.remove("hidden");
}

function closeGithubSyncModal() {
  const modal = document.getElementById("githubSyncModal");
  if (modal) modal.classList.add("hidden");
}

async function executeGithubSync() {
  const input = document.getElementById("syncGithubUsername");
  const username = input ? input.value.trim() : "";
  if (!username) {
    showToast("Por favor ingresa un nombre de usuario de GitHub", "error");
    return;
  }

  const btn = document.getElementById("btnExecuteSync");
  const resContainer = document.getElementById("syncResultContainer");
  const originalText = btn ? btn.innerHTML : "";
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span class="inline-block animate-spin mr-1">⚡</span> Sincronizando repositorios...`;
  }

  try {
    const res = await fetch("/api/github/sync", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ github_username: username })
    });
    const data = await res.json();
    if (data.success) {
      showToast(`¡Sincronización exitosa! Se importaron ${data.imported_count} repositorios de ${data.github_username}`, "success");
      if (resContainer) {
        resContainer.classList.remove("hidden");
        resContainer.innerHTML = `
          <div class="flex items-center gap-3">
            <img src="${data.author_avatar}" class="w-10 h-10 rounded-full border border-purple-400">
            <div>
              <p class="text-sm font-bold text-white">${data.author_name} (@${data.github_username})</p>
              <p class="text-xs text-purple-300">✓ ${data.imported_count} proyectos de ${data.total_repos_found} repositorios cargados en Kunkurt.</p>
            </div>
          </div>
        `;
      }
      await loadProjects();
      setTimeout(() => {
        closeGithubSyncModal();
      }, 2200);
    } else {
      showToast(data.error || "Error al sincronizar con GitHub", "error");
    }
  } catch (err) {
    console.error("Error sincronizando con GitHub:", err);
    showToast("Error de conexión al conectar con GitHub API", "error");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = originalText;
    }
  }
}

// ============================================================================
// GESTIÓN DE EMPLEADOS Y LOGIN POR EL ADMINISTRADOR (CERO USUARIOS FALSOS)
// ============================================================================
let authorizedEmployeesList = [];

async function loadAuthorizedEmployees() {
  try {
    const res = await fetch("/api/employees");
    const data = await res.json();
    if (data.success && data.employees) {
      authorizedEmployeesList = data.employees;
      renderLoginQuickList(authorizedEmployeesList);
      renderAdminEmployeesTable(authorizedEmployeesList);
    }
  } catch (err) {
    console.warn("Error cargando empleados:", err);
  }
}

function renderLoginQuickList(employees) {
  const container = document.getElementById("authorizedEmployeesQuickList");
  if (!container) return;

  if (!employees || employees.length === 0) {
    container.innerHTML = `
      <p class="text-xs text-purple-400/60 p-3 rounded-xl bg-purple-950/20 border border-purple-900/30">
        No hay empleados dados de alta todavía. El Administrador debe darlos de alta primero.
      </p>
    `;
    return;
  }

  const roleNameMap = {
    admin: "Director / Admin",
    developer: "Desarrollador Lead",
    qa: "Control de Calidad (QA)",
    designer: "Diseñador UI/UX",
    manager: "Project Manager",
    employee: "Colaborador"
  };

  const badgeColorMap = {
    admin: "bg-pink-600/30 text-pink-200 border-pink-500/40",
    developer: "bg-violet-600/30 text-violet-200 border-violet-500/40",
    qa: "bg-cyan-600/30 text-cyan-200 border-cyan-500/40",
    designer: "bg-fuchsia-600/30 text-fuchsia-200 border-fuchsia-500/40",
    manager: "bg-emerald-600/30 text-emerald-200 border-emerald-500/40",
    employee: "bg-indigo-600/30 text-indigo-200 border-indigo-500/40"
  };

  container.innerHTML = employees.map(emp => `
    <button type="button" onclick="quickFillAndLogin('${emp.email}')" class="w-full p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/20 hover:border-purple-400 hover:bg-purple-900/30 transition-all flex items-center justify-between gap-3 text-left group">
      <div class="flex items-center gap-2.5 min-w-0">
        <img src="${emp.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(emp.full_name) + '&background=8b5cf6&color=fff'}" class="w-8 h-8 rounded-lg object-cover border border-purple-400/40">
        <div class="min-w-0">
          <p class="text-xs font-bold text-white group-hover:text-purple-200 truncate">${emp.full_name}</p>
          <p class="text-[10px] text-purple-400 font-mono truncate">${emp.email}</p>
        </div>
      </div>
      <span class="text-[9px] font-semibold px-2 py-0.5 rounded-full border ${badgeColorMap[emp.role] || 'bg-purple-600/30 text-purple-200 border-purple-500/40'} whitespace-nowrap">
        ${roleNameMap[emp.role] || emp.role.toUpperCase()}
      </span>
    </button>
  `).join("");
}

function renderAdminEmployeesTable(employees) {
  const table = document.getElementById("adminEmployeesTable");
  const countBadge = document.getElementById("adminEmpCountBadge");
  if (!table) return;

  if (countBadge) {
    countBadge.textContent = `${employees.length} ${employees.length === 1 ? 'Empleado' : 'Empleados'}`;
  }

  const roleNameMap = {
    admin: "👑 Administrador",
    developer: "💻 Desarrollador",
    qa: "🎯 QA & Testing",
    designer: "🎨 Diseñador UI/UX",
    manager: "📊 Project Manager",
    employee: "👥 Colaborador"
  };

  table.innerHTML = employees.map(emp => {
    const isFounder = emp.email.toLowerCase() === "alejandrobelno964@gmail.com" || emp.username.toLowerCase() === "japonplx";
    return `
      <div class="p-3 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <img src="${emp.avatar_url}" class="w-9 h-9 rounded-xl object-cover border border-purple-400/50">
          <div class="min-w-0">
            <h5 class="text-xs font-bold text-white truncate">${emp.full_name}</h5>
            <p class="text-[11px] text-purple-300/70 truncate">${emp.department || 'Kunkurt Devs'}</p>
            <span class="text-[10px] text-purple-400 font-mono">${emp.email}</span>
          </div>
        </div>
        <div class="flex items-center gap-2">
          <span class="text-[10px] font-semibold px-2.5 py-1 rounded-lg bg-purple-900/60 border border-purple-500/40 text-purple-200 whitespace-nowrap">
            ${roleNameMap[emp.role] || emp.role}
          </span>
          ${isFounder ? `
            <span class="text-[10px] font-bold text-fuchsia-400 px-2 py-1 rounded bg-fuchsia-950/60 border border-fuchsia-800">FUNDADOR</span>
          ` : `
            <button onclick="handleDeleteEmployee(${emp.id}, '${emp.full_name}')" class="p-1.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 hover:text-white hover:bg-red-900/60 transition-colors" title="Eliminar empleado">
              🗑️
            </button>
          `}
        </div>
      </div>
    `;
  }).join("");
}

function quickFillAndLogin(email) {
  const input = document.getElementById("loginEmail");
  if (input) input.value = email;
  const form = document.getElementById("authLoginForm");
  if (form) form.dispatchEvent(new Event("submit", { cancelable: true }));
}

function openLoginModal() {
  const modal = document.getElementById("loginModal");
  if (modal) modal.classList.remove("hidden");
  loadAuthorizedEmployees();
}

function closeLoginModal() {
  const modal = document.getElementById("loginModal");
  if (modal) modal.classList.add("hidden");
}

function openEmployeeAdminModal() {
  const modal = document.getElementById("employeeAdminModal");
  if (modal) modal.classList.remove("hidden");
  loadAuthorizedEmployees();
}

function closeEmployeeAdminModal() {
  const modal = document.getElementById("employeeAdminModal");
  if (modal) modal.classList.add("hidden");
}

async function handleCreateEmployee(e) {
  e.preventDefault();
  const nameInput = document.getElementById("newEmpFullName");
  const emailInput = document.getElementById("newEmpEmail");
  const roleInput = document.getElementById("newEmpRole");
  const deptInput = document.getElementById("newEmpDept");
  const submitBtn = document.getElementById("btnCreateEmpSubmit");

  const fullName = nameInput ? nameInput.value.trim() : "";
  const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
  const role = roleInput ? roleInput.value : "developer";
  const department = deptInput && deptInput.value.trim() ? deptInput.value.trim() : "Equipo Kunkurt Devs";

  if (!fullName || !email) {
    showToast("Por favor completa el nombre y el correo", "error");
    return;
  }

  const originalText = submitBtn ? submitBtn.innerHTML : "";
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>⏳ Registrando y autorizando empleado...</span>`;
  }

  try {
    const res = await fetch("/api/employees/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name: fullName, email, role, department })
    });
    const data = await res.json();
    if (data.success) {
      showToast(`✓ Empleado ${fullName} dado de alta como [${role.toUpperCase()}] exitosamente`, "success");
      if (nameInput) nameInput.value = "";
      if (emailInput) emailInput.value = "";
      if (deptInput) deptInput.value = "";
      await loadAuthorizedEmployees();
    } else {
      showToast(data.error || "Error al registrar empleado", "error");
    }
  } catch (err) {
    console.error("Error al registrar empleado:", err);
    showToast("Error de conexión al registrar empleado", "error");
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }
}

async function handleDeleteEmployee(empId, name) {
  if (!confirm(`¿Estás seguro de dar de baja al empleado ${name}?`)) return;

  try {
    const res = await fetch("/api/employees/delete", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id: empId })
    });
    const data = await res.json();
    if (data.success) {
      showToast(`Empleado ${name} dado de baja de la plataforma`, "info");
      await loadAuthorizedEmployees();
    } else {
      showToast(data.error || "No se pudo eliminar el empleado", "error");
    }
  } catch (err) {
    showToast("Error de conexión", "error");
  }
}

async function handleLoginSubmit(e) {
  e.preventDefault();
  const emailInput = document.getElementById("loginEmail");
  const submitBtn = document.getElementById("btnLoginSubmit");
  const email = emailInput ? emailInput.value.trim().toLowerCase() : "";

  if (!email) {
    showToast("Por favor ingresa tu correo electrónico corporativo", "error");
    return;
  }

  const originalText = submitBtn ? submitBtn.innerHTML : "";
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>⏳ Verificando autorización del Administrador...</span>`;
  }

  const roleNameMap = {
    admin: "Director General / Administrador",
    developer: "Desarrollador Lead & Arquitecto",
    qa: "QA & Testing Lead",
    designer: "Diseñador UI/UX & Frontend",
    manager: "Project Manager & Scrum Master",
    employee: "Colaborador / Soporte",
    public: "Vista Portafolio Cliente"
  };

  const badgeClassMap = {
    admin: "from-pink-500 to-purple-600",
    developer: "from-violet-500 to-indigo-600",
    qa: "from-cyan-500 to-blue-600",
    designer: "from-fuchsia-500 to-pink-600",
    manager: "from-emerald-500 to-teal-600",
    employee: "from-indigo-500 to-purple-600",
    public: "from-slate-600 to-slate-700"
  };

  try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email })
    });
    const data = await res.json();

    if (data.success) {
      const user = data.user || {};
      const userRole = user.role || "developer";

      const verifiedProfile = {
        id: user.id || Date.now(),
        username: user.username || email.split("@")[0],
        name: user.full_name || email.split("@")[0].title(),
        email: email,
        role: userRole,
        roleName: roleNameMap[userRole] || userRole.toUpperCase(),
        department: user.department || "Equipo Kunkurt Devs",
        avatar: user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || email)}&background=8b5cf6&color=fff`,
        badgeClass: badgeClassMap[userRole] || "from-violet-500 to-indigo-600"
      };

      PROFILES[userRole] = verifiedProfile;
      currentRole = userRole;
      activeProfile = verifiedProfile;

      localStorage.setItem("kunkurt_active_role", currentRole);
      localStorage.setItem("kunkurt_active_profile", JSON.stringify(activeProfile));

      const roleSelect = document.getElementById("roleSelect");
      if (roleSelect) roleSelect.value = userRole;

      updateRoleUI();
      closeLoginModal();
      showToast(`¡Acceso autorizado! Bienvenido ${verifiedProfile.name} [${verifiedProfile.roleName}]. Alerta enviada a ${email} 📧`, "success");
    } else {
      showToast(data.error || "Acceso denegado: Solicita a tu Administrador tu alta de usuario.", "error");
    }
  } catch (err) {
    console.error("Error en login:", err);
    // Offline / fallback for founding admin
    if (email === "alejandrobelno964@gmail.com" || email.includes("japon")) {
      currentRole = "admin";
      activeProfile = PROFILES.admin;
      updateRoleUI();
      closeLoginModal();
      showToast(`Sesión activa como JaponPLX (Administrador Fundador)`, "success");
    } else {
      showToast("❌ Acceso restringido: Solo el Administrador puede registrar nuevos empleados.", "error");
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }
}

// ============================================================================
// COMPARTIR Y ACCESO PÚBLICO (RED LOCAL Y MUNDIAL)
// ============================================================================
async function openShareModal() {
  const modal = document.getElementById("shareModal");
  if (modal) modal.classList.remove("hidden");

  try {
    const res = await fetch("/api/network-info");
    const data = await res.json();
    if (data.success) {
      const localInput = document.getElementById("shareLocalUrl");
      const lanInput = document.getElementById("shareLanUrl");
      if (localInput) localInput.value = data.local_url;
      if (lanInput) lanInput.value = data.lan_url;
    }
  } catch (e) {
    const localInput = document.getElementById("shareLocalUrl");
    const lanInput = document.getElementById("shareLanUrl");
    if (localInput) localInput.value = window.location.origin || "http://localhost:8080";
    if (lanInput) lanInput.value = `http://${window.location.hostname || '127.0.0.1'}:8080`;
  }
}

function closeShareModal() {
  const modal = document.getElementById("shareModal");
  if (modal) modal.classList.add("hidden");
}

function copyToClipboard(text) {
  if (!text) return;
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(() => {
      showToast("¡Enlace copiado al portapapeles! 📋", "success");
    }).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}

function fallbackCopy(text) {
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.style.position = "fixed";
  textArea.style.opacity = "0";
  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand("copy");
    showToast("¡Copiado al portapapeles! 📋", "success");
  } catch (err) {
    prompt("Copia manualmente este enlace:", text);
  }
  document.body.removeChild(textArea);
}

// Expose modal handlers to global window scope for inline onclicks
window.openGithubSyncModal = openGithubSyncModal;
window.closeGithubSyncModal = closeGithubSyncModal;
window.executeGithubSync = executeGithubSync;
window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;
window.openEmployeeAdminModal = openEmployeeAdminModal;
window.closeEmployeeAdminModal = closeEmployeeAdminModal;
window.handleCreateEmployee = handleCreateEmployee;
window.handleDeleteEmployee = handleDeleteEmployee;
window.quickFillAndLogin = quickFillAndLogin;
window.handleLoginSubmit = handleLoginSubmit;
window.openShareModal = openShareModal;
window.closeShareModal = closeShareModal;
window.copyToClipboard = copyToClipboard;

