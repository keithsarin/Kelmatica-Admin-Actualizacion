
if (user === "cliente@gmail.com" && pass === "789") {
    document.getElementById('user-trigger').style.display = 'none';
    document.getElementById('profile-trigger').style.display = 'block';
}

const profileBtn = document.getElementById('profile-trigger');
const dropdown = document.getElementById('profile-dropdown');
if (profileBtn) {
    profileBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('active');
    });
}
document.addEventListener('click', () => {
    if (dropdown) dropdown.classList.remove('active');
});
if (user === "cliente@gmail.com" && pass === "789") {
    document.getElementById('user-trigger').style.display = 'none'; 
    document.getElementById('profile-trigger').style.display = 'block';
    document.getElementById('login-overlay').style.display = 'none'; 
}
/*CLIENTE- COMPRAS*/

// Abrir/Cerrar Dropdown de Perfil
const profileCircle = document.querySelector('.k-profile-circle');
const profileDropdown = document.querySelector('.k-profile-dropdown');

if (profileCircle) {
    profileCircle.addEventListener('click', () => {
        profileDropdown.classList.toggle('active');
    });

    // Cerrar si haces clic fuera
    window.addEventListener('click', (e) => {
        if (!profileCircle.contains(e.target)) {
            profileDropdown.classList.remove('active');
        }
    });
}