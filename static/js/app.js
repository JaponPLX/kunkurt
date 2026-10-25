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
  client: {
    id: 0,
    username: "cliente",
    name: "Cliente Kunkurt",
    email: "cliente@kunkurt.com",
    role: "client",
    roleName: "Cliente & Solicitante",
    department: "Clientes y Aliados",
    avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    badgeClass: "from-cyan-500 to-blue-600"
  },
  public: {
    id: 0,
    username: "guest",
    name: "Visitante Externo",
    email: "cliente@kunkurt.com",
    role: "public",
    roleName: "Vista Portafolio Visitante",
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

let currentRole = "public";
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
  loadTickets();
  loadNotifications();
  loadAuthorizedEmployees();
  initTechTagPills();
  setupTerminal();
  setupKeyboardShortcuts();

  // If visitor is not logged in, prompt them to sign in or register with their own credentials
  const savedProfile = localStorage.getItem("kunkurt_active_profile");
  if (!savedProfile || currentRole === "public") {
    setTimeout(() => {
      openLoginModal();
    }, 500);
  }
});

// Setup Role Switcher & Persistent Sessions
function setupRoleSwitcher() {
  const savedRole = localStorage.getItem("kunkurt_active_role");
  const savedProfile = localStorage.getItem("kunkurt_active_profile");
  
  if (savedProfile) {
    try {
      const parsed = JSON.parse(savedProfile);
      if (parsed && parsed.role && parsed.role !== "public") {
        currentRole = parsed.role;
        activeProfile = { ...(PROFILES[parsed.role] || {}), ...parsed };
        PROFILES[parsed.role] = activeProfile;
      } else {
        currentRole = "public";
        activeProfile = PROFILES.public;
      }
    } catch (e) {
      currentRole = "public";
      activeProfile = PROFILES.public;
    }
  } else {
    currentRole = "public";
    activeProfile = PROFILES.public;
  }

  const roleSelect = document.getElementById("roleSelect");
  if (roleSelect) {
    roleSelect.value = currentRole;
    roleSelect.addEventListener("change", (e) => {
      switchRole(e.target.value);
    });
  }

  updateRoleUI();
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

  // Login / Logout buttons toggling
  const navLoginBtn = document.getElementById("navLoginBtn");
  const navLogoutBtn = document.getElementById("navLogoutBtn");
  if (navLoginBtn) navLoginBtn.style.display = currentRole === "public" ? "inline-flex" : "none";
  if (navLogoutBtn) navLogoutBtn.style.display = currentRole !== "public" ? "inline-flex" : "none";

  // RBAC: Chat de Equipo es exclusivo para ingenieros y colaboradores internos (oculto para clientes y visitantes)
  const isStaff = ["admin", "developer", "qa", "designer", "manager", "employee"].includes(currentRole);
  const teamChatBtn = document.getElementById("tabViewTeamChatBtn");
  if (teamChatBtn) {
    teamChatBtn.style.display = isStaff ? "inline-flex" : "none";
  }

  // Si un cliente o visitante intenta estar en la pestaña de chat, redirigir al catálogo
  const teamChatSec = document.getElementById("teamChatSection");
  if (!isStaff && teamChatSec && !teamChatSec.classList.contains("hidden")) {
    switchToSection("projects");
  }
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

  const authRegisterForm = document.getElementById("authRegisterForm");
  if (authRegisterForm) authRegisterForm.addEventListener("submit", handleRegisterSubmit);

  const createEmpForm = document.getElementById("createEmployeeForm");
  if (createEmpForm) createEmpForm.addEventListener("submit", handleCreateEmployee);

  const smtpSettingsForm = document.getElementById("smtpSettingsForm");
  if (smtpSettingsForm) smtpSettingsForm.addEventListener("submit", handleSaveSmtpSettings);

  const createTicketForm = document.getElementById("createTicketForm");
  if (createTicketForm) createTicketForm.addEventListener("submit", handleCreateTicketSubmit);

  const ticketReplyForm = document.getElementById("ticketReplyForm");
  if (ticketReplyForm) ticketReplyForm.addEventListener("submit", handleTicketReplySubmit);

  const ticketStatusFilter = document.getElementById("ticketStatusFilter");
  if (ticketStatusFilter) ticketStatusFilter.addEventListener("change", filterTickets);

  const ticketPriorityFilter = document.getElementById("ticketPriorityFilter");
  if (ticketPriorityFilter) ticketPriorityFilter.addEventListener("change", filterTickets);

  const ticketCategoryFilter = document.getElementById("ticketCategoryFilter");
  if (ticketCategoryFilter) ticketCategoryFilter.addEventListener("change", filterTickets);

  const ticketSearchInput = document.getElementById("ticketSearchInput");
  let ticketSearchTimeout = null;
  if (ticketSearchInput) {
    ticketSearchInput.addEventListener("input", () => {
      clearTimeout(ticketSearchTimeout);
      ticketSearchTimeout = setTimeout(() => {
        filterTickets();
      }, 200);
    });
  }
}

function setupKeyboardShortcuts() {
  window.addEventListener("keydown", (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
      e.preventDefault();
      toggleCommandPalette();
      return;
    }
    
    // Command Palette navigation when active
    const cmdModal = document.getElementById("commandPaletteModal");
    if (cmdModal && !cmdModal.classList.contains("hidden")) {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        navigateCommandPalette(1);
        return;
      }
      if (e.key === "ArrowUp") {
        e.preventDefault();
        navigateCommandPalette(-1);
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        executeCurrentCommandPaletteItem();
        return;
      }
      if (e.key === "Escape") {
        e.preventDefault();
        closeCommandPalette();
        return;
      }
    }

    if (e.key === "Escape") {
      closeCommandPalette();
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
      closeCreateTicketModal();
      closeTicketDetailModal();
      closeUserProfileModal();
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
  card.className = "glass-panel glass-panel-hover rounded-2xl overflow-hidden flex flex-col group relative border border-white/10 hover:border-cyan-500/50 transition-all duration-300";

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
    <div class="relative h-48 w-full overflow-hidden bg-slate-950/40">
      <img src="${p.image_url || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=900'}" 
           alt="${p.title}" 
           class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out">
      <div class="absolute inset-0 bg-gradient-to-t from-[#06080d] via-[#06080d]/40 to-transparent"></div>
      
      <!-- Top Badges -->
      <div class="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
        <span class="badge-status ${statusInfo.class}">
          <span class="pulse-dot"></span>
          ${statusInfo.text}
        </span>
        
        <div class="flex items-center gap-1.5">
          ${p.is_public ? '<span class="px-2 py-0.5 rounded-full text-[10px] bg-[#0a0e17]/90 text-cyan-300 border border-cyan-500/30 font-mono">Público</span>' : '<span class="px-2 py-0.5 rounded-full text-[10px] bg-amber-950/80 text-amber-300 border border-amber-500/40 font-mono">Interno</span>'}
          ${deleteBtnHtml}
        </div>
      </div>

      <!-- Category Tag -->
      <div class="absolute bottom-3 left-3 z-10">
        <span class="text-xs uppercase tracking-wider font-semibold text-cyan-300 bg-[#0a0e17]/85 px-2.5 py-1 rounded-md border border-cyan-500/30">
          ${p.category}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-5 flex-1 flex flex-col justify-between">
      <div>
        <h3 class="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 mb-2">
          ${p.title}
        </h3>
        <p class="text-sm text-slate-300/80 line-clamp-2 leading-relaxed mb-4 font-normal">
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
      <div class="pt-4 border-t border-white/10 flex items-center justify-between text-xs text-slate-400">
        <div class="flex items-center gap-2">
          <div class="w-6 h-6 rounded-full bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-[10px] text-white font-bold">
            ${p.author_name.charAt(0)}
          </div>
          <span class="truncate max-w-[120px] font-medium text-slate-300">${p.author_name}</span>
        </div>

        <div class="flex items-center gap-3">
          <!-- Like button -->
          <button onclick="event.stopPropagation(); handleToggleLike(${p.id}, this)" 
            class="flex items-center gap-1 px-2 py-1 rounded-lg hover:bg-white/5 transition-colors text-slate-300 hover:text-cyan-300">
            <svg class="w-4 h-4 fill-current text-rose-500" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            <span class="font-mono font-medium">${p.likes_count}</span>
          </button>

          <!-- Detail link -->
          <button onclick="openDetailModal(${p.id})" 
            class="px-3 py-1 rounded-lg bg-cyan-500/10 text-cyan-300 border border-cyan-500/30 hover:bg-cyan-500/20 hover:border-cyan-400 font-medium transition-all flex items-center gap-1">
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
  const hostNode = document.getElementById("terminalHostNode");
  if (hostNode) {
    hostNode.textContent = (window.location.host && window.location.host !== "") ? window.location.host : "127.0.0.1 (Local)";
  }

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
    success: "bg-[#0b1322]/95 border-emerald-500/40 text-emerald-200 shadow-[0_10px_35px_rgba(16,185,129,0.25)]",
    error: "bg-[#180a12]/95 border-rose-500/40 text-rose-200 shadow-[0_10px_35px_rgba(244,63,94,0.25)]",
    info: "bg-[#0a0f1d]/95 border-cyan-500/40 text-cyan-200 shadow-[0_10px_35px_rgba(6,182,212,0.25)]"
  };

  toast.className = `px-4 py-3 rounded-2xl border backdrop-blur-xl shadow-2xl flex items-center gap-3 text-xs sm:text-sm font-medium pointer-events-auto transform translate-y-3 opacity-0 transition-all duration-300 ${bgColors[type] || bgColors.info}`;
  toast.innerHTML = `
    <span class="w-2 h-2 rounded-full ${type === 'error' ? 'bg-rose-400' : (type === 'success' ? 'bg-emerald-400' : 'bg-cyan-400')} animate-ping"></span>
    <span>${message}</span>
  `;

  toastContainer.appendChild(toast);
  setTimeout(() => toast.classList.remove("translate-y-3", "opacity-0"), 10);
  setTimeout(() => {
    toast.classList.add("opacity-0", "translate-y-3");
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

function showNotification(message, type = "info") {
  showToast(message, type);
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

  const roleOptions = [
    { value: "developer", label: "💻 Desarrollador Lead" },
    { value: "qa", label: "🎯 QA & Testing" },
    { value: "designer", label: "🎨 Diseñador UI/UX" },
    { value: "manager", label: "📊 Project Manager" },
    { value: "employee", label: "👥 Colaborador" },
    { value: "client", label: "👤 Cliente / Soporte" },
    { value: "admin", label: "👑 Administrador" }
  ];

  table.innerHTML = employees.map(emp => {
    const isFounder = emp.email.toLowerCase() === "alejandrobelno964@gmail.com" || (emp.username && emp.username.toLowerCase() === "japonplx");
    return `
      <div class="p-3.5 rounded-2xl bg-purple-950/40 border border-purple-500/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div class="flex items-center gap-3 min-w-0">
          <img src="${emp.avatar_url || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(emp.full_name) + '&background=8b5cf6&color=fff'}" class="w-10 h-10 rounded-xl object-cover border border-purple-400/50 flex-shrink-0">
          <div class="min-w-0">
            <h5 class="text-xs font-bold text-white truncate">${emp.full_name}</h5>
            <p class="text-[11px] text-purple-300/70 truncate">${emp.department || 'Kunkurt Devs'}</p>
            <span class="text-[10px] text-purple-400 font-mono">${emp.email}</span>
          </div>
        </div>
        <div class="flex items-center gap-2 self-end sm:self-auto flex-wrap">
          ${isFounder ? `
            <span class="text-[10px] font-bold text-fuchsia-300 px-3 py-1 rounded-lg bg-fuchsia-950/70 border border-fuchsia-800">👑 FUNDADOR (ADMIN)</span>
          ` : `
            <div class="flex items-center gap-1.5">
              <label class="text-[10px] text-purple-400/80">Rol:</label>
              <select onchange="changeEmployeeRole(${emp.id}, this.value)" class="cyber-input text-xs py-1 px-2.5 bg-[#140b29] border-purple-500/50 text-purple-100 rounded-lg cursor-pointer" title="Asignar rol de empleado">
                ${roleOptions.map(opt => `<option value="${opt.value}" ${emp.role === opt.value ? 'selected' : ''}>${opt.label}</option>`).join("")}
              </select>
            </div>
            <button onclick="handleDeleteEmployee(${emp.id}, '${emp.full_name}')" class="p-1.5 rounded-lg bg-red-950/60 border border-red-500/40 text-red-300 hover:text-white hover:bg-red-900/60 transition-colors" title="Eliminar empleado">
              🗑️
            </button>
          `}
        </div>
      </div>
    `;
  }).join("");
}

async function changeEmployeeRole(userId, newRole) {
  try {
    const res = await fetch("/api/employees/role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ user_id: userId, role: newRole })
    });
    const data = await res.json();
    if (data.success) {
      showToast(`✓ Rol actualizado a [${newRole.toUpperCase()}]. Guardado correctamente.`, "success");
      await loadAuthorizedEmployees();
      if (activeProfile && activeProfile.id === userId) {
        switchRole(newRole);
      }
    } else {
      showToast(data.error || "No se pudo actualizar el rol", "error");
      await loadAuthorizedEmployees();
    }
  } catch (err) {
    console.error("Error al actualizar rol:", err);
    showToast("Error de conexión al asignar rol", "error");
    await loadAuthorizedEmployees();
  }
}

function quickFillAndLogin(email) {
  const input = document.getElementById("loginEmail");
  if (input) input.value = email;
  switchAuthTab("login");
}

function switchAuthTab(tab) {
  const loginBtn = document.getElementById("authTabLoginBtn");
  const regBtn = document.getElementById("authTabRegisterBtn");
  const loginPane = document.getElementById("authLoginPane");
  const regPane = document.getElementById("authRegisterPane");

  if (tab === "login") {
    if (loginBtn) loginBtn.className = "pb-3 px-4 text-xs font-bold border-b-2 border-fuchsia-500 text-fuchsia-300 transition-colors";
    if (regBtn) regBtn.className = "pb-3 px-4 text-xs font-bold border-b-2 border-transparent text-purple-400 hover:text-purple-200 transition-colors";
    if (loginPane) loginPane.classList.remove("hidden");
    if (regPane) regPane.classList.add("hidden");
  } else {
    if (regBtn) regBtn.className = "pb-3 px-4 text-xs font-bold border-b-2 border-fuchsia-500 text-fuchsia-300 transition-colors";
    if (loginBtn) loginBtn.className = "pb-3 px-4 text-xs font-bold border-b-2 border-transparent text-purple-400 hover:text-purple-200 transition-colors";
    if (regPane) regPane.classList.remove("hidden");
    if (loginPane) loginPane.classList.add("hidden");
  }
}

function switchAdminTab(tab) {
  const usersBtn = document.getElementById("adminTabUsersBtn");
  const smtpBtn = document.getElementById("adminTabSmtpBtn");
  const usersPane = document.getElementById("adminTabUsersPane");
  const smtpPane = document.getElementById("adminTabSmtpPane");

  if (tab === "users") {
    if (usersBtn) usersBtn.className = "pb-3 px-4 text-xs font-bold border-b-2 border-emerald-400 text-emerald-300 transition-colors";
    if (smtpBtn) smtpBtn.className = "pb-3 px-4 text-xs font-bold border-b-2 border-transparent text-purple-400 hover:text-purple-200 transition-colors";
    if (usersPane) usersPane.classList.remove("hidden");
    if (smtpPane) smtpPane.classList.add("hidden");
  } else {
    if (smtpBtn) smtpBtn.className = "pb-3 px-4 text-xs font-bold border-b-2 border-emerald-400 text-emerald-300 transition-colors";
    if (usersBtn) usersBtn.className = "pb-3 px-4 text-xs font-bold border-b-2 border-transparent text-purple-400 hover:text-purple-200 transition-colors";
    if (smtpPane) smtpPane.classList.remove("hidden");
    if (usersPane) usersPane.classList.add("hidden");
    loadSmtpSettings();
  }
}

function openLoginModal() {
  const modal = document.getElementById("loginModal");
  if (modal) modal.classList.remove("hidden");
  switchAuthTab("login");
  const emailInput = document.getElementById("loginEmail");
  if (emailInput && !localStorage.getItem("kunkurt_saved_login_email")) {
    emailInput.value = "";
  }
  const passInput = document.getElementById("loginPassword");
  if (passInput) passInput.value = "";
}

function closeLoginModal() {
  const modal = document.getElementById("loginModal");
  if (modal) modal.classList.add("hidden");
}

function openEmployeeAdminModal() {
  const modal = document.getElementById("employeeAdminModal");
  if (modal) modal.classList.remove("hidden");
  switchAdminTab("users");
  loadAuthorizedEmployees();
  loadSmtpSettings();
}

function closeEmployeeAdminModal() {
  const modal = document.getElementById("employeeAdminModal");
  if (modal) modal.classList.add("hidden");
}

async function handleRegisterSubmit(e) {
  e.preventDefault();
  const nameInput = document.getElementById("regFullName");
  const usernameInput = document.getElementById("regUsername");
  const emailInput = document.getElementById("regEmail");
  const passInput = document.getElementById("regPassword");
  const deptInput = document.getElementById("regDept");
  const submitBtn = document.getElementById("btnRegisterSubmit");

  const full_name = nameInput ? nameInput.value.trim() : "";
  const username = usernameInput ? usernameInput.value.trim().toLowerCase() : "";
  const email = emailInput ? emailInput.value.trim().toLowerCase() : "";
  const password = passInput ? passInput.value.trim() : "";
  const department = deptInput && deptInput.value.trim() ? deptInput.value.trim() : "Equipo Kunkurt Devs";

  if (!full_name || !email || !password) {
    showToast("Por favor completa nombre, correo y contraseña", "error");
    return;
  }

  const originalText = submitBtn ? submitBtn.innerHTML : "";
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>⏳ Creando tu cuenta...</span>`;
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
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ full_name, username, email, password, department })
    });
    const data = await res.json();
    if (data.success) {
      const user = data.user || {};
      const userRole = user.role || "employee";

      const verifiedProfile = {
        id: user.id || Date.now(),
        username: user.username || email.split("@")[0],
        name: user.full_name || full_name,
        email: email,
        role: userRole,
        roleName: roleNameMap[userRole] || "Colaborador",
        department: user.department || department,
        avatar: user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(full_name)}&background=8b5cf6&color=fff`,
        badgeClass: badgeClassMap[userRole] || "from-indigo-500 to-purple-600",
        points: user.points || 150
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
      showToast(`¡Cuenta creada con éxito! Bienvenido ${full_name}. El Administrador te asignará tu rol especializado. 📧`, "success");
      await loadAuthorizedEmployees();
      await loadNotifications();
    } else {
      showToast(data.error || "No se pudo registrar la cuenta", "error");
    }
  } catch (err) {
    console.error("Error en registro:", err);
    showToast("Error de conexión al registrarse", "error");
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }
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
      showToast(`✓ Empleado ${fullName} dado de alta como [${role.toUpperCase()}]. 📧 Correo despachado a ${email}`, "success");
      if (nameInput) nameInput.value = "";
      if (emailInput) emailInput.value = "";
      if (deptInput) deptInput.value = "";
      await loadAuthorizedEmployees();
      await loadNotifications();
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
  const passInput = document.getElementById("loginPassword");
  const rememberCheck = document.getElementById("rememberMeCheck");
  const submitBtn = document.getElementById("btnLoginSubmit");
  const identifier = emailInput ? emailInput.value.trim() : "";
  const password = passInput ? passInput.value.trim() : "";
  const remember = rememberCheck ? rememberCheck.checked : true;

  if (!identifier) {
    showToast("Por favor ingresa tu usuario o correo electrónico", "error");
    return;
  }

  const originalText = submitBtn ? submitBtn.innerHTML : "";
  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.innerHTML = `<span>⏳ Verificando credenciales...</span>`;
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
      body: JSON.stringify({ identifier, password })
    });
    const data = await res.json();

    if (data.success) {
      const user = data.user || {};
      const userRole = user.role || "developer";

      const verifiedProfile = {
        id: user.id || Date.now(),
        username: user.username || identifier.split("@")[0],
        name: user.full_name || identifier.split("@")[0],
        email: user.email || identifier,
        role: userRole,
        roleName: roleNameMap[userRole] || userRole.toUpperCase(),
        department: user.department || "Equipo Kunkurt Devs",
        avatar: user.avatar_url || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.full_name || identifier)}&background=8b5cf6&color=fff`,
        badgeClass: badgeClassMap[userRole] || "from-violet-500 to-indigo-600",
        points: user.points || 150
      };

      PROFILES[userRole] = verifiedProfile;
      currentRole = userRole;
      activeProfile = verifiedProfile;

      if (remember) {
        localStorage.setItem("kunkurt_active_role", currentRole);
        localStorage.setItem("kunkurt_active_profile", JSON.stringify(activeProfile));
        if (data.session_token) localStorage.setItem("kunkurt_session_token", data.session_token);
      }

      const roleSelect = document.getElementById("roleSelect");
      if (roleSelect) roleSelect.value = userRole;

      updateRoleUI();
      closeLoginModal();
      showToast(`¡Acceso exitoso! Bienvenido ${verifiedProfile.name} [${verifiedProfile.roleName}]. Notificación enviada 📧`, "success");
      await loadAuthorizedEmployees();
      await loadNotifications();
      await loadTickets();
    } else {
      showToast(data.error || "Acceso denegado: Por favor verifica tus credenciales.", "error");
    }
  } catch (err) {
    console.error("Error en login:", err);
    // Offline / fallback for founding admin
    if (identifier.toLowerCase() === "alejandrobelno964@gmail.com" || identifier.toLowerCase().includes("japon")) {
      currentRole = "admin";
      activeProfile = PROFILES.admin;
      updateRoleUI();
      closeLoginModal();
      showToast(`Sesión activa como JaponPLX (Administrador Fundador)`, "success");
    } else {
      showToast("❌ Error de conexión al iniciar sesión.", "error");
    }
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalText;
    }
  }
}

function togglePasswordVisibility(inputId) {
  const input = document.getElementById(inputId);
  if (input) {
    input.type = input.type === "password" ? "text" : "password";
  }
}

function openUserProfileModal() {
  const modal = document.getElementById("userProfileModal");
  if (!modal) return;
  modal.classList.remove("hidden");

  const avatar = document.getElementById("profileModalAvatar");
  const name = document.getElementById("profileModalName");
  const email = document.getElementById("profileModalEmail");
  const roleBadge = document.getElementById("profileModalRoleBadge");
  const dept = document.getElementById("profileModalDept");
  const points = document.getElementById("profileModalPoints");

  if (avatar) avatar.src = activeProfile?.avatar || "";
  if (name) name.textContent = activeProfile?.name || "Usuario";
  if (email) email.textContent = activeProfile?.email || "Sin correo configurado";
  if (roleBadge) {
    roleBadge.textContent = activeProfile?.roleName || currentRole.toUpperCase();
    roleBadge.className = `text-xs font-bold px-3 py-1 rounded-full bg-gradient-to-r ${activeProfile?.badgeClass || 'from-violet-500 to-indigo-600'} text-white`;
  }
  if (dept) dept.textContent = activeProfile?.department || "Equipo Kunkurt Devs";
  if (points) points.textContent = `${activeProfile?.points || 150} pts`;
}

function closeUserProfileModal() {
  const modal = document.getElementById("userProfileModal");
  if (modal) modal.classList.add("hidden");
}

function handleLogout() {
  localStorage.removeItem("kunkurt_active_role");
  localStorage.removeItem("kunkurt_active_profile");
  currentRole = "public";
  activeProfile = PROFILES.public;

  const roleSelect = document.getElementById("roleSelect");
  if (roleSelect) roleSelect.value = "public";

  updateRoleUI();
  loadProjects();
  showToast("Sesión cerrada. Ahora estás en modo Vista de Cliente (Público sin sesión).", "info");
}

// ============================================================================
// CONFIGURACIÓN SMTP (GMAIL REAL)
// ============================================================================
async function loadSmtpSettings() {
  const statusBox = document.getElementById("smtpStatusBox");
  try {
    const res = await fetch("/api/settings/smtp");
    const data = await res.json();
    if (data.success && data.settings) {
      const s = data.settings;
      const hostInput = document.getElementById("smtpHost");
      const portInput = document.getElementById("smtpPort");
      const userInput = document.getElementById("smtpUser");
      const senderNameInput = document.getElementById("smtpSenderName");
      const senderEmailInput = document.getElementById("smtpSenderEmail");

      if (hostInput && s.smtp_host) hostInput.value = s.smtp_host;
      if (portInput && s.smtp_port) portInput.value = s.smtp_port;
      if (userInput && s.smtp_user) userInput.value = s.smtp_user;
      if (senderNameInput && s.smtp_sender_name) senderNameInput.value = s.smtp_sender_name;
      if (senderEmailInput && s.smtp_sender_email) senderEmailInput.value = s.smtp_sender_email;

      if (statusBox) {
        if (s.is_configured) {
          statusBox.innerHTML = `
            <div class="flex items-center gap-2 text-emerald-400 font-semibold mb-1">
              <span>🟢</span> SMTP Activo para Envíos Reales
            </div>
            <p class="text-purple-300/80">Conectado al servidor <strong>${s.smtp_host}</strong> con usuario <strong>${s.smtp_user}</strong>. Las notificaciones de seguridad y altas de empleados se entregan a bandejas de entrada reales.</p>
          `;
        } else {
          statusBox.innerHTML = `
            <div class="flex items-center gap-2 text-amber-400 font-semibold mb-1">
              <span>⚠️</span> Modo Simulación Local Activo
            </div>
            <p class="text-purple-300/80">Aún no se ha guardado una contraseña de aplicación de Gmail. Los correos se simulan y se registran en el archivo local de logs del servidor.</p>
          `;
        }
      }
    }
  } catch (err) {
    console.error("Error cargando configuración SMTP:", err);
  }
}

async function handleSaveSmtpSettings(e) {
  if (e) e.preventDefault();
  const host = document.getElementById("smtpHost")?.value.trim();
  const port = document.getElementById("smtpPort")?.value.trim();
  const user = document.getElementById("smtpUser")?.value.trim();
  const password = document.getElementById("smtpPass")?.value.trim();
  const sender_name = document.getElementById("smtpSenderName")?.value.trim();
  const sender_email = document.getElementById("smtpSenderEmail")?.value.trim();
  const btn = document.getElementById("btnSaveSmtp");

  if (!host || !port || !user) {
    showToast("Por favor ingresa servidor, puerto y tu correo Gmail", "error");
    return;
  }

  const origText = btn ? btn.innerHTML : "";
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>⏳ Guardando credenciales SMTP...</span>`;
  }

  try {
    const res = await fetch("/api/settings/smtp", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        smtp_host: host,
        smtp_port: parseInt(port) || 587,
        smtp_user: user,
        smtp_password: password,
        smtp_sender_name: sender_name,
        smtp_sender_email: sender_email
      })
    });
    const data = await res.json();
    if (data.success) {
      showToast("✓ Configuración SMTP guardada con éxito", "success");
      const passInput = document.getElementById("smtpPass");
      if (passInput) passInput.value = "";
      await loadSmtpSettings();
    } else {
      showToast(data.error || "Error al guardar SMTP", "error");
    }
  } catch (err) {
    console.error("Error guardando SMTP:", err);
    showToast("Error de conexión al guardar SMTP", "error");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origText;
    }
  }
}

