/* KELMÁTICA - SCRIPT MAESTRO 2026*/
document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SELECCIÓN DE ELEMENTOS ---
    const userIcon = document.getElementById('user-trigger'); 
    const loginOverlay = document.getElementById('login-overlay');
    const closeBtn = document.getElementById('close-login');
    const btnAdminLogin = document.getElementById('btn-admin-login');
    const userRole = document.getElementById('user-role');
    const adminUser = document.getElementById('admin-user');
    const adminPass = document.getElementById('admin-pass');
    const errorMsg = document.getElementById('admin-error-msg');

    // --- 2. LÓGICA DE ABRIR / CERRAR LOGIN ---
    if (userIcon && loginOverlay) {
        userIcon.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            loginOverlay.classList.add('active');
        });
    }

    if (closeBtn && loginOverlay) {
        closeBtn.addEventListener('click', (e) => {
            e.preventDefault();
            loginOverlay.classList.remove('active');
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target === loginOverlay) {
            loginOverlay.classList.remove('active');
        }
    });

    // --- 3. VALIDACIÓN DE LOGIN (ÚNICA Y DEFINITIVA) ---
    if (btnAdminLogin) {
        btnAdminLogin.addEventListener('click', (e) => {
            e.preventDefault();
            
            const role = userRole.value;
            const user = adminUser.value;
            const pass = adminPass.value;

            // Validación de credenciales
            if (role === "artista" && user === "artista" && pass === "123") {
                window.location.href = "artista.html";
            } 
            else if (role === "administrador" && user === "admin" && pass === "456") {
                window.location.href = "admin.html";
            } 
            else {
                // Mostrar error en texto rojo
                if (errorMsg) {
                    errorMsg.style.display = "block";
                    errorMsg.innerText = "Usuario o contraseña incorrectos.";
                }
                adminPass.value = ""; 
            }
        });
    }

    // Ocultar error al volver a escribir
    [adminUser, adminPass, userRole].forEach(input => {
        if (input) {
            input.addEventListener('input', () => {
                if (errorMsg) errorMsg.style.display = "none";
            });
        }
    });

    // --- 4. CARRUSELES Y FAQ (RESTO DEL CÓDIGO) ---
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                item.classList.toggle('active');
                const answer = item.querySelector('.faq-answer');
                if (answer) {
                    answer.style.maxHeight = item.classList.contains('active') ? answer.scrollHeight + "px" : "0";
                    answer.style.opacity = item.classList.contains('active') ? "1" : "0";
                }
            });
        }
    });

    const slidersV2 = document.querySelectorAll('.style-slider-container-v2');
    slidersV2.forEach((container) => {
        const slidesContainer = container.querySelector('.style-slides-v2');
        const nextBtn = container.querySelector('.next-btn');
        const prevBtn = container.querySelector('.prev-btn');
        const images = container.querySelectorAll('.style-slides-v2 img');
        let counter = 0;
        const total = images.length;

        if (slidesContainer && nextBtn && prevBtn && total > 0) {
            images.forEach(img => { img.style.minWidth = "100%"; });
            nextBtn.addEventListener('click', () => {
                counter = (counter + 1) % total;
                slidesContainer.style.transform = `translateX(${-counter * 100}%)`;
            });
            prevBtn.addEventListener('click', () => {
                counter = (counter - 1 + total) % total;
                slidesContainer.style.transform = `translateX(${-counter * 100}%)`;
            });
        }
    });
});

const userBtn = document.getElementById('user-trigger');
const overlay = document.getElementById('login-overlay');
const closeBtn = document.getElementById('close-login');

// Abrir menú (Usamos show-overlay para que coincida con el CSS)
userBtn.addEventListener('click', () => {
    overlay.classList.add('show-overlay');
});

// Cerrar menú
closeBtn.addEventListener('click', () => {
    overlay.classList.remove('show-overlay');
});