document.addEventListener('DOMContentLoaded', () => {
    // === 1. NAVEGACIÓN DEL PANEL ===
    const menuItems = document.querySelectorAll('.sidebar-nav li');
    const sections = document.querySelectorAll('.content-section');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');

            // Quitar clase activa de todos los botones y secciones
            menuItems.forEach(i => i.classList.remove('active'));
            sections.forEach(s => s.style.display = 'none');

            // Activar el botón clicado y mostrar la sección correspondiente
            item.classList.add('active');
            const targetElement = document.getElementById(`section-${targetSection}`);
            if (targetElement) {
                targetElement.style.display = 'block';
            }
        });
    });

    // === 2. LÓGICA DE GRÁFICOS (CHART.JS) ===
    const ctxVentas = document.getElementById('chartVentas');
    if (ctxVentas) {
        new Chart(ctxVentas, {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
                datasets: [{
                    label: 'Ventas en COP',
                    data: [1200000, 1900000, 3000000, 2500000, 4000000, 4500000],
                    borderColor: '#d4af37',
                    backgroundColor: 'rgba(212, 175, 55, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: { responsive: true, plugins: { legend: { labels: { color: '#fff' } } } }
        });
    }

    const ctxObras = document.getElementById('chartObras');
    if (ctxObras) {
        new Chart(ctxObras, {
            type: 'doughnut',
            data: {
                labels: ['Óleos', 'Digital', 'Escultura'],
                datasets: [{
                    data: [300, 50, 100],
                    backgroundColor: ['#d4af37', '#8e6d1c', '#444']
                }]
            },
            options: { responsive: true, plugins: { legend: { position: 'bottom', labels: { color: '#fff' } } } }
        });
    }

    // === 3. BÚSQUEDA EN TIEMPO REAL ===
    const buscador = document.getElementById('user-search');
    if (buscador) {
        buscador.addEventListener('input', (e) => {
            actualizarTabla(e.target.value);
        });
    }

    // === 4. ASIGNAR EVENTO AL FORMULARIO ===
    const formUsuario = document.getElementById('form-usuario');
    if (formUsuario) {
        formUsuario.addEventListener('submit', function(e) {
            e.preventDefault();

            const index = document.getElementById('user-index').value;
            
            const datosUsuario = {
                nombre: document.getElementById('user-nombre').value,
                apellido: document.getElementById('user-apellido').value,
                email: document.getElementById('user-email').value,
                celular: document.getElementById('user-celular').value,
                direccion: document.getElementById('user-direccion').value,
                estado: document.getElementById('user-estado').value,
                rol: "Cliente" // Rol asignado por defecto para esta sección
            };

            if (index === "") {
                // Crear nuevo
                usuarios.push(datosUsuario);
            } else {
                // Editar existente
                usuarios[index] = datosUsuario;
            }

            // Guardar en LocalStorage y refrescar
            localStorage.setItem('kelmatica_usuarios', JSON.stringify(usuarios));
            cerrarModalUsuario();
            actualizarTabla();
        });
    }

    // Escuchar el clic del botón "Agregar" para abrir el modal limpio
    const btnNuevoUsuario = document.querySelector('.btn-add-user');
    if (btnNuevoUsuario) {
        btnNuevoUsuario.addEventListener('click', () => abrirModalUsuario());
    }

    // Carga inicial de la tabla al abrir el panel
    actualizarTabla();
});

// === 5. PERSISTENCIA DE DATOS (GLOBAL) ===
let usuarios = JSON.parse(localStorage.getItem('kelmatica_usuarios')) || [
    { nombre: "Keith", apellido: "Galvan", email: "keisamg18@gmail.com", celular: "321654", direccion: "Cra 123", estado: "Activo", rol: "Cliente" }
];

// === 6. FUNCIONES GLOBALES DEL CRUD Y MODALES ===