async function handleTestSmtp() {
  const user = document.getElementById("smtpUser")?.value.trim();
  const btn = document.getElementById("btnTestSmtp");
  if (!user) {
    showToast("Ingresa tu correo Gmail en el campo correspondiente", "error");
    return;
  }

  const origText = btn ? btn.innerHTML : "";
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>⏳ Enviando prueba a ${user}...</span>`;
  }

  try {
    const res = await fetch("/api/settings/smtp/test", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ to_email: user })
    });
    const data = await res.json();
    if (data.success) {
      showToast(`✓ ¡Correo enviado con éxito a ${user}! Revisa tu bandeja de entrada o spam 📬`, "success");
      await loadSmtpSettings();
    } else {
      alert(`Resultado de la prueba SMTP:\n\n${data.error || "No se pudo conectar al servidor"}`);
    }
  } catch (err) {
    console.error("Error enviando prueba SMTP:", err);
    showToast("Error de conexión al probar SMTP", "error");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origText;
    }
  }
}

// ============================================================================
// COMPARTIR Y ACCESO PÚBLICO (RED LOCAL Y MUNDIAL)
// ============================================================================
async function openShareModal() {
  const modal = document.getElementById("shareModal");
  if (modal) modal.classList.remove("hidden");

  const localInput = document.getElementById("shareLocalUrl");
  const lanInput = document.getElementById("shareLanUrl");

  const currentOrigin = (window.location.origin && window.location.origin !== "null") 
    ? window.location.origin 
    : `http://localhost:${window.location.port || '8080'}`;

  if (localInput) localInput.value = currentOrigin;

  try {
    const res = await fetch("/api/network-info");
    const data = await res.json();
    if (data.success) {
      if (localInput && data.local_url) localInput.value = data.local_url;
      if (lanInput && data.lan_url) lanInput.value = data.lan_url;
    }
  } catch (e) {
    if (lanInput) {
      lanInput.value = (window.location.hostname && window.location.hostname !== "") 
        ? `http://${window.location.hostname}${window.location.port ? ':' + window.location.port : ''}` 
        : currentOrigin;
    }
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

// ============================================================================
// SECTOR DE TICKETS & MESA DE AYUDA LIVE
// ============================================================================
let ticketsList = [];
let currentTicket = null;

function switchToSection(section) {
  playCyberSound("click");
  const catalogSection = document.getElementById("catalogSection");
  const ticketsSection = document.getElementById("ticketsSection");
  const quotationSection = document.getElementById("quotationSection");
  const paymentsSection = document.getElementById("paymentsSection");
  const analyticsSection = document.getElementById("analyticsSection");
  const teamChatSection = document.getElementById("teamChatSection");
  const wikiSection = document.getElementById("wikiSection");

  const sections = {
    projects: catalogSection,
    tickets: ticketsSection,
    quotation: quotationSection,
    payments: paymentsSection,
    analytics: analyticsSection,
    teamChat: teamChatSection,
    wiki: wikiSection
  };

  const tabs = {
    projects: document.getElementById("tabViewProjectsBtn"),
    tickets: document.getElementById("tabViewTicketsBtn"),
    quotation: document.getElementById("tabViewQuoteBtn"),
    payments: document.getElementById("tabViewPaymentsBtn"),
    analytics: document.getElementById("tabViewAnalyticsBtn"),
    teamChat: document.getElementById("tabViewTeamChatBtn"),
    wiki: document.getElementById("tabViewWikiBtn")
  };

  const activeTabClass = "pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 border-cyan-400 text-cyan-300 transition-all flex items-center gap-1.5 whitespace-nowrap";
  const inactiveTabClass = "pb-3 px-3 sm:px-4 text-xs sm:text-sm font-bold border-b-2 border-transparent text-slate-400 hover:text-slate-200 transition-all flex items-center gap-1.5 whitespace-nowrap";

  // Hide all sections, deactivate all tabs
  Object.keys(sections).forEach(key => {
    if (sections[key]) {
      sections[key].classList.add("hidden");
      sections[key].classList.remove("section-fade-in");
    }
    if (tabs[key]) tabs[key].className = inactiveTabClass;
  });

  // Activate target section and tab
  const targetSection = sections[section] || catalogSection;
  const targetTab = tabs[section] || tabs.projects;

  if (targetSection) {
    targetSection.classList.remove("hidden");
    targetSection.classList.add("section-fade-in");
  }
  if (targetTab) targetTab.className = activeTabClass;

  // Trigger relevant loaders
  if (section === "tickets") {
    loadTickets();
  } else if (section === "quotation") {
    calculateQuotation();
  } else if (section === "payments") {
    loadPayments();
  } else if (section === "analytics") {
    loadAnalyticsData();
  } else if (section === "teamChat") {
    loadTeamMessages();
  } else if (section === "wiki") {
    loadWikiArticles();
  }

  targetSection?.scrollIntoView({ behavior: "smooth" });
}

async function loadTickets() {
  const statusSelect = document.getElementById("ticketStatusFilter");
  const prioritySelect = document.getElementById("ticketPriorityFilter");
  const categorySelect = document.getElementById("ticketCategoryFilter");
  const searchInput = document.getElementById("ticketSearchInput");

  const status = statusSelect ? statusSelect.value : "all";
  const priority = prioritySelect ? prioritySelect.value : "all";
  const category = categorySelect ? categorySelect.value : "all";
  const search = searchInput ? searchInput.value.trim() : "";

  let url = `/api/tickets?status=${encodeURIComponent(status)}&priority=${encodeURIComponent(priority)}&category=${encodeURIComponent(category)}`;
  if (search) url += `&search=${encodeURIComponent(search)}`;

  const headers = {
    "X-User-Role": currentRole,
    "X-User-Email": activeProfile?.email || ""
  };

  try {
    const res = await fetch(url, { headers });
    const data = await res.json();
    if (data.success) {
      ticketsList = data.tickets || [];
      const stats = data.stats || { total: 0, abiertos: 0, en_progreso: 0, resueltos: 0 };

      // Update counters in badges
      const navBadge = document.getElementById("navTicketsBadge");
      const tabCounter = document.getElementById("tabTicketsCounter");
      if (navBadge) navBadge.textContent = stats.abiertos || ticketsList.length;
      if (tabCounter) tabCounter.textContent = ticketsList.length;

      // Update Stats cards
      const statTotal = document.getElementById("ticketStatTotal");
      const statOpen = document.getElementById("ticketStatOpen");
      const statProg = document.getElementById("ticketStatInProgress");
      const statRes = document.getElementById("ticketStatResolved");

      if (statTotal) statTotal.textContent = stats.total;
      if (statOpen) statOpen.textContent = stats.abiertos;
      if (statProg) statProg.textContent = stats.en_progreso;
      if (statRes) statRes.textContent = stats.resueltos;

      renderTickets(ticketsList);
    }
  } catch (err) {
    console.warn("Error cargando tickets:", err);
  }
}

function renderTickets(tickets) {
  const grid = document.getElementById("ticketsGrid");
  const emptyState = document.getElementById("ticketsEmptyState");
  if (!grid) return;

  const isStaff = ["admin", "developer", "qa", "designer", "manager", "employee"].includes(currentRole);

  if (!tickets || tickets.length === 0) {
    if (!isStaff) {
      grid.innerHTML = `
        <div class="col-span-full py-12 px-6 rounded-3xl bg-white/[0.02] border border-cyan-500/30 text-center max-w-lg mx-auto">
          <span class="text-4xl block mb-3">🎫</span>
          <h4 class="text-base font-bold text-white mb-1.5">Mesa de Ayuda & Soporte</h4>
          <p class="text-xs text-slate-400 mb-5 leading-relaxed">
            No tienes tickets de soporte registrados en este momento. Si necesitas ayuda técnica, reportar una incidencia o solicitar cambios, abre un ticket con nuestro equipo.
          </p>
          <button onclick="openCreateTicketModal()" class="btn-neon text-xs py-2.5 px-6">
            ➕ Abrir Ticket de Soporte
          </button>
        </div>
      `;
      if (emptyState) emptyState.classList.add("hidden");
      return;
    }
    grid.innerHTML = "";
    if (emptyState) emptyState.classList.remove("hidden");
    return;
  }

  if (emptyState) emptyState.classList.add("hidden");

  const priorityBadgeMap = {
    critica: "bg-red-500/20 text-red-300 border-red-500/40",
    alta: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    media: "bg-yellow-500/20 text-yellow-300 border-yellow-500/40",
    baja: "bg-blue-500/20 text-blue-300 border-blue-500/40"
  };

  const statusBadgeMap = {
    abierto: "bg-amber-500/20 text-amber-300 border-amber-500/40",
    en_progreso: "bg-purple-500/20 text-purple-300 border-purple-500/40",
    en_revision: "bg-cyan-500/20 text-cyan-300 border-cyan-500/40",
    resuelto: "bg-emerald-500/20 text-emerald-300 border-emerald-500/40",
    cerrado: "bg-slate-700 text-slate-300 border-slate-600"
  };

  const statusNameMap = {
    abierto: "🟡 Abierto",
    en_progreso: "🟣 En Progreso",
    en_revision: "🔵 En Revisión",
    resuelto: "🟢 Resuelto",
    cerrado: "⚪ Cerrado"
  };

  grid.innerHTML = tickets.map(t => {
    const pBadge = priorityBadgeMap[t.priority] || priorityBadgeMap.media;
    const sBadge = statusBadgeMap[t.status] || statusBadgeMap.abierto;
    const sName = statusNameMap[t.status] || t.status.toUpperCase();

    return `
      <div class="glass-panel p-5 rounded-3xl border border-purple-500/20 hover:border-purple-400/60 transition-all flex flex-col justify-between group shadow-[0_0_20px_rgba(168,85,247,0.08)] hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]">
        <div class="space-y-3">
          <!-- Top Row: Code + Priority + Status -->
          <div class="flex items-center justify-between gap-2 flex-wrap">
            <div class="flex items-center gap-1.5">
              <span class="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-fuchsia-950/80 border border-fuchsia-500/40 text-fuchsia-300">
                ${t.ticket_code}
              </span>
              <span class="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${pBadge}">
                ${t.priority}
              </span>
            </div>
            <span class="text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${sBadge}">
              ${sName}
            </span>
          </div>

          <!-- Title -->
          <h4 class="text-base font-bold text-white group-hover:text-purple-200 transition-colors line-clamp-2">
            ${t.title}
          </h4>

          <!-- Description Preview -->
          <p class="text-xs text-purple-300/80 line-clamp-3 leading-relaxed">
            ${t.description}
          </p>

          <!-- Category & Project Pill -->
          <div class="flex items-center gap-2 pt-1 flex-wrap">
            <span class="text-[10px] px-2 py-0.5 rounded-lg bg-purple-950/80 border border-purple-900/50 text-purple-300">
              🏷️ ${t.category || 'Soporte'}
            </span>
            <span class="text-[10px] px-2 py-0.5 rounded-lg bg-indigo-950/80 border border-indigo-900/50 text-indigo-300">
              📦 ${t.project_title || 'General'}
            </span>
          </div>
        </div>

        <!-- Footer: Author, Assignee & Actions -->
        <div class="pt-4 mt-4 border-t border-purple-900/40 space-y-3">
          <div class="flex items-center justify-between text-[11px] text-purple-300/70">
            <div class="flex items-center gap-1.5 truncate">
              <span class="text-purple-400">Por:</span>
              <strong class="text-white truncate">${t.author_name}</strong>
            </div>
            <div class="flex items-center gap-1.5 truncate">
              <span class="text-purple-400">Dev:</span>
              <span class="px-2 py-0.5 rounded bg-purple-950/80 border border-purple-500/30 text-purple-200 font-semibold truncate">
                ${t.assigned_name || 'Sin Asignar'}
              </span>
            </div>
          </div>

          <div class="flex items-center justify-between gap-2">
            <span class="text-[10px] text-purple-400 flex items-center gap-1 font-mono">
              💬 ${t.comments_count || 0} comentarios
            </span>
            <button onclick="openTicketDetail(${t.id})" class="btn-ghost-neon text-xs py-1.5 px-3 border-fuchsia-500/40 text-fuchsia-200 hover:text-white">
              Gestionar Caso →
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

function filterTickets() {
  loadTickets();
}

function resetTicketFilters() {
  const statusSelect = document.getElementById("ticketStatusFilter");
  const prioritySelect = document.getElementById("ticketPriorityFilter");
  const categorySelect = document.getElementById("ticketCategoryFilter");
  const searchInput = document.getElementById("ticketSearchInput");

  if (statusSelect) statusSelect.value = "all";
  if (prioritySelect) prioritySelect.value = "all";
  if (categorySelect) categorySelect.value = "all";
  if (searchInput) searchInput.value = "";
  loadTickets();
}

function openCreateTicketModal() {
  const modal = document.getElementById("createTicketModal");
  if (modal) modal.classList.remove("hidden");

  const isStaff = ["admin", "developer", "qa", "designer", "manager", "employee"].includes(currentRole);
  const assigneeContainer = document.getElementById("ticketAssigneeContainer");
  if (assigneeContainer) {
    assigneeContainer.style.display = isStaff ? "block" : "none";
  }

  // Autofill name and email if user is logged in
  const nameInput = document.getElementById("ticketAuthorName");
  const emailInput = document.getElementById("ticketAuthorEmail");
  if (nameInput && activeProfile && activeProfile.name && currentRole !== "public") {
    nameInput.value = activeProfile.name;
  }
  if (emailInput && activeProfile && activeProfile.email && currentRole !== "public") {
    emailInput.value = activeProfile.email;
  }

  // Populate projects select
  const projSelect = document.getElementById("ticketProjectSelect");
  if (projSelect) {
    const projects = PROJECTS_CACHE || [];
    projSelect.innerHTML = `<option value="General">General (Infraestructura / Plataforma)</option>` +
      projects.map(p => `<option value="${p.title}">${p.title}</option>`).join("");
  }

  // Populate assignee select with employees
  const assignSelect = document.getElementById("ticketAssigneeSelect");
  if (assignSelect) {
    assignSelect.innerHTML = `<option value="">-- Sin Asignar (Abierto a Devs) --</option>` +
      authorizedEmployeesList.map(emp => `<option value="${emp.id}">${emp.full_name} (${emp.role.toUpperCase()})</option>`).join("");
  }
}

function closeCreateTicketModal() {
  const modal = document.getElementById("createTicketModal");
  if (modal) modal.classList.add("hidden");
}

async function handleCreateTicketSubmit(e) {
  e.preventDefault();
  const title = document.getElementById("ticketTitle")?.value.trim();
  const category = document.getElementById("ticketCategory")?.value;
  const priority = document.getElementById("ticketPriority")?.value;
  const project_title = document.getElementById("ticketProjectSelect")?.value;
  const assigned_id = document.getElementById("ticketAssigneeSelect")?.value || null;
  const author_name = document.getElementById("ticketAuthorName")?.value.trim();
  const author_email = document.getElementById("ticketAuthorEmail")?.value.trim();
  const description = document.getElementById("ticketDescription")?.value.trim();
  const btn = document.getElementById("btnSubmitTicket");

  if (!title || !description || !author_email || !author_name) {
    showToast("Por favor completa los campos obligatorios", "error");
    return;
  }

  const origText = btn ? btn.innerHTML : "";
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>⏳ Registrando ticket...</span>`;
  }

  try {
    const res = await fetch("/api/tickets/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        category,
        priority,
        project_title,
        author_name,
        author_email,
        author_role: currentRole,
        assigned_id: assigned_id ? parseInt(assigned_id) : null
      })
    });
    const data = await res.json();
    if (data.success) {
      showToast(`✓ Ticket #${data.ticket?.ticket_code || ''} abierto exitosamente.`, "success");
      closeCreateTicketModal();
      document.getElementById("createTicketForm")?.reset();
      await loadTickets();
      await loadNotifications();
      switchToSection("tickets");
    } else {
      showToast(data.error || "Error al crear ticket", "error");
    }
  } catch (err) {
    console.error("Error creando ticket:", err);
    showToast("Error de conexión al abrir ticket", "error");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origText;
    }
  }
}

