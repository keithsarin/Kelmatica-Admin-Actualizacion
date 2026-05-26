document.addEventListener('DOMContentLoaded', () => {
    const menuItems = document.querySelectorAll('.sidebar-nav li');
    const sections = document.querySelectorAll('.content-section');

    menuItems.forEach(item => {
        item.addEventListener('click', () => {
            const targetSection = item.getAttribute('data-section');

            menuItems.forEach(i => i.classList.remove('active'));
            sections.forEach(s => s.style.display = 'none');

            item.classList.add('active');
            const targetElement = document.getElementById(`section-${targetSection}`);
            if (targetElement) {
                targetElement.style.display = 'block';
            }
        });
    });

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

    const buscador = document.getElementById('user-search');
    if (buscador) {
        buscador.addEventListener('input', (e) => {
            actualizarTabla(e.target.value);
        });
    }

    const formUsuario = document.getElementById('form-usuario');
    if (formUsuario) {
        formUsuario.addEventListener('submit', function(e) {
            e.preventDefault();

            const index = document.getElementById('user-index').value;
            const password        = document.getElementById('user-password').value;
const passwordConfirm = document.getElementById('user-password-confirm').value;

if (password !== '' && password !== passwordConfirm) {
    alert('Las contraseñas no coinciden.');
    return;
}
formUsuario.addEventListener('submit', function(e) {
    e.preventDefault();

    const index = document.getElementById('user-index').value;
    const password        = document.getElementById('user-password').value;
    const passwordConfirm = document.getElementById('user-password-confirm').value;

    if (password !== '' && password !== passwordConfirm) {
        alert('Las contraseñas no coinciden.');
        return;
    }

    const datosUsuario = {
        nombre:    document.getElementById('user-nombre').value,
        apellido:  document.getElementById('user-apellido').value,
        email:     document.getElementById('user-email').value,
        celular:   document.getElementById('user-celular').value,
        direccion: document.getElementById('user-direccion').value,
        estado:    document.getElementById('user-estado').value,
        rol:       "Cliente",
        password:  password !== '' ? password : (index !== "" ? usuarios[index].password : '')
    };

    if (index === "") {
        usuarios.push(datosUsuario);
    } else {
        usuarios[index] = datosUsuario;
    }

    localStorage.setItem('kelmatica_usuarios', JSON.stringify(usuarios));
    cerrarModalUsuario();
    actualizarTabla();
});
            const datosUsuario = {
                nombre: document.getElementById('user-nombre').value,
                apellido: document.getElementById('user-apellido').value,
                email: document.getElementById('user-email').value,
                celular: document.getElementById('user-celular').value,
                direccion: document.getElementById('user-direccion').value,
                estado: document.getElementById('user-estado').value,
                rol: "Cliente" 
            };

            if (index === "") {
               
                usuarios.push(datosUsuario);
            } else {
                
                usuarios[index] = datosUsuario;
            }

            localStorage.setItem('kelmatica_usuarios', JSON.stringify(usuarios));
            cerrarModalUsuario();
            actualizarTabla();
        });
    }

    const btnNuevoUsuario = document.querySelector('.btn-add-user');
    if (btnNuevoUsuario) {
        btnNuevoUsuario.addEventListener('click', () => abrirModalUsuario());
    }

    actualizarTabla();
});

let usuarios = JSON.parse(localStorage.getItem('kelmatica_usuarios')) || [
    { nombre: "Keith", apellido: "Galvan", email: "keisamg18@gmail.com", celular: "321654", direccion: "Cra 123", estado: "Activo", rol: "Cliente" }
];

window.abrirModalUsuario = (index = null) => {
    const modal = document.getElementById('modal-usuario');
    const form = document.getElementById('form-usuario');
    const titulo = document.getElementById('modal-usuario-titulo');
    
    if (!modal || !form) return;

    modal.style.display = 'flex';
    form.reset(); 

    if (index !== null) {
       
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
    const tbody = document.getElementById('tabla-usuarios-body') 
               || document.getElementById('lista-usuarios-body');
    if (!tbody) return;

    tbody.innerHTML = "";

    const usuariosFiltrados = usuarios.filter(u =>
        u.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
        u.apellido.toLowerCase().includes(filtro.toLowerCase()) ||
        u.rol.toLowerCase().includes(filtro.toLowerCase())
    );

    usuariosFiltrados.forEach((user, index) => {
        const indexReal = usuarios.indexOf(user);

        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${user.nombre} ${user.apellido}</td>
            <td>${user.email || '—'}</td>
            <td>${user.celular || '—'}</td>
            <td><span class="status-${user.estado.toLowerCase()}">${user.estado}</span></td>
            <td>${user.direccion || '—'}</td>
            <td>
                <button class="btn-icon" title="Editar" onclick="abrirModalUsuario(${indexReal})">
                    <i class="fa-solid fa-pen"></i>
                </button>
                <button class="btn-icon btn-delete" title="Eliminar" onclick="eliminarUsuario(${indexReal})">
                    <i class="fa-solid fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(tr);
    });
};

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

window.onclick = (event) => {
    const modalUsuario = document.getElementById('modal-usuario');
    const modalRevision = document.getElementById('modal-revision');
    if (event.target === modalUsuario) cerrarModalUsuario();
    if (event.target === modalRevision) cerrarModalRevision();
};