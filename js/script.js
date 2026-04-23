<<<<<<< HEAD
/* KELMÁTICA - SCRIPT MAESTRO 2026 */
document.addEventListener('DOMContentLoaded', () => {

    // --- 0. PERSISTENCIA DE SESIÓN (REVISAR AL CARGAR) ---
    const sesionGuardada = localStorage.getItem('sesionKelmatica');
    const userTrigger = document.getElementById('user-trigger');
    const profileTrigger = document.getElementById('profile-trigger');

    if (sesionGuardada === 'activa') {
        if (userTrigger) userTrigger.style.display = 'none';
        if (profileTrigger) profileTrigger.style.display = 'block';
    }

    // --- 1. SELECCIÓN DE ELEMENTOS ---
=======
document.addEventListener('DOMContentLoaded', () => {

    const userIcon = document.getElementById('user-trigger'); 
>>>>>>> 97354fc2cedd0feec997e692037aeae22c42ecab
    const loginOverlay = document.getElementById('login-overlay');
    const closeBtn = document.getElementById('close-login');
    const btnAdminLogin = document.getElementById('btn-admin-login');
    const userRole = document.getElementById('user-role');
    const adminUser = document.getElementById('admin-user');
    const adminPass = document.getElementById('admin-pass');
    
    const clientErrorMsg = document.getElementById('client-error-msg'); 
    const adminErrorMsg = document.getElementById('admin-error-msg');
    const profileDropdown = document.getElementById('profile-dropdown');

<<<<<<< HEAD
    // --- 2. LÓGICA DE ABRIR / CERRAR LOGIN ---
    if (userTrigger && loginOverlay) {
        userTrigger.addEventListener('click', (e) => {
=======
    if (userIcon && loginOverlay) {
        userIcon.addEventListener('click', (e) => {
>>>>>>> 97354fc2cedd0feec997e692037aeae22c42ecab
            e.preventDefault();
            e.stopPropagation();
            loginOverlay.classList.add('active');
            loginOverlay.classList.add('show-overlay');
        });
    }

    if (closeBtn && loginOverlay) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginOverlay.classList.remove('active');
            loginOverlay.classList.remove('show-overlay');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === loginOverlay) {
            loginOverlay.classList.remove('active');
            loginOverlay.classList.remove('show-overlay');
        }
    });
<<<<<<< HEAD

    // --- 3. VALIDACIÓN DE LOGIN ---

    // Lógica para el Cliente (Formulario Izquierdo)
    const btnClienteDirecto = document.getElementById('btn-client-direct');
    if (btnClienteDirecto) {
        btnClienteDirecto.addEventListener('click', (e) => {
            e.preventDefault();
            const user = document.getElementById('client-user-direct').value;
            const pass = document.getElementById('client-pass-direct').value;

            if (user === "cliente@gmail.com" && pass === "789") {
                // GUARDAR SESIÓN
                localStorage.setItem('sesionKelmatica', 'activa');
                
                // CAMBIO VISUAL INMEDIATO
                loginOverlay.classList.remove('active');
                loginOverlay.classList.remove('show-overlay');
                if (userTrigger) userTrigger.style.display = 'none'; 
                if (profileTrigger) profileTrigger.style.display = 'block'; 
                
                console.log("Sesión iniciada");
            } else {
                if (clientErrorMsg) {
                    clientErrorMsg.style.display = "block";
                    clientErrorMsg.innerText = "Correo o contraseña incorrectos.";
=======
    if (btnAdminLogin) {
        btnAdminLogin.addEventListener('click', (e) => {
            e.preventDefault();
            
            const role = userRole.value;
            const user = adminUser.value;
            const pass = adminPass.value;

            if (role === "artista" && user === "artista" && pass === "123") {
                window.location.href = "artista.html";
            } 
            else if (role === "administrador" && user === "admin" && pass === "456") {
                window.location.href = "admin.html";
            } 
            else {
                if (errorMsg) {
                    errorMsg.style.display = "block";
                    errorMsg.innerText = "Usuario o contraseña incorrectos.";
>>>>>>> 97354fc2cedd0feec997e692037aeae22c42ecab
                }
                document.getElementById('client-pass-direct').value = ""; 
            }
        });
    }

<<<<<<< HEAD
    // Lógica para Artista/Admin (Formulario Derecho)
    if (btnAdminLogin) {
        btnAdminLogin.addEventListener('click', (e) => {
            e.preventDefault();
            const role = userRole.value;
            const u = adminUser.value;
            const p = adminPass.value;

            if (role === "artista" && u === "artista" && p === "123") {
                window.location.href = "artista.html";
            } 
            else if (role === "administrador" && u === "admin" && p === "456") {
                window.location.href = "admin.html";
            } 
            else {
                if (adminErrorMsg) {
                    adminErrorMsg.style.display = "block";
                    adminErrorMsg.innerText = "Acceso denegado.";
                }
                adminPass.value = "";
            }
        });
    }

    // --- 4. MENÚ DE PERFIL Y CERRAR SESIÓN ---
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
            window.location.reload(); // Recarga para limpiar la vista
        });
    }

    document.addEventListener('click', () => {
        if (profileDropdown) profileDropdown.classList.remove('active');
    });

    // --- 5. CARRUSELES Y FAQ (Tu código original) ---
=======
    [adminUser, adminPass, userRole].forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                if (errorMsg) errorMsg.style.display = "none";
            });
        }
    });

>>>>>>> 97354fc2cedd0feec997e692037aeae22c42ecab
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

    const sliders = document.querySelectorAll('.style-slider-container-v2');
    sliders.forEach((container) => {
        const slides = container.querySelector('.style-slides-v2');
        const next = container.querySelector('.next-btn');
        const prev = container.querySelector('.prev-btn');
        const imgs = container.querySelectorAll('.style-slides-v2 img');
        let counter = 0;
        if (slides && next && prev && imgs.length > 0) {
            imgs.forEach(img => { img.style.minWidth = "100%"; });
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

    // Limpiar errores al escribir
    document.querySelectorAll('.k-input-field').forEach(input => {
        input.addEventListener('input', () => {
            if (clientErrorMsg) clientErrorMsg.style.display = "none";
            if (adminErrorMsg) adminErrorMsg.style.display = "none";
        });
    });

});
// Lógica para cambiar de pestañas en el panel
const dashboardTabs = document.querySelectorAll('.nav-link');
const tabPanes = document.querySelectorAll('.tab-content');

dashboardTabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Quitar clase activa de todos
        dashboardTabs.forEach(t => t.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));

<<<<<<< HEAD
        // Activar el clickeado
        tab.classList.add('active');
        const targetId = tab.getAttribute('data-tab');
        document.getElementById(targetId).classList.add('active');
    });
});
=======
userBtn.addEventListener('click', () => {
    overlay.classList.add('show-overlay');
});

closeBtn.addEventListener('click', () => {
    overlay.classList.remove('show-overlay');
});
>>>>>>> 97354fc2cedd0feec997e692037aeae22c42ecab