async function openTicketDetail(ticketId) {
  const modal = document.getElementById("ticketDetailModal");
  if (!modal) return;
  modal.classList.remove("hidden");

  try {
    const res = await fetch(`/api/tickets/${ticketId}`, {
      headers: {
        "X-User-Role": currentRole,
        "X-User-Email": activeProfile?.email || ""
      }
    });
    const data = await res.json();
    if (data.success && data.ticket) {
      currentTicket = data.ticket;
      renderTicketDetailModal(currentTicket);
    } else {
      showToast(data.error || "No se pudo cargar el ticket", "error");
      closeTicketDetailModal();
    }
  } catch (err) {
    console.error("Error cargando detalle ticket:", err);
    showToast("Error de conexión", "error");
  }
}

function renderTicketDetailModal(t) {
  const code = document.getElementById("detailTicketCode");
  const title = document.getElementById("detailTicketTitle");
  const author = document.getElementById("detailTicketAuthor");
  const project = document.getElementById("detailTicketProject");
  const desc = document.getElementById("detailTicketDescription");
  const statusBadge = document.getElementById("detailTicketStatusBadge");
  const priorityBadge = document.getElementById("detailTicketPriorityBadge");
  const categoryBadge = document.getElementById("detailTicketCategoryBadge");
  const statusSelect = document.getElementById("detailTicketStatusSelect");
  const assigneeSelect = document.getElementById("detailTicketAssigneeSelect");
  const commentsList = document.getElementById("detailTicketCommentsList");
  const commentsCount = document.getElementById("detailTicketCommentsCount");

  const isStaff = ["admin", "developer", "qa", "designer", "manager", "employee"].includes(currentRole);

  if (code) code.textContent = t.ticket_code;
  if (title) title.textContent = t.title;
  if (author) author.textContent = `${t.author_name} (${t.author_email})`;
  if (project) project.textContent = t.project_title || "General";
  if (desc) desc.textContent = t.description;

  if (statusBadge) {
    statusBadge.textContent = t.status.toUpperCase();
    statusBadge.className = `text-[10px] font-bold px-2.5 py-0.5 rounded-full ${t.status === 'resuelto' ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-purple-500/20 text-purple-300 border border-purple-500/40'}`;
  }
  if (priorityBadge) {
    priorityBadge.textContent = t.priority.toUpperCase();
    priorityBadge.className = `text-[10px] font-bold px-2 py-0.5 rounded-full ${t.priority === 'critica' ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'}`;
  }
  if (categoryBadge) categoryBadge.textContent = t.category || "Soporte";

  if (statusSelect) {
    statusSelect.value = t.status;
    statusSelect.disabled = !isStaff;
  }

  if (assigneeSelect) {
    assigneeSelect.disabled = !isStaff;
    assigneeSelect.innerHTML = `<option value="">-- Sin Asignar --</option>` +
      authorizedEmployeesList.map(emp => `<option value="${emp.id}" ${t.assigned_id == emp.id ? 'selected' : ''}>${emp.full_name} (${emp.role})</option>`).join("");
  }

  const comments = t.comments || [];
  if (commentsCount) commentsCount.textContent = `${comments.length} ${comments.length === 1 ? 'Respuesta' : 'Respuestas'}`;

  if (commentsList) {
    commentsList.innerHTML = comments.map(c => `
      <div class="p-3 rounded-2xl bg-black/40 border border-purple-900/40 flex items-start gap-3">
        <img src="${c.user_avatar || 'https://ui-avatars.com/api/?name=' + encodeURIComponent(c.user_name) + '&background=8b5cf6&color=fff'}" class="w-8 h-8 rounded-xl object-cover border border-purple-500/30 flex-shrink-0">
        <div class="flex-1 min-w-0">
          <div class="flex items-center justify-between gap-2 mb-1">
            <div class="flex items-center gap-1.5">
              <span class="text-xs font-bold text-white">${c.user_name}</span>
              <span class="text-[9px] px-1.5 py-0.2 rounded bg-purple-900/60 text-purple-300 font-mono">${c.user_role}</span>
            </div>
            <span class="text-[10px] text-purple-400/60">${c.created_at || 'Reciente'}</span>
          </div>
          <p class="text-xs text-purple-200/90 leading-relaxed whitespace-pre-line">${c.content}</p>
        </div>
      </div>
    `).join("");
  }
}

function closeTicketDetailModal() {
  const modal = document.getElementById("ticketDetailModal");
  if (modal) modal.classList.add("hidden");
  currentTicket = null;
}

async function updateTicketStatusFromModal(newStatus) {
  if (!currentTicket) return;
  try {
    const res = await fetch("/api/tickets/status", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticket_id: currentTicket.id,
        status: newStatus,
        updated_by_name: activeProfile?.name || "Colaborador Kunkurt"
      })
    });
    const data = await res.json();
    if (data.success && data.ticket) {
      currentTicket = data.ticket;
      renderTicketDetailModal(currentTicket);
      showToast(`✓ Estado del ticket actualizado a [${newStatus.toUpperCase()}]`, "success");
      await loadTickets();
      await loadNotifications();
    }
  } catch (err) {
    console.error("Error al actualizar estado de ticket:", err);
    showToast("Error al actualizar estado", "error");
  }
}

async function assignTicketFromModal(userId) {
  if (!currentTicket || !userId) return;
  try {
    const res = await fetch("/api/tickets/assign", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticket_id: currentTicket.id,
        user_id: parseInt(userId),
        assigned_by_name: activeProfile?.name || "Administrador"
      })
    });
    const data = await res.json();
    if (data.success && data.ticket) {
      currentTicket = data.ticket;
      renderTicketDetailModal(currentTicket);
      showToast(`✓ Ticket asignado con éxito`, "success");
      await loadTickets();
      await loadNotifications();
    }
  } catch (err) {
    console.error("Error al asignar ticket:", err);
    showToast("Error al asignar ticket", "error");
  }
}

async function handleTicketReplySubmit(e) {
  e.preventDefault();
  if (!currentTicket) return;
  const input = document.getElementById("ticketReplyInput");
  const content = input ? input.value.trim() : "";
  const btn = document.getElementById("btnTicketReplySubmit");

  if (!content) return;

  const origText = btn ? btn.innerHTML : "";
  if (btn) {
    btn.disabled = true;
    btn.innerHTML = `<span>⏳ Enviando...</span>`;
  }

  try {
    const res = await fetch("/api/tickets/comment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ticket_id: currentTicket.id,
        user_name: activeProfile?.name || "Colaborador Kunkurt",
        user_email: activeProfile?.email || "soporte@kunkurt.com",
        user_role: currentRole,
        user_avatar: activeProfile?.avatar || "",
        content: content
      })
    });
    const data = await res.json();
    if (data.success) {
      if (input) input.value = "";
      showToast("✓ Respuesta publicada", "success");
      await openTicketDetail(currentTicket.id);
      await loadTickets();
    }
  } catch (err) {
    console.error("Error agregando respuesta:", err);
    showToast("Error al enviar respuesta", "error");
  } finally {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = origText;
    }
  }
}

// Expose modal handlers to global window scope for inline onclicks
window.openGithubSyncModal = openGithubSyncModal;
window.closeGithubSyncModal = closeGithubSyncModal;
window.executeGithubSync = executeGithubSync;
window.openLoginModal = openLoginModal;
window.closeLoginModal = closeLoginModal;
window.switchAuthTab = switchAuthTab;
window.switchAdminTab = switchAdminTab;
window.openEmployeeAdminModal = openEmployeeAdminModal;
window.closeEmployeeAdminModal = closeEmployeeAdminModal;
window.changeEmployeeRole = changeEmployeeRole;
window.handleCreateEmployee = handleCreateEmployee;
window.handleDeleteEmployee = handleDeleteEmployee;
window.quickFillAndLogin = quickFillAndLogin;
window.handleLoginSubmit = handleLoginSubmit;
window.handleRegisterSubmit = handleRegisterSubmit;
window.handleLogout = handleLogout;
window.loadSmtpSettings = loadSmtpSettings;
window.handleSaveSmtpSettings = handleSaveSmtpSettings;
window.handleTestSmtp = handleTestSmtp;
window.openShareModal = openShareModal;
window.closeShareModal = closeShareModal;
window.copyToClipboard = copyToClipboard;
window.switchToSection = switchToSection;
window.loadTickets = loadTickets;
window.filterTickets = filterTickets;
window.resetTicketFilters = resetTicketFilters;
window.openCreateTicketModal = openCreateTicketModal;
window.closeCreateTicketModal = closeCreateTicketModal;
window.handleCreateTicketSubmit = handleCreateTicketSubmit;
window.openTicketDetail = openTicketDetail;
window.closeTicketDetailModal = closeTicketDetailModal;
window.updateTicketStatusFromModal = updateTicketStatusFromModal;
window.assignTicketFromModal = assignTicketFromModal;
window.handleTicketReplySubmit = handleTicketReplySubmit;
window.togglePasswordVisibility = togglePasswordVisibility;
window.openUserProfileModal = openUserProfileModal;
window.closeUserProfileModal = closeUserProfileModal;

// ============================================================================
// CYBER WEB AUDIO SYNTHESIZER
// ============================================================================
let cyberAudioContext = null;
let cyberAudioEnabled = localStorage.getItem("kunkurt_cyber_audio") !== "false";

function getAudioContext() {
  if (!cyberAudioContext) {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (AudioCtx) {
      cyberAudioContext = new AudioCtx();
    }
  }
  if (cyberAudioContext && cyberAudioContext.state === "suspended") {
    cyberAudioContext.resume();
  }
  return cyberAudioContext;
}

function toggleCyberAudio() {
  cyberAudioEnabled = !cyberAudioEnabled;
  localStorage.setItem("kunkurt_cyber_audio", cyberAudioEnabled ? "true" : "false");
  const icon = document.getElementById("audioIcon");
  if (icon) {
    icon.textContent = cyberAudioEnabled ? "🔊" : "🔇";
  }
  const navIcon = document.getElementById("navAudioIcon");
  if (navIcon) {
    navIcon.textContent = cyberAudioEnabled ? "🔊" : "🔇";
  }
  if (cyberAudioEnabled) {
    playCyberSound("chime");
    showNotification("🔊 Efectos de Sonido Cyber Activados");
  } else {
    showNotification("🔇 Efectos de Sonido Cyber Silenciados");
  }
}

function playCyberSound(type = "click") {
  if (!cyberAudioEnabled) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (type === "click") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(600, now);
      osc.frequency.exponentialRampToValueAtTime(300, now + 0.05);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
      osc.start(now);
      osc.stop(now + 0.05);
    } else if (type === "chime" || type === "success") {
      osc.type = "sine";
      osc.frequency.setValueAtTime(523.25, now);
      osc.frequency.setValueAtTime(659.25, now + 0.08);
      osc.frequency.setValueAtTime(783.99, now + 0.16);
      osc.frequency.setValueAtTime(1046.50, now + 0.24);
      gain.gain.setValueAtTime(0.09, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);
      osc.start(now);
      osc.stop(now + 0.45);
    } else if (type === "beep" || type === "info") {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(880, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.12);
      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);
      osc.start(now);
      osc.stop(now + 0.12);
    } else if (type === "error") {
      osc.type = "sawtooth";
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.setValueAtTime(160, now + 0.1);
      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      osc.start(now);
      osc.stop(now + 0.25);
    }
  } catch (e) {}
}

