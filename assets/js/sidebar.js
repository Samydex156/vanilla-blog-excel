document.addEventListener("DOMContentLoaded", () => {
  const sidebarContainer = document.getElementById("sidebar-container");
  if (!sidebarContainer) return;

  // Renderizar la estructura del menú lateral (aside)
  sidebarContainer.innerHTML = `
    <a href="index.html" class="brand">
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <line x1="10" y1="9" x2="8" y2="9"></line>
      </svg>
      Excel
    </a>
    <nav>
      <ul>
        <li><a href="practicas.html" data-page="practicas">Prácticas</a></li>
        <li><a href="guias.html" data-page="guias">Guías</a></li>
        <li><a href="formulas.html" data-page="formulas">Fórmulas</a></li>
        <li><a href="atajos.html" data-page="atajos">Atajos</a></li>
        <li><a href="herramientas.html" data-page="herramientas">Herramientas</a></li>
        <li><a href="index.html" data-page="index">Infografías</a></li>
        <li><a href="tips.html" data-page="tips">Tips</a></li>
        <li><a href="teoria.html" data-page="teoria">Teoría</a></li>
        <li><a href="evaluaciones.html" data-page="evaluaciones">Evaluaciones</a></li>
      </ul>
    </nav>
  `;

  // Detectar la página actual de la URL
  const currentPath = window.location.pathname.toLowerCase();
  const filename = currentPath.split("/").pop() || "index.html";
  const pageName = filename.replace(".html", "") || "index";

  // Buscar y marcar el enlace activo
  const links = sidebarContainer.querySelectorAll("nav a");
  links.forEach(link => {
    const dataPage = link.getAttribute("data-page");
    // Si la página coincide, o si es la raíz vacía que resuelve a index
    if (pageName === dataPage || (pageName === "index" && dataPage === "index")) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
});
