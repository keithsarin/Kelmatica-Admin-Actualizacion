/* KELMÁTICA - SCRIPT MAESTRO INTEGRADO 2026 */
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SELECCIÓN DE ELEMENTOS GLOBALES ---
    const userIcon = document.getElementById('user-trigger'); 
    const loginOverlay = document.getElementById('login-overlay');
    const closeBtn = document.getElementById('close-login');
    const profileTrigger = document.getElementById('profile-trigger');
    const profileDropdown = document.getElementById('profile-dropdown');
    const sesionGuardada = localStorage.getItem('sesionKelmatica');

    // --- 2. PERSISTENCIA DE SESIÓN ---
    if (sesionGuardada === 'activa') {
        if (userIcon) userIcon.style.display = 'none';
        if (profileTrigger) profileTrigger.style.display = 'block';
    }

    // --- 3. LÓGICA DE ABRIR / CERRAR LOGIN ---
    if (userIcon && loginOverlay) {
        userIcon.addEventListener('click', (e) => {
            e.preventDefault();
            loginOverlay.classList.add('active', 'show-overlay');
        });
    }

    if (closeBtn && loginOverlay) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginOverlay.classList.remove('active', 'show-overlay');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === loginOverlay) {
            loginOverlay.classList.remove('active', 'show-overlay');
        }
    });

    // --- 4. VALIDACIÓN DE LOGIN (CLIENTE, ARTISTA Y ADMIN) ---
    const btnClienteDirecto = document.getElementById('btn-client-direct');
    const btnAdminLogin = document.getElementById('btn-admin-login');
    const clientErrorMsg = document.getElementById('client-error-msg');
    const adminErrorMsg = document.getElementById('admin-error-msg');

    // Login Cliente
    if (btnClienteDirecto) {
        btnClienteDirecto.addEventListener('click', (e) => {
            e.preventDefault();
            const user = document.getElementById('client-user-direct').value;
            const pass = document.getElementById('client-pass-direct').value;

            if (user === "cliente@gmail.com" && pass === "789") {
                localStorage.setItem('sesionKelmatica', 'activa');
                loginOverlay.classList.remove('active', 'show-overlay');
                if (userIcon) userIcon.style.display = 'none'; 
                if (profileTrigger) profileTrigger.style.display = 'block'; 
                alert("¡Bienvenido a Kelmática!");
            } else {
                if (clientErrorMsg) {
                    clientErrorMsg.style.display = "block";
                    clientErrorMsg.innerText = "Correo o contraseña incorrectos.";
                }
            }
        });
    }

    // Login Artista / Administrador
    if (btnAdminLogin) {
        btnAdminLogin.addEventListener('click', (e) => {
            e.preventDefault();
            const role = document.getElementById('user-role').value;
            const u = document.getElementById('admin-user').value;
            const p = document.getElementById('admin-pass').value;

            if (role === "artista" && u === "artista" && p === "123") {
                window.location.href = "artista.html";
            } 
            else if (role === "administrador" && u === "admin" && p === "456") {
                window.location.href = "admin.html";
            } 
            else {
                if (adminErrorMsg) {
                    adminErrorMsg.style.display = "block";
                    adminErrorMsg.innerText = "Acceso denegado. Revisa tus credenciales.";
                }
            }
        });
    }

    // --- 5. MENÚ DE PERFIL Y CERRAR SESIÓN ---
    if (profileTrigger && profileDropdown) {
        profileTrigger.addEventListener('click', (e) => {
            e.stopPropagation();
            profileDropdown.classList.toggle('active');
        });
    }

    const btnLogout = document.getElementById('btn-logout');
    if (btnLogout) {
        btnLogout.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('sesionKelmatica');
            window.location.reload();
        });
    }

    document.addEventListener('click', () => {
        if (profileDropdown) profileDropdown.classList.remove('active');
    });

    // --- 6. INTERFAZ: CARRUSELES Y FAQ ---
    
    // FAQ Accordion
    document.querySelectorAll('.faq-item').forEach(item => {
        const q = item.querySelector('.faq-question');
        if (q) {
            q.addEventListener('click', () => {
                item.classList.toggle('active');
                const a = item.querySelector('.faq-answer');
                if (a) {
                    a.style.maxHeight = item.classList.contains('active') ? a.scrollHeight + "px" : "0";
                    a.style.opacity = item.classList.contains('active') ? "1" : "0";
                }
            });
        }
    });

    // Sliders de Galería
    const sliders = document.querySelectorAll('.style-slider-container-v2');
    sliders.forEach((container) => {
        const slides = container.querySelector('.style-slides-v2');
        const next = container.querySelector('.next-btn');
        const prev = container.querySelector('.prev-btn');
        const imgs = container.querySelectorAll('.style-slides-v2 img');
        let counter = 0;
        
        if (slides && next && prev && imgs.length > 0) {
            next.addEventListener('click', () => {
                counter = (counter + 1) % imgs.length;
                slides.style.transform = `translateX(${-counter * 100}%)`;
            });
            prev.addEventListener('click', () => {
                counter = (counter - 1 + imgs.length) % imgs.length;
                slides.style.transform = `translateX(${-counter * 100}%)`;
            });
        }
    });

    // --- 7. PANEL DE CONTROL: TABS (PESTAÑAS) ---
    const dashboardTabs = document.querySelectorAll('.nav-link');
    const tabPanes = document.querySelectorAll('.tab-content');

    if (dashboardTabs.length > 0) {
        dashboardTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                dashboardTabs.forEach(t => t.classList.remove('active'));
                tabPanes.forEach(p => p.classList.remove('active'));

                tab.classList.add('active');
                const targetId = tab.getAttribute('data-tab');
                const targetPane = document.getElementById(targetId);
                if (targetPane) targetPane.classList.add('active');
            });
        });
    }

    // Limpiar errores al escribir en cualquier input
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', () => {
            if (clientErrorMsg) clientErrorMsg.style.display = "none";
            if (adminErrorMsg) adminErrorMsg.style.display = "none";
        });
    });

});