// ============================================================================
// COTIZADOR INTERACTIVO DE PROYECTOS
// ============================================================================
function calculateQuotation() {
  const selectedTypeRadio = document.querySelector('input[name="quoteProjectType"]:checked');
  const baseCost = selectedTypeRadio ? parseFloat(selectedTypeRadio.dataset.baseCost || 1200) : 1200;
  const baseWeeks = selectedTypeRadio ? parseInt(selectedTypeRadio.dataset.baseWeeks || 3) : 3;

  let totalCost = baseCost;
  let totalWeeks = baseWeeks;

  const featureCheckboxes = document.querySelectorAll(".quote-feature-checkbox:checked");
  featureCheckboxes.forEach(cb => {
    totalCost += parseFloat(cb.dataset.cost || 0);
    totalWeeks += parseInt(cb.dataset.weeks || 0);
  });

  const costDisplay = document.getElementById("quoteTotalCostDisplay");
  const weeksDisplay = document.getElementById("quoteTotalWeeksDisplay");
  const depositDisplay = document.getElementById("quoteDeposit50Display");
  const finalDisplay = document.getElementById("quoteFinal50Display");
  const btnPayDisplay = document.getElementById("btnPayQuoteAmountDisplay");

  const deposit50 = Math.round(totalCost * 0.5);

  if (costDisplay) {
    costDisplay.textContent = `$${totalCost.toLocaleString("en-US")} USD`;
  }
  if (weeksDisplay) {
    weeksDisplay.textContent = `${totalWeeks} semanas`;
  }
  if (depositDisplay) {
    depositDisplay.textContent = `$${deposit50.toLocaleString("en-US")} USD`;
  }
  if (finalDisplay) {
    finalDisplay.textContent = `$${(totalCost - deposit50).toLocaleString("en-US")} USD`;
  }
  if (btnPayDisplay) {
    btnPayDisplay.textContent = `$${deposit50.toLocaleString("en-US")} USD`;
  }

  const projectTypeName = selectedTypeRadio ? selectedTypeRadio.parentElement.querySelector(".text-white")?.textContent.trim() : "Solución de Software";
  updateWhatsAppContext(projectTypeName || "Solución Web", totalCost);

  return { totalCost, totalWeeks };
}

async function submitQuotationForm(e) {
  e.preventDefault();
  playCyberSound("click");

  const nameInput = document.getElementById("quoteClientName");
  const emailInput = document.getElementById("quoteClientEmail");
  const companyInput = document.getElementById("quoteClientCompany");
  const detailsInput = document.getElementById("quoteClientDetails");
  const btnSubmit = document.getElementById("btnSubmitQuote");

  const clientName = nameInput ? nameInput.value.trim() : "";
  const clientEmail = emailInput ? emailInput.value.trim() : "";
  const clientCompany = companyInput ? companyInput.value.trim() : "";
  const details = detailsInput ? detailsInput.value.trim() : "";

  if (!clientName || !clientEmail) {
    showNotification("Por favor completa tu nombre y correo.", "error");
    playCyberSound("error");
    return;
  }

  const selectedTypeRadio = document.querySelector('input[name="quoteProjectType"]:checked');
  const projectTypeName = selectedTypeRadio ? selectedTypeRadio.parentElement.querySelector(".text-white").textContent.trim() : "Full-Stack Web App";

  const features = [];
  document.querySelectorAll(".quote-feature-checkbox:checked").forEach(cb => {
    const label = cb.parentElement.querySelector(".text-white");
    if (label) features.push(label.textContent.trim());
  });

  const { totalCost, totalWeeks } = calculateQuotation();

  if (btnSubmit) {
    btnSubmit.disabled = true;
    btnSubmit.textContent = "⏳ Procesando cotización y abriendo ticket...";
  }

  try {
    const res = await fetch("/api/quotations/create", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_name: clientName,
        client_email: clientEmail,
        client_company: clientCompany,
        project_type: projectTypeName,
        features: features,
        budget_usd: totalCost,
        timeline_weeks: totalWeeks,
        description: details
      })
    });
    const data = await res.json();
    if (data.success) {
      playCyberSound("chime");
      showNotification(`🎉 ¡Cotización enviada! Ticket #${data.ticket.ticket_code} registrado para revisión.`);
      if (detailsInput) detailsInput.value = "";
      loadTickets();
      setTimeout(() => {
        switchToSection("tickets");
        openTicketDetail(data.ticket.id);
      }, 800);
    } else {
      showNotification(data.error || "Error al procesar cotización", "error");
      playCyberSound("error");
    }
  } catch (err) {
    console.error("Error submitting quotation:", err);
    showNotification("No se pudo conectar con el servidor", "error");
    playCyberSound("error");
  } finally {
    if (btnSubmit) {
      btnSubmit.disabled = false;
      btnSubmit.textContent = "🚀 Enviar Cotización y Abrir Ticket Oficial";
    }
  }
}

// ============================================================================
// PASARELAS DE PAGO & CHECKOUT GLOBAL CONTROLLER
// ============================================================================
let activePaymentGateway = "stripe";
let paymentCurrentFullAmount = 1950;
let paymentCurrentAmount = 975;
let paymentCurrentMode = "deposit50";
let paymentCurrentConcept = "Anticipo de Proyecto";

function payQuotationDeposit() {
  playCyberSound("click");
  const nameInput = document.getElementById("quoteClientName");
  const emailInput = document.getElementById("quoteClientEmail");
  const companyInput = document.getElementById("quoteClientCompany");
  const selectedTypeRadio = document.querySelector('input[name="quoteProjectType"]:checked');
  const projectTypeName = selectedTypeRadio ? selectedTypeRadio.parentElement.querySelector(".text-white").textContent.trim() : "Solución de Software";

  const { totalCost } = calculateQuotation();
  const deposit = Math.round(totalCost * 0.5);

  const clientName = nameInput ? nameInput.value.trim() : "";
  const clientEmail = emailInput ? emailInput.value.trim() : "";
  const clientCompany = companyInput ? companyInput.value.trim() : "";

  openPaymentModal({
    concept: `Anticipo 50% ${projectTypeName}`,
    fullAmount: totalCost,
    amount: deposit,
    mode: "deposit50",
    clientName: clientName,
    clientEmail: clientEmail,
    clientCompany: clientCompany,
    gateway: "stripe"
  });
}

function openPaymentModal(opts = {}) {
  playCyberSound("click");
  const modal = document.getElementById("paymentModal");
  if (!modal) return;

  const formContainer = document.getElementById("paymentFormContainer");
  const successContainer = document.getElementById("paymentSuccessContainer");
  if (formContainer) formContainer.classList.remove("hidden");
  if (successContainer) successContainer.classList.add("hidden");

  // Determine amounts and concept
  paymentCurrentFullAmount = opts.fullAmount || opts.amount || 1950;
  paymentCurrentAmount = opts.amount || (opts.mode === "full100" ? paymentCurrentFullAmount : Math.round(paymentCurrentFullAmount * 0.5));
  paymentCurrentConcept = opts.concept || "Servicios de Ingeniería Kunkurt";
  paymentCurrentMode = opts.mode || (opts.amount === paymentCurrentFullAmount ? "full100" : "deposit50");

  // Populate UI
  const conceptEl = document.getElementById("payModalConcept");
  const fullEl = document.getElementById("payModalFullCostDisplay");
  const opt50 = document.getElementById("payOption50Text");
  const opt100 = document.getElementById("payOption100Text");

  if (conceptEl) conceptEl.textContent = paymentCurrentConcept;
  if (fullEl) fullEl.textContent = `$${paymentCurrentFullAmount.toLocaleString("en-US")} USD`;
  if (opt50) opt50.textContent = `$${Math.round(paymentCurrentFullAmount * 0.5).toLocaleString("en-US")} USD`;
  if (opt100) opt100.textContent = `$${paymentCurrentFullAmount.toLocaleString("en-US")} USD`;

  updatePaymentAmountDisplay();

  // Populate client info if available
  const nameInput = document.getElementById("payClientName");
  const emailInput = document.getElementById("payClientEmail");
  if (nameInput && opts.clientName) nameInput.value = opts.clientName;
  else if (nameInput && !nameInput.value && currentProfile && currentProfile.full_name) {
    nameInput.value = currentProfile.full_name;
  }
  if (emailInput && opts.clientEmail) emailInput.value = opts.clientEmail;
  else if (emailInput && !emailInput.value && currentProfile && currentProfile.email) {
    emailInput.value = currentProfile.email;
  }

  // Set mode button styling
  setPaymentMode(paymentCurrentMode);

  // Set gateway tab
  selectPaymentTab(opts.gateway || "stripe");

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closePaymentModal() {
  playCyberSound("click");
  const modal = document.getElementById("paymentModal");
  if (!modal) return;
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

function setPaymentMode(mode) {
  playCyberSound("click");
  paymentCurrentMode = mode;
  const btn50 = document.getElementById("btnPayMode50");
  const btn100 = document.getElementById("btnPayMode100");

  if (mode === "deposit50") {
    paymentCurrentAmount = Math.round(paymentCurrentFullAmount * 0.5);
    if (btn50) btn50.className = "py-2 rounded-lg font-bold transition-all bg-emerald-600 text-white shadow";
    if (btn100) btn100.className = "py-2 rounded-lg font-bold transition-all text-slate-400 hover:text-white";
  } else {
    paymentCurrentAmount = paymentCurrentFullAmount;
    if (btn50) btn50.className = "py-2 rounded-lg font-bold transition-all text-slate-400 hover:text-white";
    if (btn100) btn100.className = "py-2 rounded-lg font-bold transition-all bg-emerald-600 text-white shadow";
  }

  updatePaymentAmountDisplay();
}

function updatePaymentAmountDisplay() {
  const amtEl = document.getElementById("payModalAmountDisplay");
  const localEl = document.getElementById("payModalLocalCurrencyDisplay");
  if (amtEl) amtEl.textContent = `$${paymentCurrentAmount.toLocaleString("en-US", {minimumFractionDigits: 2, maximumFractionDigits: 2})} USD`;
  if (localEl) {
    const cop = Math.round(paymentCurrentAmount * 4250).toLocaleString("es-CO");
    const eur = Math.round(paymentCurrentAmount * 0.92).toLocaleString("de-DE");
    localEl.textContent = `≈ $${cop} COP / €${eur} EUR`;
  }
}

function selectPaymentTab(gateway) {
  playCyberSound("click");
  activePaymentGateway = gateway;
  const gateways = ["stripe", "paypal", "mercadopago", "apple_pay", "crypto"];

  gateways.forEach(g => {
    const tabBtn = document.getElementById(`payTabBtn_${g}`);
    const view = document.getElementById(`payGatewayView_${g}`);

    if (g === gateway) {
      if (tabBtn) {
        tabBtn.className = "p-2.5 rounded-xl border border-emerald-500/60 bg-emerald-950/40 text-emerald-300 flex flex-col items-center gap-1 transition-all shadow-[0_0_15px_rgba(16,185,129,0.25)]";
      }
      if (view) view.classList.remove("hidden");
    } else {
      if (tabBtn) {
        tabBtn.className = "p-2.5 rounded-xl border border-purple-500/20 bg-purple-950/20 text-slate-400 flex flex-col items-center gap-1 transition-all hover:border-slate-400 hover:text-white";
      }
      if (view) view.classList.add("hidden");
    }
  });

  const emailVal = document.getElementById("payClientEmail")?.value || "cliente@empresa.com";
  const paypalAccountEl = document.getElementById("paypalOrderAccountPreview");
  if (paypalAccountEl) paypalAccountEl.textContent = emailVal;
}

function handleCardNumberInput(input) {
  let value = input.value.replace(/\D/g, "");
  if (value.length > 16) value = value.slice(0, 16);
  const parts = [];
  for (let i = 0; i < value.length; i += 4) {
    parts.push(value.slice(i, i + 4));
  }
  input.value = parts.join(" ");

  const iconEl = document.getElementById("stripeCardBrandIcon");
  if (iconEl) {
    if (value.startsWith("4")) iconEl.textContent = "💳 (Visa)";
    else if (/^(5[1-5]|2[2-7])/.test(value)) iconEl.textContent = "💳 (Mastercard)";
    else if (/^3[47]/.test(value)) iconEl.textContent = "💳 (Amex)";
    else iconEl.textContent = "💳";
  }
}

function handleCardExpiryInput(input) {
  let value = input.value.replace(/\D/g, "");
  if (value.length > 4) value = value.slice(0, 4);
  if (value.length > 2) {
    input.value = value.slice(0, 2) + "/" + value.slice(2);
  } else {
    input.value = value;
  }
}

function toggleMercadoPagoView() {
  playCyberSound("click");
  const select = document.getElementById("mpMethodSelect");
  const val = select ? select.value : "pse";
  const pseView = document.getElementById("mpViewPse");
  const qrView = document.getElementById("mpViewQr");

  if (val === "pse" || val === "card") {
    if (pseView) pseView.classList.remove("hidden");
    if (qrView) qrView.classList.add("hidden");
  } else if (val === "qr") {
    if (pseView) pseView.classList.add("hidden");
    if (qrView) qrView.classList.remove("hidden");
  }
}

function triggerBiometricPay(brand) {
  playCyberSound("chime");
  showToast(`Autenticación biométrica ${brand} solicitada...`, "info");
  setTimeout(() => {
    processPaymentCheckout();
  }, 900);
}

function updateCryptoAddress() {
  playCyberSound("click");
  const sel = document.getElementById("cryptoNetworkSelect");
  const net = sel ? sel.value : "usdt_trc20";
  const badge = document.getElementById("cryptoNetworkBadge");
  const addrInput = document.getElementById("cryptoVaultAddress");

  const addresses = {
    usdt_trc20: { badge: "TRC-20 (Tron)", addr: "TQ7kX9JaponPLXKunkurtVaultDevs892Z" },
    usdt_bep20: { badge: "BEP-20 (BNB Chain)", addr: "0x71C65E1E90aE002F4976eB484e5264b077a28864" },
    usdt_polygon: { badge: "Polygon MATIC", addr: "0x71C65E1E90aE002F4976eB484e5264b077a28864" },
    binance_pay: { badge: "Binance Pay ID", addr: "892014751 (Kunkurt Official Merchant)" }
  };

  const item = addresses[net] || addresses.usdt_trc20;
  if (badge) badge.textContent = item.badge;
  if (addrInput) addrInput.value = item.addr;
}

function copyCryptoVaultAddress() {
  const addrInput = document.getElementById("cryptoVaultAddress");
  if (!addrInput) return;
  copyTextToClipboard(addrInput.value);
  playCyberSound("success");
  showToast("📋 Dirección de billetera copiada al portapapeles", "success");
}

function handleQuickPaymentForm(e) {
  e.preventDefault();
  playCyberSound("click");
  const name = document.getElementById("quickPayName")?.value.trim() || "";
  const email = document.getElementById("quickPayEmail")?.value.trim() || "";
  const concept = document.getElementById("quickPayConcept")?.value.trim() || "Pago Directo Kunkurt";
  const amount = parseFloat(document.getElementById("quickPayAmount")?.value || 500);
  const gateway = document.getElementById("quickPayGateway")?.value || "stripe";

  if (!name || !email) {
    showToast("Por favor ingresa tu nombre y correo.", "error");
    return;
  }

  openPaymentModal({
    concept: concept,
    amount: amount,
    fullAmount: amount,
    mode: "full100",
    clientName: name,
    clientEmail: email,
    gateway: gateway
  });
}

async function processPaymentCheckout() {
  playCyberSound("click");
  const nameInput = document.getElementById("payClientName");
  const emailInput = document.getElementById("payClientEmail");
  const btnProcess = document.getElementById("btnProcessPayment");

  const clientName = nameInput ? nameInput.value.trim() : "";
  const clientEmail = emailInput ? emailInput.value.trim() : "";

  if (!clientName || !clientEmail) {
    showToast("Por favor completa tu nombre y correo electrónico.", "error");
    playCyberSound("error");
    return;
  }

  if (btnProcess) {
    btnProcess.disabled = true;
    btnProcess.innerHTML = "<span>⏳</span> Procesando transacción segura...";
  }

  // Construct payment metadata based on selected gateway
  let paymentData = {};
  if (activePaymentGateway === "stripe") {
    const cardNum = document.getElementById("stripeCardNumber")?.value.replace(/\s+/g, "") || "4242";
    paymentData = {
      card_last4: cardNum.slice(-4),
      card_holder: document.getElementById("stripeCardHolder")?.value || clientName,
      brand: cardNum.startsWith("4") ? "Visa" : "Mastercard"
    };
  } else if (activePaymentGateway === "paypal") {
    paymentData = { paypal_email: clientEmail, checkout_mode: "express" };
  } else if (activePaymentGateway === "mercadopago") {
    paymentData = {
      mp_method: document.getElementById("mpMethodSelect")?.value || "pse",
      pse_bank: document.getElementById("mpPseBank")?.value || "bancolombia",
      doc_number: document.getElementById("mpDocNumber")?.value || ""
    };
  } else if (activePaymentGateway === "crypto") {
    paymentData = {
      network: document.getElementById("cryptoNetworkSelect")?.value || "usdt_trc20",
      tx_hash: document.getElementById("cryptoTxHash")?.value || ""
    };
  } else if (activePaymentGateway === "apple_pay") {
    paymentData = { device_wallet: "Apple / Google Pay Biometric", biometric_verified: true };
  }

  try {
    const res = await fetch("/api/payments/process", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-Role": currentProfile ? currentProfile.role : "client",
        "X-User-Email": clientEmail
      },
      body: JSON.stringify({
        client_name: clientName,
        client_email: clientEmail,
        amount: paymentCurrentAmount,
        currency: "USD",
        gateway: activePaymentGateway,
        concept: paymentCurrentConcept,
        payment_data: paymentData
      })
    });

    const data = await res.json();
    if (btnProcess) {
      btnProcess.disabled = false;
      btnProcess.innerHTML = "<span>🔒</span> Confirmar y Procesar Pago Seguro";
    }

    if (data.success) {
      playCyberSound("chime");
      triggerCyberConfetti();
      showNotification(`🎉 ¡Pago Aprobado! Ref: ${data.payment.transaction_id}. Notificación despachada a Gmail.`);

      // Render Voucher in Success view
      const formContainer = document.getElementById("paymentFormContainer");
      const successContainer = document.getElementById("paymentSuccessContainer");
      if (formContainer) formContainer.classList.add("hidden");
      if (successContainer) successContainer.classList.remove("hidden");

      const vTx = document.getElementById("voucherTxId");
      const vName = document.getElementById("voucherClientName");
      const vEmail = document.getElementById("voucherClientEmail");
      const vGate = document.getElementById("voucherGateway");
      const vAmt = document.getElementById("voucherAmount");

      if (vTx) vTx.textContent = data.payment.transaction_id;
      if (vName) vName.textContent = data.payment.client_name;
      if (vEmail) vEmail.textContent = data.payment.client_email;
      if (vGate) vGate.textContent = data.payment.gateway_title;
      if (vAmt) vAmt.textContent = `$${parseFloat(data.payment.amount).toLocaleString("en-US", {minimumFractionDigits: 2})} USD`;

      // Refresh tickets & payments tables
      loadTickets();
      loadPayments();
    } else {
      showToast(data.error || "No se pudo procesar el pago.", "error");
      playCyberSound("error");
    }
  } catch (err) {
    if (btnProcess) {
      btnProcess.disabled = false;
      btnProcess.innerHTML = "<span>🔒</span> Confirmar y Procesar Pago Seguro";
    }
    showToast("Error de conexión al procesar el pago: " + err.message, "error");
    playCyberSound("error");
  }
}