window.abrirModalUsuario = (index = null) => {
    const modal = document.getElementById('modal-usuario');
    const form = document.getElementById('form-usuario');
    const titulo = document.getElementById('modal-usuario-titulo');
    
    if (!modal || !form) return;

    modal.style.display = 'flex';
    form.reset(); // Limpia campos previos

    if (index !== null) {
        // MODO EDICIÓN
        if (titulo) titulo.innerText = "EDITAR PERFIL DE CLIENTE";
        const user = usuarios[index];
        document.getElementById('user-index').value = index;
        document.getElementById('user-nombre').value = user.nombre;
        document.getElementById('user-apellido').value = user.apellido;
        document.getElementById('user-email').value = user.email;
        document.getElementById('user-celular').value = user.celular;
        document.getElementById('user-direccion').value = user.direccion;
        document.getElementById('user-estado').value = user.estado;
    } else {
        // MODO NUEVO
        if (titulo) titulo.innerText = "AGREGAR NUEVO PERFIL";
        document.getElementById('user-index').value = "";
    }
};

window.cerrarModalUsuario = () => {
    const modal = document.getElementById('modal-usuario');
    const form = document.getElementById('form-usuario');
    if (modal) modal.style.display = 'none';
    if (form) form.reset();
    const indexInput = document.getElementById('user-index');
    if (indexInput) indexInput.value = "";
};

window.eliminarUsuario = (index) => {
    if (confirm("¿Estás seguro de eliminar este usuario?")) {
        usuarios.splice(index, 1);
        localStorage.setItem('kelmatica_usuarios', JSON.stringify(usuarios));
        actualizarTabla();
    }
};

window.actualizarTabla = (filtro = "") => {
    // Soporta tanto 'tabla-usuarios-body' como 'lista-usuarios-body' según tu HTML
    const tbody = document.getElementById('tabla-usuarios-body') || document.getElementById('lista-usuarios-body'); 
    if (!tbody) return;

    tbody.innerHTML = ""; // Limpiar filas

    // Filtrar usuarios por nombre o rol si hay un criterio de búsqueda
    const usuariosFiltrados = usuarios.filter(u => 
        u.nombre.toLowerCase().includes(filtro.toLowerCase()) || 
        u.rol.toLowerCase().includes(filtro.toLowerCase())
    );

    usuarios.forEach((user, index) => {
        // Si no pasa el filtro de búsqueda, saltarlo en el render
        if (filtro && !usuariosFiltrados.includes(user)) return;

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.nombre} ${user.apellido}</td>
            <td>${user.rol}</td>
            <td><span class="status-${user.estado.toLowerCase()}">${user.estado}</span></td>
            <td>
                <button class="btn-icon" onclick="abrirModalUsuario(${index})">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-icon btn-delete" onclick="eliminarUsuario(${index})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
};

// === 7. GESTIÓN DE REVISIÓN DE OBRAS ===
window.verFichaObra = (titulo, cliente, artista, desc, precio, img) => {
    document.getElementById('modal-obra-titulo').innerText = titulo;
    document.getElementById('modal-cliente').innerText = cliente;
    document.getElementById('modal-obra-artista').innerText = artista;
    document.getElementById('modal-descripcion').innerText = desc;
    document.getElementById('modal-presupuesto').innerText = precio;
    document.getElementById('modal-obra-img').src = img;
    
    document.getElementById('modal-revision').style.display = 'flex';
};

window.cerrarModalRevision = () => {
    const modalRevision = document.getElementById('modal-revision');
    if (modalRevision) modalRevision.style.display = 'none';
};

window.enviarAlArtista = (aprobado) => {
    if (aprobado) {
        alert("✅ Solicitud enviada al artista con éxito.");
    } else {
        alert("❌ Solicitud rechazada.");
    }
    cerrarModalRevision();
};

// Cerrar modales haciendo clic afuera del recuadro
window.onclick = (event) => {
    const modalUsuario = document.getElementById('modal-usuario');
    const modalRevision = document.getElementById('modal-revision');
    if (event.target === modalUsuario) cerrarModalUsuario();
    if (event.target === modalRevision) cerrarModalRevision();
};