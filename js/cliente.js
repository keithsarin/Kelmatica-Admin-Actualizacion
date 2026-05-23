/* ========================================================
   KELMÁTICA - LOGIC CONTROL PANEL (CLIENTE UNIFICADO)
   ======================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // --------------------------------------------------------
    // 1. CONTROL DE LOGIN Y TRIGGERS DE INTERFAZ
    // --------------------------------------------------------
    // NOTA: Asegúrate de que las variables 'user' y 'pass' existan globalmente o vengan de tu sesión.
    if (typeof user !== 'undefined' && typeof pass !== 'undefined') {
        if (user === "cliente@gmail.com" && pass === "789") {
            const userTrigger = document.getElementById('user-trigger');
            const profileTrigger = document.getElementById('profile-trigger');
            const loginOverlay = document.getElementById('login-overlay');

            if (userTrigger) userTrigger.style.style.display = 'none';
            if (profileTrigger) profileTrigger.style.display = 'block';
            if (loginOverlay) loginOverlay.style.display = 'none';
        }
    }

    // --------------------------------------------------------
    // 2. DROPDOWN DE NAVBAR (MÉTODO 1: Por ID)
    // --------------------------------------------------------
    const profileBtn = document.getElementById('profile-trigger');
    const dropdown = document.getElementById('profile-dropdown');
    
    if (profileBtn && dropdown) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            dropdown.classList.toggle('active');
        });
    }

    // --------------------------------------------------------
    // 3. DROPDOWN DE NAVBAR (MÉTODO 2: Por Clases K-Profile)
    // --------------------------------------------------------
    const profileCircle = document.querySelector('.k-profile-circle');
    const profileDropdown = document.querySelector('.k-profile-dropdown');

    if (profileCircle && profileDropdown) {
        profileCircle.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });
    }

    // Cierre global para cualquiera de los dos Dropdowns al hacer clic fuera
    document.addEventListener('click', (e) => {
        if (dropdown && !profileBtn?.contains(e.target)) {
            dropdown.classList.remove('active');
        }
        if (profileDropdown && !profileCircle?.contains(e.target)) {
            profileDropdown.classList.remove('active');
        }
    });

    // --------------------------------------------------------
    // 4. SISTEMA DINÁMICO DE PESTAÑAS (TAB SECTIONS)
    // --------------------------------------------------------
    const navLinks = document.querySelectorAll(".dashboard-nav .nav-link[data-tab]");
    const tabSections = document.querySelectorAll(".tab-section");
    const dashboardTitle = document.getElementById("dynamic-dashboard-title");

    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener("click", (e) => {
                e.preventDefault(); // Detiene la recarga de página por heredar '#'

                // A. Alternar estados visuales en los botones de navegación
                navLinks.forEach(item => item.classList.remove("active"));
                link.classList.add("active");

                // B. Ocultar todas las secciones del panel actual
                tabSections.forEach(section => {
                    section.classList.remove("active");
                    section.style.display = "none"; // Refuerzo de ocultación directa
                });

                // C. Buscar y activar la sección solicitada por el data-tab
                const targetTabId = `tab-${link.getAttribute("data-tab")}`;
                const targetSection = document.getElementById(targetTabId);
                
                if (targetSection) {
                    targetSection.classList.add("active");
                    targetSection.style.display = "block"; // Asegura el renderizado
                }

                // D. Mapeo estructural de títulos (Estilo tipografía premium del Admin)
                const titleMapping = {
                    compras: "Mis Compras",
                    pedidos: "Mis Pedidos",
                    favoritos: "Mi Panel",
                    perfil: "Mi Perfil"
                };
                
                const selectedTab = link.getAttribute("data-tab");
                if (dashboardTitle && titleMapping[selectedTab]) {
                    dashboardTitle.textContent = titleMapping[selectedTab];
                }
            });
        });
    }
});