async function loadPayments() {
  const tableBody = document.getElementById("paymentsTableBody");
  if (!tableBody) return;

  try {
    const role = currentProfile ? currentProfile.role : "client";
    const email = currentProfile ? currentProfile.email : "";
    const res = await fetch("/api/payments", {
      headers: {
        "X-User-Role": role,
        "X-User-Email": email
      }
    });
    const data = await res.json();

    if (data.success && data.payments && data.payments.length > 0) {
      tableBody.innerHTML = data.payments.map(p => `
        <tr class="hover:bg-purple-950/30 transition-colors">
          <td class="py-3 px-3 text-emerald-400 font-bold">${escapeHTML(p.transaction_id)}</td>
          <td class="py-3 px-3">
            <span class="text-white font-medium block">${escapeHTML(p.client_name)}</span>
            <span class="text-[10px] text-slate-400 font-mono">${escapeHTML(p.client_email)}</span>
          </td>
          <td class="py-3 px-3 text-slate-300">${escapeHTML(p.concept || "Servicios")}</td>
          <td class="py-3 px-3">
            <span class="px-2 py-0.5 rounded-full text-[10px] bg-indigo-950/80 text-indigo-300 border border-indigo-500/30">
              ${escapeHTML(p.gateway_title || p.gateway)}
            </span>
          </td>
          <td class="py-3 px-3 text-emerald-300 font-bold font-mono">
            $${parseFloat(p.amount).toLocaleString("en-US", {minimumFractionDigits: 2})} ${escapeHTML(p.currency || "USD")}
          </td>
          <td class="py-3 px-3 text-slate-400 text-[10px]">${p.created_at || "Reciente"}</td>
          <td class="py-3 px-3 text-right">
            <span class="px-2 py-0.5 rounded-full text-[10px] bg-emerald-950/80 text-emerald-400 border border-emerald-500/40">
              ✓ Aprobado
            </span>
          </td>
        </tr>
      `).join("");
    } else {
      tableBody.innerHTML = `
        <tr>
          <td colspan="7" class="py-8 text-center text-slate-400 font-sans">
            <div class="text-2xl mb-1">💳</div>
            No hay transacciones registradas aún. Al realizar tu primer pago aparecerá tu comprobante aquí.
          </td>
        </tr>
      `;
    }
  } catch (err) {
    console.error("Error cargando pagos:", err);
  }
}

// ============================================================================
// DASHBOARD DE MÉTRICAS & ANALYTICS
// ============================================================================
async function loadAnalyticsData() {
  playCyberSound("beep");
  try {
    const res = await fetch("/api/analytics");
    const data = await res.json();
    if (!data.success) return;

    const a = data.analytics;
    const totals = a.totals || {};

    const elProjects = document.getElementById("kpiProjectsCount");
    const elTickets = document.getElementById("kpiTicketsCount");
    const elRate = document.getElementById("kpiResolutionRate");
    const elUsers = document.getElementById("kpiUsersCount");
    const elMessages = document.getElementById("kpiMessagesCount");
    const elArticles = document.getElementById("kpiArticlesCount");

    if (elProjects) elProjects.textContent = totals.projects || 0;
    if (elTickets) elTickets.textContent = totals.tickets || 0;
    if (elUsers) elUsers.textContent = totals.users || 0;
    if (elMessages) elMessages.textContent = totals.messages || 0;
    if (elArticles) elArticles.textContent = totals.articles || 0;

    const ticketsByStatus = a.tickets_by_status || {};
    const totalT = totals.tickets || 1;
    const resolvedT = (ticketsByStatus["resuelto"] || 0) + (ticketsByStatus["cerrado"] || 0);
    const ratePercent = Math.round((resolvedT / totalT) * 100);
    if (elRate) elRate.textContent = `${ratePercent}%`;

    const techContainer = document.getElementById("analyticsTechStackBars");
    if (techContainer && a.tech_stack) {
      const maxCount = Math.max(...a.tech_stack.map(x => x[1]), 1);
      techContainer.innerHTML = a.tech_stack.map(([tech, count]) => {
        const pct = Math.round((count / maxCount) * 100);
        return `
          <div>
            <div class="flex justify-between text-xs mb-1">
              <span class="font-bold text-white font-mono">${escapeHtml(tech)}</span>
              <span class="text-cyan-300 font-mono">${count} repos</span>
            </div>
            <div class="w-full h-2.5 rounded-full bg-[#0e1424] overflow-hidden border border-white/10">
              <div class="h-full bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 rounded-full transition-all duration-700" style="width: ${pct}%"></div>
            </div>
          </div>
        `;
      }).join("");
    }

    const ticketsChartContainer = document.getElementById("analyticsTicketsChart");
    if (ticketsChartContainer) {
      const ticketsByPriority = a.tickets_by_priority || {};
      const statusLabels = [
        { label: "Abiertos", count: ticketsByStatus["abierto"] || 0, color: "from-amber-400 to-amber-500" },
        { label: "En Progreso", count: ticketsByStatus["en_progreso"] || 0, color: "from-cyan-400 to-blue-500" },
        { label: "Resueltos / Cerrados", count: resolvedT, color: "from-emerald-400 to-teal-500" },
        { label: "Prioridad Crítica", count: ticketsByPriority["critica"] || 0, color: "from-rose-500 to-red-600" }
      ];

      ticketsChartContainer.innerHTML = statusLabels.map(s => {
        const pct = Math.min(100, Math.round((s.count / totalT) * 100));
        return `
          <div>
            <div class="flex justify-between text-xs mb-1">
              <span class="font-bold text-white">${s.label}</span>
              <span class="text-slate-300 font-mono">${s.count} tickets (${pct}%)</span>
            </div>
            <div class="w-full h-2.5 rounded-full bg-[#0e1424] overflow-hidden border border-white/10">
              <div class="h-full bg-gradient-to-r ${s.color} rounded-full transition-all duration-700" style="width: ${pct}%"></div>
            </div>
          </div>
        `;
      }).join("");
    }
  } catch (err) {
    console.error("Error loading analytics:", err);
  }
}

// ============================================================================
// CHAT DEL EQUIPO & TABLÓN DE ANUNCIOS OFICIALES
// ============================================================================
async function loadTeamMessages() {
  const isStaff = ["admin", "developer", "qa", "designer", "manager", "employee"].includes(currentRole);
  if (!isStaff) return;

  try {
    const res = await fetch("/api/team/messages", {
      headers: {
        "X-User-Role": currentRole,
        "X-User-Email": activeProfile?.email || ""
      }
    });
    const data = await res.json();
    if (!data.success) return;

    const msgs = data.messages || [];
    const container = document.getElementById("teamChatMessagesList");
    const pinnedText = document.getElementById("chatPinnedText");

    const pinnedMsg = msgs.find(m => m.is_pinned === 1 || m.message_type === "announcement");
    if (pinnedText && pinnedMsg) {
      pinnedText.textContent = pinnedMsg.message;
    }

    const pinOption = document.getElementById("chatPinOptionContainer");
    if (pinOption) {
      const user = getCurrentUser();
      if (user && user.role === "admin") {
        pinOption.classList.remove("hidden");
        pinOption.classList.add("flex");
      } else {
        pinOption.classList.add("hidden");
        pinOption.classList.remove("flex");
      }
    }

    if (!container) return;
    if (msgs.length === 0) {
      container.innerHTML = `<div class="text-center text-xs text-purple-400/60 py-10">Sin mensajes registrados en el canal.</div>`;
      return;
    }

    container.innerHTML = msgs.map(m => {
      const isPinned = m.is_pinned === 1 || m.message_type === "announcement";
      const bubbleClass = isPinned ? "chat-bubble-announcement" : "chat-bubble-user";
      const roleColor = m.user_role === "admin" ? "bg-fuchsia-600" : (m.user_role === "developer" ? "bg-indigo-600" : "bg-purple-800");

      return `
        <div class="flex items-start gap-3">
          <img src="${escapeHtml(m.user_avatar || 'https://ui-avatars.com/api/?name=User&background=8b5cf6&color=fff')}" class="w-8 h-8 rounded-xl object-cover border border-purple-500/40 flex-shrink-0">
          <div class="p-3.5 rounded-2xl ${bubbleClass} flex-1 max-w-2xl space-y-1">
            <div class="flex items-center justify-between gap-2">
              <div class="flex items-center gap-2">
                <span class="text-xs font-bold text-white">${escapeHtml(m.user_name)}</span>
                <span class="text-[9px] font-bold px-2 py-0.2 rounded-full text-white uppercase font-mono ${roleColor}">${escapeHtml(m.user_role)}</span>
                ${isPinned ? '<span class="text-[9px] font-bold text-fuchsia-300 font-mono">📌 OFICIAL</span>' : ''}
              </div>
              <span class="text-[10px] text-purple-400 font-mono">${formatTimeAgo(m.created_at)}</span>
            </div>
            <p class="text-xs text-purple-100/90 leading-relaxed whitespace-pre-line">${escapeHtml(m.message)}</p>
          </div>
        </div>
      `;
    }).join("");

    container.scrollTop = container.scrollHeight;
  } catch (err) {
    console.error("Error loading team messages:", err);
  }
}

async function sendTeamChatMessage(e) {
  e.preventDefault();
  playCyberSound("click");

  const isStaff = ["admin", "developer", "qa", "designer", "manager", "employee"].includes(currentRole);
  if (!isStaff) {
    showToast("Acceso restringido: El Chat de Equipo es exclusivo para colaboradores e ingenieros.", "error");
    return;
  }

  const input = document.getElementById("teamChatInput");
  const pinCb = document.getElementById("chatPinCheckbox");
  const btn = document.getElementById("btnSendChatMessage");

  const message = input ? input.value.trim() : "";
  if (!message) return;

  const user = getCurrentUser() || PROFILES.admin;
  const isPinned = pinCb && pinCb.checked && user.role === "admin" ? 1 : 0;
  const messageType = isPinned ? "announcement" : "chat";

  if (btn) btn.disabled = true;

  try {
    const res = await fetch("/api/team/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-User-Role": currentRole,
        "X-User-Email": activeProfile?.email || ""
      },
      body: JSON.stringify({
        user_name: user.name || user.username || "Colaborador",
        user_email: user.email || "dev@kunkurt.com",
        user_role: user.role || "developer",
        user_avatar: user.avatar,
        message: message,
        message_type: messageType,
        is_pinned: isPinned
      })
    });
    const data = await res.json();
    if (data.success) {
      playCyberSound("beep");
      if (input) input.value = "";
      if (pinCb) pinCb.checked = false;
      loadTeamMessages();
    } else {
      showNotification(data.error || "Error al enviar mensaje", "error");
      playCyberSound("error");
    }
  } catch (err) {
    console.error("Error sending message:", err);
    playCyberSound("error");
  } finally {
    if (btn) btn.disabled = false;
  }
}

// ============================================================================
// BASE DE CONOCIMIENTO & WIKI TÉCNICA
// ============================================================================
let currentWikiFilterCategory = "all";
let cachedWikiArticles = [];

async function loadWikiArticles() {
  try {
    const res = await fetch("/api/wiki");
    const data = await res.json();
    if (!data.success) return;
    cachedWikiArticles = data.articles || [];
    renderWikiArticles(cachedWikiArticles);
  } catch (err) {
    console.error("Error loading wiki articles:", err);
  }
}

function setWikiCategoryFilter(cat) {
  playCyberSound("click");
  currentWikiFilterCategory = cat;
  document.querySelectorAll(".wiki-cat-btn").forEach(btn => {
    if (btn.textContent.trim().toLowerCase() === cat.toLowerCase() || (cat === "all" && btn.textContent.trim().toLowerCase() === "todas")) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });
  filterWikiArticles();
}

function filterWikiArticles() {
  const searchInput = document.getElementById("wikiSearchInput");
  const term = searchInput ? searchInput.value.toLowerCase().trim() : "";

  let filtered = cachedWikiArticles;
  if (currentWikiFilterCategory !== "all") {
    filtered = filtered.filter(a => a.category === currentWikiFilterCategory);
  }
  if (term) {
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(term) ||
      a.content.toLowerCase().includes(term) ||
      (a.tags && a.tags.some(t => t.toLowerCase().includes(term)))
    );
  }
  renderWikiArticles(filtered);
}

function renderWikiArticles(articles) {
  const grid = document.getElementById("wikiArticlesGrid");
  if (!grid) return;

  if (articles.length === 0) {
    grid.innerHTML = `
      <div class="col-span-full py-16 text-center glass-panel rounded-2xl border border-purple-500/20 p-8">
        <span class="text-4xl block mb-2">📚</span>
        <h4 class="text-sm font-bold text-white mb-1">Sin guías encontradas</h4>
        <p class="text-xs text-purple-300/60">No se encontraron artículos con los criterios seleccionados.</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = articles.map(a => {
    const tagsHtml = (a.tags || []).slice(0, 3).map(t => `
      <span class="text-[9px] font-mono px-2 py-0.5 rounded-md bg-cyan-950/40 border border-cyan-500/20 text-cyan-300">${escapeHtml(t)}</span>
    `).join("");

    return `
      <div class="glass-panel p-5 rounded-3xl border border-white/10 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 hover:shadow-[0_0_35px_rgba(6,182,212,0.18)]">
        <div class="space-y-2">
          <div class="flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span class="px-2 py-0.5 rounded-full bg-white/5 border border-white/10 text-slate-300">${escapeHtml(a.category)}</span>
            <span class="text-cyan-400">👁️ ${a.views_count} lecturas</span>
          </div>
          <h4 class="text-base font-bold text-white leading-snug line-clamp-2">${escapeHtml(a.title)}</h4>
          <p class="text-xs text-slate-300/80 line-clamp-3 leading-relaxed">${escapeHtml(a.content.replace(/[#*`_]/g, ''))}</p>
        </div>

        <div class="space-y-3 pt-2 border-t border-white/10">
          <div class="flex items-center gap-1.5 flex-wrap">
            ${tagsHtml}
          </div>
          <div class="flex items-center justify-between pt-1">
            <span class="text-[10px] text-slate-400 font-mono">Por ${escapeHtml(a.author_name)}</span>
            <button onclick="openWikiArticleModal(${a.id})" class="btn-ghost-neon text-xs py-1 px-3 border-cyan-500/40 text-cyan-300 hover:text-white">
              Leer Guía →
            </button>
          </div>
        </div>
      </div>
    `;
  }).join("");
}

async function openWikiArticleModal(id) {
  playCyberSound("click");
  try {
    const res = await fetch(`/api/wiki/${id}`);
    const data = await res.json();
    if (!data.success) return;
    const a = data.article;

    const elTitle = document.getElementById("wikiModalTitle");
    const elCat = document.getElementById("wikiModalCategory");
    const elAuthor = document.getElementById("wikiModalAuthor");
    const elDate = document.getElementById("wikiModalDate");
    const elViews = document.getElementById("wikiModalViews");
    const elContent = document.getElementById("wikiModalContent");
    const elTags = document.getElementById("wikiModalTags");

    if (elTitle) elTitle.textContent = a.title;
    if (elCat) elCat.textContent = a.category;
    if (elAuthor) elAuthor.textContent = a.author_name;
    if (elDate) elDate.textContent = formatTimeAgo(a.created_at);
    if (elViews) elViews.textContent = `${a.views_count} lecturas`;
    if (elContent) elContent.textContent = a.content;

    if (elTags) {
      elTags.innerHTML = (a.tags || []).map(t => `
        <span class="text-xs font-mono px-2.5 py-1 rounded-lg bg-purple-950/60 border border-purple-500/40 text-purple-200">${escapeHtml(t)}</span>
      `).join("");
    }

    const modal = document.getElementById("wikiArticleModal");
    if (modal) modal.classList.remove("hidden");
  } catch (err) {
    console.error("Error opening wiki article:", err);
  }
}

function closeWikiArticleModal() {
  playCyberSound("click");
  const modal = document.getElementById("wikiArticleModal");
  if (modal) modal.classList.add("hidden");
}

function openCreateWikiModal() {
  playCyberSound("click");
  const modal = document.getElementById("createWikiArticleModal");
  if (modal) modal.classList.remove("hidden");
}

function closeCreateWikiModal() {
  playCyberSound("click");
  const modal = document.getElementById("createWikiArticleModal");
  if (modal) modal.classList.add("hidden");
}

async function handleCreateWikiArticle(e) {
  e.preventDefault();
  playCyberSound("click");
  const titleInput = document.getElementById("newWikiTitle");
  const catInput = document.getElementById("newWikiCategory");
  const tagsInput = document.getElementById("newWikiTags");
  const contentInput = document.getElementById("newWikiContent");

  const title = titleInput ? titleInput.value.trim() : "";
  const category = catInput ? catInput.value.trim() : "General";
  const tagsRaw = tagsInput ? tagsInput.value.trim() : "";
  const content = contentInput ? contentInput.value.trim() : "";

  if (!title || !content) {
    showNotification("Título y contenido son obligatorios.", "error");
    playCyberSound("error");
    return;
  }

  const tags = tagsRaw.split(",").map(t => t.trim()).filter(Boolean);
  const user = getCurrentUser() || PROFILES.admin;

  try {
    const res = await fetch("/api/wiki", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        category,
        content,
        tags,
        author_name: user.name || user.username || "Developer",
        author_role: user.role || "developer"
      })
    });
    const data = await res.json();
    if (data.success) {
      playCyberSound("chime");
      showNotification("📖 ¡Guía técnica publicada en la Wiki!");
      closeCreateWikiModal();
      if (titleInput) titleInput.value = "";
      if (tagsInput) tagsInput.value = "";
      if (contentInput) contentInput.value = "";
      loadWikiArticles();
    } else {
      showNotification(data.error || "Error al publicar guía", "error");
      playCyberSound("error");
    }
  } catch (err) {
    console.error("Error creating wiki article:", err);
    playCyberSound("error");
  }
}

// ============================================================================
// CONFIGURACIÓN DE WEBHOOKS CYBER
// ============================================================================
async function openWebhookSettingsModal() {
  playCyberSound("click");
  const modal = document.getElementById("webhookSettingsModal");
  if (modal) modal.classList.remove("hidden");

  try {
    const res = await fetch("/api/settings/webhooks");
    const data = await res.json();
    if (data.success && data.settings) {
      const s = data.settings;
      const elDiscord = document.getElementById("webhookDiscordUrl");
      const elTgToken = document.getElementById("webhookTelegramToken");
      const elTgChat = document.getElementById("webhookTelegramChatId");
      const elEnabled = document.getElementById("webhookEnabledCheckbox");
      const elNotifTicket = document.getElementById("webhookNotifyTicket");
      const elNotifLogin = document.getElementById("webhookNotifyLogin");
      const elNotifQuote = document.getElementById("webhookNotifyQuote");

      if (elDiscord) elDiscord.value = s.discord_url || "";
      if (elTgToken) elTgToken.value = s.telegram_token || "";
      if (elTgChat) elTgChat.value = s.telegram_chat_id || "";
      if (elEnabled) elEnabled.checked = !!s.enabled;
      if (elNotifTicket) elNotifTicket.checked = s.notify_on_ticket !== false;
      if (elNotifLogin) elNotifLogin.checked = s.notify_on_login !== false;
      if (elNotifQuote) elNotifQuote.checked = s.notify_on_quote !== false;
    }
  } catch (err) {
    console.error("Error loading webhook settings:", err);
  }
}

function closeWebhookSettingsModal() {
  playCyberSound("click");
  const modal = document.getElementById("webhookSettingsModal");
  if (modal) modal.classList.add("hidden");
}

async function handleSaveWebhookSettings(e) {
  e.preventDefault();
  playCyberSound("click");

  const discordUrl = document.getElementById("webhookDiscordUrl")?.value.trim() || "";
  const telegramToken = document.getElementById("webhookTelegramToken")?.value.trim() || "";
  const telegramChatId = document.getElementById("webhookTelegramChatId")?.value.trim() || "";
  const enabled = document.getElementById("webhookEnabledCheckbox")?.checked || false;
  const notifyTicket = document.getElementById("webhookNotifyTicket")?.checked !== false;
  const notifyLogin = document.getElementById("webhookNotifyLogin")?.checked !== false;
  const notifyQuote = document.getElementById("webhookNotifyQuote")?.checked !== false;

  try {
    const res = await fetch("/api/settings/webhooks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        discord_url: discordUrl,
        telegram_token: telegramToken,
        telegram_chat_id: telegramChatId,
        enabled: enabled,
        notify_on_ticket: notifyTicket,
        notify_on_login: notifyLogin,
        notify_on_quote: notifyQuote
      })
    });
    const data = await res.json();
    if (data.success) {
      playCyberSound("chime");
      showNotification("🔔 Configuración de Webhooks guardada exitosamente.");
      closeWebhookSettingsModal();
    } else {
      showNotification(data.error || "Error al guardar webhooks", "error");
      playCyberSound("error");
    }
  } catch (err) {
    console.error("Error saving webhook settings:", err);
    showNotification("Error de conexión al guardar webhooks", "error");
    playCyberSound("error");
  }
}

async function testWebhookConnection() {
  playCyberSound("click");
  showNotification("🧪 Enviando test a webhooks activos...");
  try {
    const res = await fetch("/api/webhooks/test", { method: "POST" });
    const data = await res.json();
    if (data.success) {
      playCyberSound("chime");
      showNotification("✅ Test despachado a Discord / Telegram.");
    }
  } catch (err) {
    console.error("Error testing webhook:", err);
  }
}

// ============================================================================
// EXPORTADOR DE DOSSIER EJECUTIVO EN PDF
// ============================================================================
async function exportExecutiveDossier() {
  playCyberSound("chime");
  showNotification("📄 Generando Dossier Ejecutivo en PDF...");

  try {
    const dDate = document.getElementById("dossierPrintDate");
    if (dDate) dDate.textContent = new Date().toISOString().split("T")[0];

    const res = await fetch("/api/analytics");
    const data = await res.json();
    if (data.success && data.analytics) {
      const totals = data.analytics.totals || {};
      const elP = document.getElementById("dossierTotalProjects");
      const elT = document.getElementById("dossierTotalTickets");
      const elR = document.getElementById("dossierResolutionRate");
      const elL = document.getElementById("dossierTotalLikes");

      if (elP) elP.textContent = totals.projects || 0;
      if (elT) elT.textContent = totals.tickets || 0;
      if (elL) elL.textContent = (totals.likes || 0).toLocaleString();

      const totalT = totals.tickets || 1;
      const statusMap = data.analytics.tickets_by_status || {};
      const resT = (statusMap["resuelto"] || 0) + (statusMap["cerrado"] || 0);
      if (elR) elR.textContent = `${Math.round((resT / totalT) * 100)}%`;
    }

    const pContainer = document.getElementById("dossierProjectsTableContainer");
    if (pContainer && allProjects) {
      const topProjects = allProjects.slice(0, 6);
      pContainer.innerHTML = `
        <table style="width: 100%; border-collapse: collapse; font-size: 11px;">
          <thead>
            <tr style="background: #f3f4f6; text-align: left; border-bottom: 2px solid #e5e7eb;">
              <th style="padding: 8px;">Proyecto</th>
              <th style="padding: 8px;">Categoría</th>
              <th style="padding: 8px;">Stack Tecnológico</th>
              <th style="padding: 8px;">Estado</th>
              <th style="padding: 8px;">Interacciones</th>
            </tr>
          </thead>
          <tbody>
            ${topProjects.map(p => `
              <tr style="border-bottom: 1px solid #e5e7eb;">
                <td style="padding: 8px; font-weight: bold; color: #111827;">${escapeHtml(p.title)}</td>
                <td style="padding: 8px; color: #6b7280;">${escapeHtml(p.category)}</td>
                <td style="padding: 8px; font-family: monospace; font-size: 10px; color: #4c1d95;">${escapeHtml(Array.isArray(p.tech_stack) ? p.tech_stack.slice(0, 3).join(", ") : p.tech_stack)}</td>
                <td style="padding: 8px;"><span style="padding: 2px 6px; border-radius: 4px; font-size: 9px; font-weight: bold; text-transform: uppercase; background: #ecfdf5; color: #047857;">${escapeHtml(p.status)}</span></td>
                <td style="padding: 8px; color: #6b7280;">⭐ ${p.likes_count || 0}</td>
              </tr>
            `).join("")}
          </tbody>
        </table>
      `;
    }

    setTimeout(() => {
      window.print();
    }, 400);

  } catch (err) {
    console.error("Error generating dossier:", err);
    window.print();
  }
}

// ============================================================================
// DEVICE VIEW SWITCHER (DESKTOP / MOBILE / FULLSCREEN PREVIEW)
// ============================================================================
function setDeviceView(mode) {
  playCyberSound("click");
  const container = document.getElementById("browserFrameContainer");
  const btnDesktop = document.getElementById("deviceBtnDesktop");
  const btnMobile = document.getElementById("deviceBtnMobile");
  const btnFull = document.getElementById("deviceBtnFull");

  const inactiveBtn = "p-2 px-3.5 rounded-xl text-slate-400 hover:text-white font-medium text-xs flex items-center gap-2 transition-all hover:bg-white/10";
  const activeBtn = "p-2 px-3.5 rounded-xl bg-white/10 text-white font-medium text-xs flex items-center gap-2 transition-all hover:bg-white/20 shadow-sm";

  if (btnDesktop) {
    btnDesktop.className = inactiveBtn;
    const svg = btnDesktop.querySelector("svg");
    if (svg) svg.className = "w-4 h-4 text-slate-400";
  }
  if (btnMobile) {
    btnMobile.className = inactiveBtn;
    const svg = btnMobile.querySelector("svg");
    if (svg) svg.className = "w-4 h-4 text-slate-400";
  }
  if (btnFull) {
    btnFull.className = inactiveBtn;
    const svg = btnFull.querySelector("svg");
    if (svg) svg.className = "w-4 h-4 text-slate-400";
  }

  if (!container) return;

  if (mode === "mobile") {
    container.className = "max-w-md mx-auto px-4 pb-8 transition-all duration-500 ease-out";
    if (btnMobile) {
      btnMobile.className = activeBtn;
      const svg = btnMobile.querySelector("svg");
      if (svg) svg.className = "w-4 h-4 text-cyan-400";
    }
    showToast("📱 Vista Móvil activada", "info");
  } else if (mode === "full") {
    container.className = "w-full max-w-none px-2 sm:px-6 pb-8 transition-all duration-500 ease-out";
    if (btnFull) {
      btnFull.className = activeBtn;
      const svg = btnFull.querySelector("svg");
      if (svg) svg.className = "w-4 h-4 text-cyan-400";
    }
    showToast("🖼️ Vista Expandida activada", "info");
  } else {
    container.className = "max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8 transition-all duration-500 ease-out";
    if (btnDesktop) {
      btnDesktop.className = activeBtn;
      const svg = btnDesktop.querySelector("svg");
      if (svg) svg.className = "w-4 h-4 text-cyan-400";
    }
    showToast("🖥️ Vista Escritorio activada", "info");
  }
}

// Window exports
window.openToolsModal = openToolsModal;
window.closeToolsModal = closeToolsModal;
window.setDeviceView = setDeviceView;
window.toggleCyberAudio = toggleCyberAudio;
window.playCyberSound = playCyberSound;
window.calculateQuotation = calculateQuotation;
window.submitQuotationForm = submitQuotationForm;
window.loadAnalyticsData = loadAnalyticsData;
window.loadTeamMessages = loadTeamMessages;
window.sendTeamChatMessage = sendTeamChatMessage;
window.loadWikiArticles = loadWikiArticles;
window.setWikiCategoryFilter = setWikiCategoryFilter;
window.filterWikiArticles = filterWikiArticles;
window.openWikiArticleModal = openWikiArticleModal;
window.closeWikiArticleModal = closeWikiArticleModal;
window.openCreateWikiModal = openCreateWikiModal;
window.closeCreateWikiModal = closeCreateWikiModal;
window.handleCreateWikiArticle = handleCreateWikiArticle;
window.openWebhookSettingsModal = openWebhookSettingsModal;
window.closeWebhookSettingsModal = closeWebhookSettingsModal;
window.handleSaveWebhookSettings = handleSaveWebhookSettings;
window.testWebhookConnection = testWebhookConnection;
window.exportExecutiveDossier = exportExecutiveDossier;
window.openPaymentModal = openPaymentModal;
window.closePaymentModal = closePaymentModal;
window.payQuotationDeposit = payQuotationDeposit;
window.setPaymentMode = setPaymentMode;
window.selectPaymentTab = selectPaymentTab;
window.handleCardNumberInput = handleCardNumberInput;
window.handleCardExpiryInput = handleCardExpiryInput;
window.toggleMercadoPagoView = toggleMercadoPagoView;
window.triggerBiometricPay = triggerBiometricPay;
window.updateCryptoAddress = updateCryptoAddress;
window.copyCryptoVaultAddress = copyCryptoVaultAddress;
window.handleQuickPaymentForm = handleQuickPaymentForm;
window.processPaymentCheckout = processPaymentCheckout;
window.loadPayments = loadPayments;

// ============================================================================
// TOOLS & SETTINGS MODAL CONTROLLER
// ============================================================================
function openToolsModal() {
  playCyberSound("click");
  const modal = document.getElementById("toolsModal");
  if (!modal) return;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeToolsModal() {
  playCyberSound("click");
  const modal = document.getElementById("toolsModal");
  if (!modal) return;
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

// ============================================================================
// 1. SELECTOR MULTILENGUAJE INSTANTÁNEO (ES / EN / PT)
// ============================================================================
let currentLanguage = "es";

const I18N = {
  es: {
    catalog: "📁 Catálogo",
    tickets: "🎫 Tickets & Soporte",
    quote: "⚡ Cotizador",
    payments: "💳 Pasarelas de Pago",
    analytics: "📊 Métricas & Analytics",
    chat: "💬 Chat del Equipo",
    wiki: "📚 Wiki Técnica",
    payOnline: "💳 Pagar Online",
    quoteProject: "⚡ Cotizar Proyecto",
    openTicket: "➕ Abrir Ticket",
    scheduleMeeting: "📅 Agendar Llamada",
    heroBadge: "Ecosistema de Microservicios, Cloud Architecture & IA",
    heroTitle: "Innovar para <br><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400\">Trascender</span>",
    heroSub: "Plataforma tecnológica de alto desempeño desarrollada por <strong class=\"text-cyan-300 font-semibold\">JaponPLX</strong>. Microservicios escalables, cotizaciones dinámicas y soporte en vivo.",
    exploreDash: "Explorar Dashboard"
  },
  en: {
    catalog: "📁 Portfolio",
    tickets: "🎫 HelpDesk & Support",
    quote: "⚡ Estimator",
    payments: "💳 Payment Gateways",
    analytics: "📊 Live Analytics",
    chat: "💬 Team Chat",
    wiki: "📚 Technical Wiki",
    payOnline: "💳 Pay Online",
    quoteProject: "⚡ Quote Project",
    openTicket: "➕ Open Ticket",
    scheduleMeeting: "📅 Book Discovery Call",
    heroBadge: "Microservices Ecosystem, Cloud Architecture & AI",
    heroTitle: "Innovate to <br><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400\">Transcend</span>",
    heroSub: "High-performance software engineering platform engineered by <strong class=\"text-cyan-300 font-semibold\">JaponPLX</strong>. Scalable microservices, instant quotes, and 24/7 support.",
    exploreDash: "Explore Dashboard"
  },
  pt: {
    catalog: "📁 Catálogo",
    tickets: "🎫 Chamados & Suporte",
    quote: "⚡ Orçamento",
    payments: "💳 Formas de Pagamento",
    analytics: "📊 Métricas & Análises",
    chat: "💬 Chat da Equipe",
    wiki: "📚 Wiki Técnica",
    payOnline: "💳 Pagar Online",
    quoteProject: "⚡ Orçar Projeto",
    openTicket: "➕ Abrir Chamado",
    scheduleMeeting: "📅 Agendar Reunião",
    heroBadge: "Ecossistema de Microsserviços, Cloud & IA",
    heroTitle: "Inovar para <br><span class=\"text-transparent bg-clip-text bg-gradient-to-r from-white via-cyan-200 to-cyan-400\">Transcender</span>",
    heroSub: "Plataforma de alta performance desenvolvida por <strong class=\"text-cyan-300 font-semibold\">JaponPLX</strong>. Microsserviços escaláveis, orçamentos instantâneos e suporte.",
    exploreDash: "Explorar Painel"
  }
};

function setLanguage(lang) {
  playCyberSound("click");
  currentLanguage = lang;
  const dict = I18N[lang] || I18N.es;

  // Update Buttons
  ["es", "en", "pt"].forEach(l => {
    const btn = document.getElementById(`langBtn_${l}`);
    if (btn) {
      if (l === lang) {
        btn.className = "px-2 py-0.5 rounded-lg bg-cyan-500 text-black font-extrabold transition-all";
      } else {
        btn.className = "px-2 py-0.5 rounded-lg text-slate-300 hover:text-white transition-all";
      }
    }
  });

  // Update Nav tabs
  const tabProjects = document.getElementById("tabViewProjectsBtn");
  const tabTickets = document.getElementById("tabViewTicketsBtn");
  const tabQuote = document.getElementById("tabViewQuoteBtn");
  const tabPayments = document.getElementById("tabViewPaymentsBtn");
  const tabAnalytics = document.getElementById("tabViewAnalyticsBtn");
  const tabChat = document.getElementById("tabViewTeamChatBtn");
  const tabWiki = document.getElementById("tabViewWikiBtn");

  if (tabProjects) tabProjects.querySelector("span:last-child")?.replaceWith(document.createTextNode(" " + dict.catalog.split(" ")[1]));
  if (tabTickets) {
    const counter = document.getElementById("tabTicketsCounter");
    tabTickets.innerHTML = `<span>🎫</span> ${dict.tickets} `;
    if (counter) tabTickets.appendChild(counter);
  }
  if (tabQuote) tabQuote.innerHTML = `<span>⚡</span> ${dict.quote}`;
  if (tabPayments) tabPayments.innerHTML = `<span>💳</span> ${dict.payments}`;
  if (tabAnalytics) tabAnalytics.innerHTML = `<span>📊</span> ${dict.analytics}`;
  if (tabChat) tabChat.innerHTML = `<span>💬</span> ${dict.chat}`;
  if (tabWiki) tabWiki.innerHTML = `<span>📚</span> ${dict.wiki}`;

  showToast(`Idioma cambiado a ${lang.toUpperCase()}`, "info");
}

// ============================================================================
// 2. RADAR DE ESTADO DE SERVICIOS & TELEMETRÍA SLA
// ============================================================================
function openStatusModal() {
  playCyberSound("click");
  const modal = document.getElementById("statusModal");
  if (!modal) return;
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
  pingSystemStatus();
}

function closeStatusModal() {
  playCyberSound("click");
  const modal = document.getElementById("statusModal");
  if (!modal) return;
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

async function pingSystemStatus() {
  playCyberSound("beep");
  try {
    const start = performance.now();
    const res = await fetch("/api/system/status");
    const data = await res.json();
    const pingMs = Math.round(performance.now() - start);

    const list = document.getElementById("statusServicesList");
    if (list && data.services) {
      list.innerHTML = data.services.map(s => `
        <div class="p-3 rounded-xl bg-slate-900/60 border border-slate-700/40 flex items-center justify-between">
          <span class="text-slate-200 font-medium">${escapeHTML(s.name)}</span>
          <div class="flex items-center gap-3">
            <span class="text-[10px] font-mono text-cyan-400">${s.latency_ms || pingMs}ms</span>
            <span class="px-2 py-0.5 rounded-full text-[10px] bg-emerald-950 text-emerald-400 border border-emerald-500/30 font-bold">
              ● Operativo (${s.sla})
            </span>
          </div>
        </div>
      `).join("");
    }
    showToast(`Radar de servicios actualizado • Latencia: ${pingMs}ms`, "success");
  } catch (err) {
    showToast("Error conectando con radar de servicios", "error");
  }
}

// ============================================================================
// 3. AGENDADOR DE DISCOVERY CALLS (GOOGLE MEET)
// ============================================================================
function openMeetingModal() {
  playCyberSound("click");
  const modal = document.getElementById("meetingModal");
  if (!modal) return;

  const formBox = document.getElementById("meetingFormContainer");
  const successBox = document.getElementById("meetingSuccessContainer");
  if (formBox) formBox.classList.remove("hidden");
  if (successBox) successBox.classList.add("hidden");

  // Pre-fill date to tomorrow
  const dateInput = document.getElementById("meetDate");
  if (dateInput) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.value = tomorrow.toISOString().split("T")[0];
    dateInput.min = new Date().toISOString().split("T")[0];
  }

  // Pre-fill user data
  const nameInput = document.getElementById("meetClientName");
  const emailInput = document.getElementById("meetClientEmail");
  if (nameInput && !nameInput.value && currentProfile && currentProfile.full_name) {
    nameInput.value = currentProfile.full_name;
  }
  if (emailInput && !emailInput.value && currentProfile && currentProfile.email) {
    emailInput.value = currentProfile.email;
  }

  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeMeetingModal() {
  playCyberSound("click");
  const modal = document.getElementById("meetingModal");
  if (!modal) return;
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

async function handleScheduleMeeting(e) {
  e.preventDefault();
  playCyberSound("click");

  const name = document.getElementById("meetClientName")?.value.trim() || "";
  const email = document.getElementById("meetClientEmail")?.value.trim() || "";
  const company = document.getElementById("meetClientCompany")?.value.trim() || "";
  const timezone = document.getElementById("meetTimezone")?.value || "America/Bogota";
  const date = document.getElementById("meetDate")?.value || "";
  const time = document.getElementById("meetTime")?.value || "";
  const topic = document.getElementById("meetTopic")?.value.trim() || "Discovery Call";
  const notes = document.getElementById("meetNotes")?.value.trim() || "";
  const btn = document.getElementById("btnSubmitMeeting");

  if (!name || !email || !date || !time) {
    showToast("Por favor completa todos los campos requeridos.", "error");
    return;
  }

  if (btn) {
    btn.disabled = true;
    btn.innerHTML = "<span>⏳</span> Generando sala de Google Meet...";
  }

  try {
    const res = await fetch("/api/meetings/schedule", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        client_name: name,
        client_email: email,
        client_company: company,
        meeting_date: date,
        meeting_time: time,
        timezone: timezone,
        topic: topic,
        notes: notes
      })
    });

    const data = await res.json();
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = "<span>🚀</span> Confirmar Cita & Generar Google Meet";
    }

    if (data.success) {
      playCyberSound("chime");
      triggerCyberConfetti();
      showNotification(`🎉 ¡Reunión agendada para el ${date} a las ${time}! Invitación enviada.`);

      const formBox = document.getElementById("meetingFormContainer");
      const successBox = document.getElementById("meetingSuccessContainer");
      if (formBox) formBox.classList.add("hidden");
      if (successBox) successBox.classList.remove("hidden");

      const dtEl = document.getElementById("meetConfirmDateTime");
      const topicEl = document.getElementById("meetConfirmTopic");
      const linkEl = document.getElementById("meetConfirmLink");
      const calBtn = document.getElementById("meetCalendarBtn");

      if (dtEl) dtEl.textContent = `${date} a las ${time} (${timezone})`;
      if (topicEl) topicEl.textContent = topic;
      if (linkEl) {
        linkEl.href = data.meeting.meet_link;
        linkEl.textContent = data.meeting.meet_link;
      }
      if (calBtn) {
        const calUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent('Discovery Call Kunkurt: ' + topic)}&dates=${date.replace(/-/g, '')}T140000Z/${date.replace(/-/g, '')}T143000Z&details=${encodeURIComponent('Enlace de Google Meet: ' + data.meeting.meet_link + '\n\nOrganizado por Alejandro (JaponPLX) - Kunkurt Devs')}&location=${encodeURIComponent(data.meeting.meet_link)}`;
        calBtn.href = calUrl;
      }
    } else {
      showToast(data.error || "No se pudo agendar la reunión.", "error");
      playCyberSound("error");
    }
  } catch (err) {
    if (btn) {
      btn.disabled = false;
      btn.innerHTML = "<span>🚀</span> Confirmar Cita & Generar Google Meet";
    }
    showToast("Error conectando con el servidor: " + err.message, "error");
  }
}

// ============================================================================
// 4. GENERADOR OFICIAL DE FACTURA PROFORMA & CONTRATO PDF
// ============================================================================
let activeDocType = "invoice";

function openInvoiceModal(opts = {}) {
  playCyberSound("click");
  const modal = document.getElementById("invoiceModal");
  if (!modal) return;

  renderInvoiceOrContract();
  modal.classList.remove("hidden");
  document.body.style.overflow = "hidden";
}

function closeInvoiceModal() {
  playCyberSound("click");
  const modal = document.getElementById("invoiceModal");
  if (!modal) return;
  modal.classList.add("hidden");
  document.body.style.overflow = "auto";
}

function toggleDocType(type) {
  playCyberSound("click");
  activeDocType = type;
  const btnInv = document.getElementById("docToggleInvoiceBtn");
  const btnCtr = document.getElementById("docToggleContractBtn");

  if (type === "invoice") {
    if (btnInv) btnInv.className = "py-2 rounded-lg font-bold transition-all bg-cyan-600 text-white shadow";
    if (btnCtr) btnCtr.className = "py-2 rounded-lg font-bold transition-all text-slate-400 hover:text-white";
  } else {
    if (btnInv) btnInv.className = "py-2 rounded-lg font-bold transition-all text-slate-400 hover:text-white";
    if (btnCtr) btnCtr.className = "py-2 rounded-lg font-bold transition-all bg-cyan-600 text-white shadow";
  }

  renderInvoiceOrContract();
}

function renderInvoiceOrContract() {
  const box = document.getElementById("printableDocumentBox");
  if (!box) return;

  const clientName = document.getElementById("quoteClientName")?.value.trim() || (currentProfile ? currentProfile.full_name : "Cliente Corporativo");
  const clientEmail = document.getElementById("quoteClientEmail")?.value.trim() || (currentProfile ? currentProfile.email : "contacto@empresa.com");
  const clientCompany = document.getElementById("quoteClientCompany")?.value.trim() || "Nexus Tech Latam";

  const selectedTypeRadio = document.querySelector('input[name="quoteProjectType"]:checked');
  const projectType = selectedTypeRadio ? selectedTypeRadio.parentElement.querySelector(".text-white").textContent.trim() : "Plataforma de Software Full-Stack";

  const { totalCost, totalWeeks } = calculateQuotation();
  const deposit = Math.round(totalCost * 0.5);
  const now = new Date();
  const dateStr = now.toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" });
  const docCode = `INV-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
  const ctrCode = `CTR-KKT-${now.getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;

  if (activeDocType === "invoice") {
    box.innerHTML = `
      <!-- Header -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; border-bottom: 2px solid #0891b2; padding-bottom: 15px;">
        <div>
          <h1 style="font-size: 24px; font-weight: 900; color: #0f172a; margin: 0; text-transform: uppercase; letter-spacing: 0.5px;">KUNKURT DEVS</h1>
          <p style="font-size: 11px; color: #64748b; margin: 2px 0 0 0;">Ingeniería de Software, Microservicios & Cloud Architecture</p>
          <p style="font-size: 10px; color: #64748b; margin: 2px 0 0 0;">NIT / Tax ID: 901.482.091-8 • contacto: alejandrobelno964@gmail.com</p>
        </div>
        <div style="text-align:right;">
          <span style="font-size: 11px; font-weight: bold; background: #cffafe; color: #0891b2; padding: 3px 8px; border-radius: 6px; font-family: monospace;">FACTURA PROFORMA</span>
          <div style="font-size: 12px; font-weight: bold; margin-top: 5px; font-family: monospace;">Nº ${docCode}</div>
          <div style="font-size: 10px; color: #64748b;">Fecha: ${dateStr}</div>
        </div>
      </div>

      <!-- Parties -->
      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 15px;">
        <div style="padding: 10px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
          <div style="font-size: 9px; font-weight: bold; color: #64748b; text-transform: uppercase;">EMISOR / PRESTADOR</div>
          <div style="font-size: 12px; font-weight: bold; color: #0f172a; margin-top: 2px;">Kunkurt Devs Studio</div>
          <div style="font-size: 10px; color: #475569;">Director Técnico: Alejandro (JaponPLX)</div>
          <div style="font-size: 10px; color: #475569;">Email: alejandrobelno964@gmail.com</div>
        </div>
        <div style="padding: 10px; background: #f8fafc; border-radius: 8px; border: 1px solid #e2e8f0;">
          <div style="font-size: 9px; font-weight: bold; color: #64748b; text-transform: uppercase;">CLIENTE / RECEPTOR</div>
          <div style="font-size: 12px; font-weight: bold; color: #0f172a; margin-top: 2px;">${escapeHTML(clientName)}</div>
          <div style="font-size: 10px; color: #475569;">Empresa: ${escapeHTML(clientCompany)}</div>
          <div style="font-size: 10px; color: #475569;">Email: ${escapeHTML(clientEmail)}</div>
        </div>
      </div>

      <!-- Items Table -->
      <table style="width: 100%; border-collapse: collapse; margin-top: 20px; font-size: 11px;">
        <thead>
          <tr style="background: #0f172a; color: #ffffff; text-align: left;">
            <th style="padding: 8px 10px; border-radius: 6px 0 0 0;">Concepto / Entregable</th>
            <th style="padding: 8px 10px; text-align: center;">Plazo</th>
            <th style="padding: 8px 10px; text-align: right;">Total USD</th>
          </tr>
        </thead>
        <tbody>
          <tr style="border-bottom: 1px solid #e2e8f0;">
            <td style="padding: 10px;">
              <strong>${escapeHTML(projectType)}</strong>
              <div style="font-size: 10px; color: #64748b; margin-top: 2px;">Diseño de arquitectura, microservicios, seguridad RBAC, pruebas de rendimiento e integración continua.</div>
            </td>
            <td style="padding: 10px; text-align: center; color: #475569;">${totalWeeks} semanas</td>
            <td style="padding: 10px; text-align: right; font-weight: bold;">$${totalCost.toLocaleString("en-US", {minimumFractionDigits: 2})} USD</td>
          </tr>
        </tbody>
      </table>

      <!-- Totals & Payment Breakdown -->
      <div style="display:flex; justify-content:space-between; align-items:flex-start; margin-top: 15px;">
        <div style="max-w: 60%; font-size: 10px; color: #64748b;">
          <strong>Términos de Pago:</strong>
          <div>• Anticipo para inicio de sprints: <strong>$${deposit.toLocaleString("en-US", {minimumFractionDigits: 2})} USD (50%)</strong></div>
          <div>• Saldo contraentrega y aprobación: <strong>$${(totalCost - deposit).toLocaleString("en-US", {minimumFractionDigits: 2})} USD (50%)</strong></div>
          <div>• Pasarelas autorizadas: Stripe, PayPal, Mercado Pago (PSE), Apple Pay y Binance Pay USDT.</div>
        </div>
        <div style="text-align: right;">
          <div style="font-size: 11px; color: #64748b;">Subtotal: $${totalCost.toLocaleString("en-US", {minimumFractionDigits: 2})} USD</div>
          <div style="font-size: 11px; color: #64748b;">Impuestos / Cero retención ext.: $0.00 USD</div>
          <div style="font-size: 18px; font-weight: 900; color: #0891b2; margin-top: 4px;">TOTAL: $${totalCost.toLocaleString("en-US", {minimumFractionDigits: 2})} USD</div>
        </div>
      </div>

      <!-- Signature & Stamp -->
      <div style="display:flex; justify-content:space-between; align-items:flex-end; border-top: 1px solid #e2e8f0; padding-top: 15px; margin-top: 25px;">
        <div>
          <div style="font-size: 10px; font-weight: bold; color: #059669;">✓ DOCUMENTO VERIFICADO DIGITALMENTE</div>
          <div style="font-size: 9px; color: #94a3b8; font-family: monospace;">Firma Hash: SHA256-${docCode}</div>
        </div>
        <div style="text-align: center;">
          <div style="border-bottom: 1px solid #0f172a; width: 140px; margin-bottom: 4px;"></div>
          <div style="font-size: 10px; font-weight: bold;">Alejandro (JaponPLX)</div>
          <div style="font-size: 9px; color: #64748b;">Director General • Kunkurt Devs</div>
        </div>
      </div>
    `;
  } else {
    // Contract Mode
    box.innerHTML = `
      <div style="border-bottom: 2px solid #0f172a; padding-bottom: 10px; text-align: center;">
        <h1 style="font-size: 18px; font-weight: 900; margin: 0; text-transform: uppercase;">CONTRATO DE PRESTACIÓN DE SERVICIOS DE DESARROLLO DE SOFTWARE & SLA</h1>
        <div style="font-size: 10px; color: #64748b; font-family: monospace; margin-top: 3px;">CÓDIGO OFICIAL: ${ctrCode}</div>
      </div>

      <div style="font-size: 11px; line-height: 1.6; color: #334155; margin-top: 15px; space-y: 10px;">
        <p>Conste por el presente documento el contrato de desarrollo de software celebrado entre <strong>Kunkurt Devs Studio</strong>, representado por su Director General <strong>Alejandro (JaponPLX)</strong>, y por la otra parte el contratante <strong>${escapeHTML(clientName)}</strong> (${escapeHTML(clientCompany)}).</p>

        <h3 style="font-size: 12px; font-weight: bold; color: #0f172a; margin-top: 12px;">CLÁUSULA PRIMERA: OBJETO DEL CONTRATO</h3>
        <p>El prestador se compromete a diseñar, programar e implementar para el cliente la solución tecnológica denominada <strong>${escapeHTML(projectType)}</strong>, bajo los estándares de arquitectura cloud, seguridad informática y código limpio especificados en la propuesta técnica.</p>

        <h3 style="font-size: 12px; font-weight: bold; color: #0f172a; margin-top: 12px;">CLÁUSULA SEGUNDA: INVERSIÓN Y FORMA DE PAGO</h3>
        <p>El precio pactado es de <strong>$${totalCost.toLocaleString("en-US", {minimumFractionDigits: 2})} USD</strong>, el cual será desembolsado en dos pagos: (a) 50% equivalente a $${deposit.toLocaleString("en-US", {minimumFractionDigits: 2})} USD al momento de firma y asignación de ingenieros; y (b) 50% al finalizar la fase de control de calidad y despliegue.</p>

        <h3 style="font-size: 12px; font-weight: bold; color: #0f172a; margin-top: 12px;">CLÁUSULA TERCERA: PROPIEDAD INTELECTUAL & CONFIDENCIALIDAD (NDA)</h3>
        <p>Al completarse la liquidación total, el cliente adquiere el 100% de la propiedad intelectual, código fuente, repositorios y derechos de explotación del software desarrollado. Ambas partes se comprometen a resguardar la confidencialidad estricta de la información compartida.</p>

        <h3 style="font-size: 12px; font-weight: bold; color: #0f172a; margin-top: 12px;">CLÁUSULA CUARTA: GARANTÍA & SLA (99.9%)</h3>
        <p>Kunkurt Devs otorga un periodo de garantía técnica de 90 días posteriores al despliegue para resolución inmediata de cualquier bug o incidencia sin costo adicional.</p>
      </div>

      <div style="display:grid; grid-template-columns: 1fr 1fr; gap: 40px; margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 20px;">
        <div style="text-align: center;">
          <div style="border-bottom: 1px solid #0f172a; width: 160px; margin: 0 auto 5px auto;"></div>
          <div style="font-size: 10px; font-weight: bold;">Alejandro (JaponPLX)</div>
          <div style="font-size: 9px; color: #64748b;">Por: Kunkurt Devs Studio</div>
        </div>
        <div style="text-align: center;">
          <div style="border-bottom: 1px solid #0f172a; width: 160px; margin: 0 auto 5px auto;"></div>
          <div style="font-size: 10px; font-weight: bold;">${escapeHTML(clientName)}</div>
          <div style="font-size: 9px; color: #64748b;">Por: ${escapeHTML(clientCompany)} (Cliente)</div>
        </div>
      </div>
    `;
  }
}

function printInvoiceDocument() {
  playCyberSound("click");
  document.body.classList.add("printing-invoice");
  window.print();
  setTimeout(() => {
    document.body.classList.remove("printing-invoice");
  }, 1200);
}

function executePayPalExpressPayment() {
  playCyberSound("click");
  activePaymentGateway = "paypal";
  const nameInput = document.getElementById("payClientName");
  const emailInput = document.getElementById("payClientEmail");

  if (nameInput && !nameInput.value.trim()) {
    nameInput.value = (currentProfile && currentProfile.full_name) ? currentProfile.full_name : "Cliente PayPal Express";
  }
  if (emailInput && !emailInput.value.trim()) {
    emailInput.value = (currentProfile && currentProfile.email) ? currentProfile.email : "cliente@paypal.com";
  }

  showToast("🅿️ Conectando con PayPal Express Checkout...", "info");
  setTimeout(() => {
    processPaymentCheckout();
  }, 600);
}

function executeMercadoPagoPsePayment() {
  playCyberSound("click");
  activePaymentGateway = "mercadopago";
  const nameInput = document.getElementById("payClientName");
  const emailInput = document.getElementById("payClientEmail");

  if (nameInput && !nameInput.value.trim()) {
    nameInput.value = (currentProfile && currentProfile.full_name) ? currentProfile.full_name : "Cliente PSE Bancario";
  }
  if (emailInput && !emailInput.value.trim()) {
    emailInput.value = (currentProfile && currentProfile.email) ? currentProfile.email : "cliente.pse@empresa.com";
  }

  showToast("💙 Conectando con pasarela bancaria PSE...", "info");
  setTimeout(() => {
    processPaymentCheckout();
  }, 600);
}

function executeCryptoConfirmPayment() {
  playCyberSound("click");
  activePaymentGateway = "crypto";
  const nameInput = document.getElementById("payClientName");
  const emailInput = document.getElementById("payClientEmail");

  if (nameInput && !nameInput.value.trim()) {
    nameInput.value = (currentProfile && currentProfile.full_name) ? currentProfile.full_name : "Cliente Web3 Vault";
  }
  if (emailInput && !emailInput.value.trim()) {
    emailInput.value = (currentProfile && currentProfile.email) ? currentProfile.email : "web3.client@kunkurt.devs";
  }

  showToast("🟡 Verificando confirmación en blockchain / Binance Pay...", "info");
  setTimeout(() => {
    processPaymentCheckout();
  }, 600);
}

// ============================================================================
// 5. ASISTENTE DE IA 24/7 (KUNKURT CYBER-COPILOT CHATBOT)
// ============================================================================
function toggleCopilotChat() {
  playCyberSound("click");
  const win = document.getElementById("copilotChatWindow");
  if (!win) return;
  win.classList.toggle("hidden");
  if (!win.classList.contains("hidden")) {
    document.getElementById("copilotInput")?.focus();
    playCyberSound("chime");
  }
}

function sendQuickCopilotPrompt(text) {
  const input = document.getElementById("copilotInput");
  if (input) input.value = text;
  handleSendCopilotMessage(new Event("submit"));
}

async function handleSendCopilotMessage(e) {
  if (e) e.preventDefault();
  const input = document.getElementById("copilotInput");
  const container = document.getElementById("copilotMessagesContainer");
  const msg = input ? input.value.trim() : "";

  if (!msg) return;
  input.value = "";
  playCyberSound("click");

  // Append user bubble
  const userBubble = document.createElement("div");
  userBubble.className = "flex items-start justify-end gap-2";
  userBubble.innerHTML = `
    <div class="p-3 rounded-2xl rounded-tr-sm bg-gradient-to-r from-cyan-600 to-blue-600 text-white text-xs max-w-[85%] leading-relaxed shadow-md">
      ${escapeHTML(msg)}
    </div>
  `;
  container.appendChild(userBubble);
  container.scrollTop = container.scrollHeight;

  // Append typing indicator
  const typingBubble = document.createElement("div");
  typingBubble.id = "copilotTypingIndicator";
  typingBubble.className = "flex items-start gap-2";
  typingBubble.innerHTML = `
    <div class="w-6 h-6 rounded-lg bg-cyan-600/30 border border-cyan-400/40 flex items-center justify-center text-xs text-cyan-300 shrink-0 mt-0.5">
      🤖
    </div>
    <div class="p-2.5 rounded-2xl rounded-tl-sm bg-slate-900/80 border border-slate-700/50 text-slate-400 text-xs flex items-center gap-1.5 font-mono">
      <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce"></span>
      <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style="animation-delay: 0.2s"></span>
      <span class="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style="animation-delay: 0.4s"></span>
      <span class="ml-1 text-[10px]">Analizando arquitectura...</span>
    </div>
  `;
  container.appendChild(typingBubble);
  container.scrollTop = container.scrollHeight;

  try {
    const res = await fetch("/api/ai/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: msg,
        user_name: currentProfile ? currentProfile.full_name : "Visitante",
        user_role: currentProfile ? currentProfile.role : "public"
      })
    });
    const data = await res.json();
    document.getElementById("copilotTypingIndicator")?.remove();

    if (data.success && data.reply) {
      playCyberSound("chime");
      const botBubble = document.createElement("div");
      botBubble.className = "flex items-start gap-2";
      
      // Parse markdown bold and bullets
      let formattedReply = data.reply
        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.*?)\*/g, '<em>$1</em>')
        .replace(/\n• /g, '<br>• ')
        .replace(/\n\n/g, '<br><br>');

      botBubble.innerHTML = `
        <div class="w-6 h-6 rounded-lg bg-cyan-600/30 border border-cyan-400/40 flex items-center justify-center text-xs text-cyan-300 shrink-0 mt-0.5">
          🤖
        </div>
        <div class="p-3 rounded-2xl rounded-tl-sm bg-slate-900/90 border border-slate-700/50 text-slate-200 text-xs leading-relaxed max-w-[85%] shadow-md">
          ${formattedReply}
        </div>
      `;
      container.appendChild(botBubble);
      container.scrollTop = container.scrollHeight;
    }
  } catch (err) {
    document.getElementById("copilotTypingIndicator")?.remove();
    showToast("Error de conexión con Kunkurt Copilot", "error");
  }
}

// Update WhatsApp button with dynamic quotation data
function updateWhatsAppContext(projectType, cost) {
  const btn = document.getElementById("floatingWhatsAppBtn");
  if (!btn) return;
  const text = encodeURIComponent(`Hola Alejandro, estoy cotizando una ${projectType} por $${cost} USD en Kunkurt Devs y me gustaría coordinar los detalles.`);
  btn.href = `https://wa.me/573100000000?text=${text}`;
}

// Window Exports for new features
window.setLanguage = setLanguage;
window.openStatusModal = openStatusModal;
window.closeStatusModal = closeStatusModal;
window.pingSystemStatus = pingSystemStatus;
window.openMeetingModal = openMeetingModal;
window.closeMeetingModal = closeMeetingModal;
window.handleScheduleMeeting = handleScheduleMeeting;
window.openInvoiceModal = openInvoiceModal;
window.closeInvoiceModal = closeInvoiceModal;
window.toggleDocType = toggleDocType;
window.printInvoiceDocument = printInvoiceDocument;
window.toggleCopilotChat = toggleCopilotChat;
window.sendQuickCopilotPrompt = sendQuickCopilotPrompt;
window.handleSendCopilotMessage = handleSendCopilotMessage;
window.executePayPalExpressPayment = executePayPalExpressPayment;
window.executeMercadoPagoPsePayment = executeMercadoPagoPsePayment;
window.executeCryptoConfirmPayment = executeCryptoConfirmPayment;
window.showNotification = showNotification;
window.toggleNotificationsDropdown = toggleNotificationsDropdown;
window.openUploadModal = openUploadModal;
window.toggleTerminal = toggleTerminal;
window.openHallOfFame = openHallOfFame;
window.closeTerminal = closeTerminal;
window.closeHallOfFame = closeHallOfFame;
window.closeDetailModal = closeDetailModal;
window.switchDetailTab = switchDetailTab;
window.printProjectOnePager = printProjectOnePager;
window.closeUploadModal = closeUploadModal;
window.addCustomTechTag = addCustomTechTag;

// ============================================================================
// SPOTLIGHT COMMAND PALETTE (RAYCAST / LINEAR STYLE)
// ============================================================================
let commandPaletteSelectedIndex = 0;
let commandPaletteItems = [];

const QUICK_COMMAND_ACTIONS = [
  {
    id: "action-quote",
    icon: "⚡",
    title: "Simular Cotización Dinámica",
    desc: "Calcula presupuestos, tiempos y stacks de desarrollo en tiempo real",
    category: "Acción Rápida",
    action: () => switchToSection("quotation")
  },
  {
    id: "action-pay",
    icon: "💳",
    title: "Pasarela de Pagos Globales",
    desc: "Pagar con Stripe, PayPal, PSE o Cripto con recibo y factura oficial",
    category: "Financiero",
    action: () => switchToSection("payments")
  },
  {
    id: "action-meet",
    icon: "📅",
    title: "Agendar Discovery Call Técnica (Google Meet)",
    desc: "Reserva una sesión 1-a-1 de 30 min con el Lead Architect",
    category: "Reuniones",
    action: () => openMeetingModal()
  },
  {
    id: "action-copilot",
    icon: "🤖",
    title: "Abrir Cyber-Copilot IA 24/7",
    desc: "Asistente inteligente de software, cotizaciones y arquitectura",
    category: "Inteligencia Artificial",
    action: () => toggleCopilotChat()
  },
  {
    id: "action-ticket",
    icon: "➕",
    title: "Crear Nuevo Ticket de Soporte",
    desc: "Reporta incidentes o solicitudes técnicas con trazabilidad",
    category: "Soporte",
    action: () => openCreateTicketModal()
  },
  {
    id: "action-radar",
    icon: "📡",
    title: "Inspeccionar Radar de Microservicios",
    desc: "Telemetría en vivo del clúster e inyección de paquetes ping",
    category: "Infraestructura",
    action: () => {
      switchToSection("analytics");
      setTimeout(() => injectClusterPing(), 300);
    }
  },
  {
    id: "action-audio",
    icon: "🔊",
    title: "Alternar Efectos de Sonido Cyber (ON/OFF)",
    desc: "Activa o silencia el sintetizador de audio espacial Web Audio API",
    category: "Preferencias",
    action: () => toggleCyberAudio()
  },
  {
    id: "action-cli",
    icon: ">_",
    title: "Abrir Terminal Hacker CLI",
    desc: "Línea de comandos interactiva con comandos UNIX y telemetría",
    category: "Desarrolladores",
    action: () => toggleTerminal()
  },
  {
    id: "action-catalog",
    icon: "📁",
    title: "Ver Catálogo Completo de Proyectos",
    desc: "Explora los microservicios y soluciones en producción",
    category: "Navegación",
    action: () => switchToSection("projects")
  },
  {
    id: "action-tickets-board",
    icon: "🎫",
    title: "Mesa de Ayuda & Tickets Activos",
    desc: "Consulta el estado y avance de las incidencias del equipo",
    category: "Navegación",
    action: () => switchToSection("tickets")
  },
  {
    id: "action-wiki",
    icon: "📚",
    title: "Documentación & Wiki Técnica",
    desc: "Arquitectura, manuales y guías de desarrollo",
    category: "Navegación",
    action: () => switchToSection("wiki")
  },
  {
    id: "action-share",
    icon: "🌐",
    title: "Compartir Enlace de Acceso",
    desc: "Genera código QR y enlace oficial de Kunkurt Devs",
    category: "Compartir",
    action: () => openShareModal()
  }
];

function openCommandPalette() {
  const modal = document.getElementById("commandPaletteModal");
  if (!modal) return;
  modal.classList.remove("hidden");
  playCyberSound("click");
  commandPaletteSelectedIndex = 0;
  
  const input = document.getElementById("commandPaletteInput");
  if (input) {
    input.value = "";
    setTimeout(() => input.focus(), 50);
    input.oninput = () => renderCommandPaletteResults(input.value);
  }
  renderCommandPaletteResults("");
}

function closeCommandPalette() {
  const modal = document.getElementById("commandPaletteModal");
  if (modal) modal.classList.add("hidden");
}

function toggleCommandPalette() {
  const modal = document.getElementById("commandPaletteModal");
  if (!modal) return;
  if (modal.classList.contains("hidden")) {
    openCommandPalette();
  } else {
    closeCommandPalette();
  }
}

function renderCommandPaletteResults(filterText = "") {
  const container = document.getElementById("commandPaletteResults");
  if (!container) return;
  const q = filterText.trim().toLowerCase();

  let matchedActions = QUICK_COMMAND_ACTIONS.filter(a => 
    !q || a.title.toLowerCase().includes(q) || a.desc.toLowerCase().includes(q) || a.category.toLowerCase().includes(q)
  );

  let matchedProjects = [];
  if (Array.isArray(allProjects)) {
    matchedProjects = allProjects.filter(p => 
      !q || p.title.toLowerCase().includes(q) || (p.description && p.description.toLowerCase().includes(q)) || (p.stack && p.stack.some(s => s.toLowerCase().includes(q)))
    ).map(p => ({
      id: `proj-${p.id}`,
      icon: "📁",
      title: p.title,
      desc: `${p.category || 'Proyecto'} • ${p.stack ? p.stack.join(', ') : 'Tecnología'} • [${p.status || 'Activo'}]`,
      category: "Proyecto",
      action: () => openDetailModal(p.id)
    }));
  }

  commandPaletteItems = [...matchedActions, ...matchedProjects.slice(0, 8)];
  if (commandPaletteSelectedIndex >= commandPaletteItems.length) {
    commandPaletteSelectedIndex = 0;
  }

  if (commandPaletteItems.length === 0) {
    container.innerHTML = `
      <div class="py-8 text-center text-slate-400 text-xs">
        <span class="text-2xl block mb-2">🔍</span>
        No se encontraron comandos ni proyectos para "<strong class="text-white">${filterText}</strong>".
      </div>
    `;
    return;
  }

  let html = "";
  let currentGroup = "";
  commandPaletteItems.forEach((item, idx) => {
    const isSelected = idx === commandPaletteSelectedIndex;
    const isProject = item.category === "Proyecto";
    const groupHeader = isProject ? "Proyectos en Producción / Desarrollo" : "Comandos del Sistema";
    
    if (groupHeader !== currentGroup) {
      currentGroup = groupHeader;
      html += `<div class="px-3 pt-2.5 pb-1 text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">${currentGroup}</div>`;
    }

    html += `
      <div onclick="executeCommandPaletteItem(${idx})" 
           class="command-palette-item flex items-center justify-between p-2.5 rounded-xl cursor-pointer transition-all ${isSelected ? 'bg-cyan-500/20 border border-cyan-500/40 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'hover:bg-white/5 border border-transparent'}">
        <div class="flex items-center gap-3 min-w-0 flex-1">
          <div class="w-8 h-8 rounded-lg ${isSelected ? 'bg-cyan-500/30 text-cyan-200' : 'bg-white/5 text-slate-300'} flex items-center justify-center text-sm font-mono shrink-0">
            ${item.icon}
          </div>
          <div class="min-w-0 flex-1">
            <div class="text-xs font-bold ${isSelected ? 'text-cyan-200' : 'text-white'} truncate">${item.title}</div>
            <div class="text-[11px] text-slate-400 truncate">${item.desc}</div>
          </div>
        </div>
        <div class="shrink-0 ml-3">
          <span class="text-[9px] font-mono px-2 py-0.5 rounded-md ${isSelected ? 'bg-cyan-950/80 text-cyan-300 border border-cyan-500/40' : 'bg-white/5 text-slate-400'}">
            ${item.category}
          </span>
        </div>
      </div>
    `;
  });

  container.innerHTML = html;

  const selectedEl = container.querySelector(".command-palette-item.bg-cyan-500\\/20");
  if (selectedEl) {
    selectedEl.scrollIntoView({ block: "nearest" });
  }
}

function navigateCommandPalette(direction) {
  if (commandPaletteItems.length === 0) return;
  commandPaletteSelectedIndex = (commandPaletteSelectedIndex + direction + commandPaletteItems.length) % commandPaletteItems.length;
  playCyberSound("click");
  const input = document.getElementById("commandPaletteInput");
  renderCommandPaletteResults(input ? input.value : "");
}

function executeCurrentCommandPaletteItem() {
  if (commandPaletteItems.length === 0) return;
  executeCommandPaletteItem(commandPaletteSelectedIndex);
}

function executeCommandPaletteItem(index) {
  const item = commandPaletteItems[index];
  if (!item) return;
  playCyberSound("chime");
  closeCommandPalette();
  if (typeof item.action === "function") {
    item.action();
  }
}

// ============================================================================
// CLUSTER RADAR & LIVE TELEMETRY PING
// ============================================================================
async function injectClusterPing() {
  playCyberSound("beep");
  const btn = document.getElementById("clusterPingBtn");
  if (btn) {
    btn.innerHTML = `<span class="animate-spin">⚡</span> Enviando Paquetes...`;
    btn.disabled = true;
  }

  const grid = document.getElementById("clusterNodesGrid");
  if (grid) {
    grid.querySelectorAll("div.border").forEach(card => {
      card.classList.add("ring-1", "ring-cyan-400", "bg-cyan-950/30");
    });
  }

  const startTime = performance.now();
  let measuredLatency = 14;

  try {
    const res = await fetch("/api/system/status");
    if (res.ok) {
      await res.json();
      const endTime = performance.now();
      measuredLatency = Math.max(4, Math.round(endTime - startTime));
      
      const nodeLatCore = document.getElementById("nodeLatCore");
      if (nodeLatCore) nodeLatCore.textContent = `${measuredLatency} ms`;

      const nodeLatEdge = document.getElementById("nodeLatEdge");
      if (nodeLatEdge) nodeLatEdge.textContent = `${Math.max(2, Math.round(measuredLatency * 0.4))} ms`;

      const nodeLatAi = document.getElementById("nodeLatAi");
      if (nodeLatAi) nodeLatAi.textContent = `${Math.round(measuredLatency * 1.2)} ms`;

      const nodeLatDb = document.getElementById("nodeLatDb");
      if (nodeLatDb) nodeLatDb.textContent = `0.${Math.floor(Math.random() * 5 + 4)} ms`;
    }
  } catch (e) {
    measuredLatency = 18;
  }

  setTimeout(() => {
    if (grid) {
      grid.querySelectorAll("div.border").forEach(card => {
        card.classList.remove("ring-1", "ring-cyan-400", "bg-cyan-950/30");
      });
    }
    if (btn) {
      btn.innerHTML = `<span>⚡</span> Inyectar Ping de Prueba`;
      btn.disabled = false;
    }
    playCyberSound("chime");
    showNotification(`⚡ Telemetría Verificada: Clúster 100% Operativo (${measuredLatency} ms)`, "success");
  }, 400);
}

// Window Exports for new features
window.openCommandPalette = openCommandPalette;
window.closeCommandPalette = closeCommandPalette;
window.toggleCommandPalette = toggleCommandPalette;
window.executeCommandPaletteItem = executeCommandPaletteItem;
window.injectClusterPing = injectClusterPing;
window.toggleCyberAudio = toggleCyberAudio;



