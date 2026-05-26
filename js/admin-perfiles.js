document.addEventListener("DOMContentLoaded", () => {
    const perfilesPredeterminados = [
        { id: "1", nombre: "Juan Pérez", rol: "Artista", estado: "Activo" },
        { id: "2", nombre: "María Paulina", rol: "Cliente", estado: "Activo" },
        { id: "3", nombre: "Kelly Galván", rol: "Administrador", estado: "Activo" }
    ];

    let perfiles = JSON.parse(localStorage.getItem("kelmatica_perfiles"));
    if (!perfiles) {
        perfiles = perfilesPredeterminados;
        localStorage.setItem("kelmatica_perfiles", JSON.stringify(perfiles));
    }

    const tablaBody = document.getElementById("lista-usuarios-body");
    const modal = document.getElementById("modal-perfil");
    const formPerfil = document.getElementById("form-perfil");
    const modalTitulo = document.getElementById("modal-titulo");
    
    const inputId = document.getElementById("perfil-id");
    const inputNombre = document.getElementById("perfil-nombre");
    const inputRol = document.getElementById("perfil-rol");
    const inputEstado = document.getElementById("perfil-estado");
    const inputBuscar = document.getElementById("user-search");

    const btnAbrirModal = document.getElementById("btn-abrir-modal");
    const btnCerrarModal = document.getElementById("btn-cerrar-modal");
    const btnCancelar = document.getElementById("btn-cancelar");

    function renderizarTabla(listaADibujar = perfiles) {
        tablaBody.innerHTML = "";
        
        if(listaADibujar.length === 0) {
            tablaBody.innerHTML = `<tr><td colspan="4" style="text-align:center; color:#888;">No se encontraron perfiles.</td></tr>`;
            return;
        }

        listaADibujar.forEach(perfil => {
            const tr = document.createElement("tr");
            
            const claseEstado = perfil.estado === "Activo" ? "status-active" : "status-inactive";

            tr.innerHTML = `
                <td>${perfil.nombre}</td>
                <td>${perfil.rol}</td>
                <td><span class="${claseEstado}">${perfil.estado}</span></td>
                <td>
                    <button class="btn-icon btn-editar" data-id="${perfil.id}"><i class="fa-solid fa-pen"></i></button>
                    <button class="btn-icon btn-delete btn-borrar" data-id="${perfil.id}"><i class="fa-solid fa-trash"></i></button>
                </td>
            `;
            tablaBody.appendChild(tr);
        });

        asignarEventosBotones();
    }

    function abrirModal(modo = "nuevo", idPerfil = null) {
        modal.style.display = "flex";
        if (modo === "nuevo") {
            modalTitulo.innerText = "Nuevo Perfil";
            formPerfil.reset();
            inputId.value = "";
        } else {
            modalTitulo.innerText = "Editar Perfil";
            const perfil = perfiles.find(p => p.id === idPerfil);
            if (perfil) {
                inputId.value = perfil.id;
                inputNombre.value = perfil.nombre;
                inputRol.value = perfil.rol;
                inputEstado.value = perfil.estado;
            }
        }
    }

    function cerrarModal() {
        modal.style.display = "none";
        formPerfil.reset();
    }

    formPerfil.addEventListener("submit", (e) => {
        e.preventDefault();

        const id = inputId.value;
        const nombre = inputNombre.value.trim();
        const rol = inputRol.value;
        const estado = inputEstado.value;

        if (id) {
    
            perfiles = perfiles.map(p => p.id === id ? { id, nombre, rol, estado } : p);
        } else {
            
            const nuevoPerfil = {
                id: Date.now().toString(), 
                nombre,
                rol,
                estado
            };
            perfiles.push(nuevoPerfil);
        }

       
        localStorage.setItem("kelmatica_perfiles", JSON.stringify(perfiles));
        renderizarTabla();
        cerrarModal();
    });

    
    function asignarEventosBotones() {
      
        document.querySelectorAll(".btn-editar").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                abrirModal("editar", id);
            });
        });

        document.querySelectorAll(".btn-borrar").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                const perfil = perfiles.find(p => p.id === id);
                
                if (confirm(`¿Estás seguro de que deseas eliminar el perfil de "${perfil.nombre}"?`)) {
                    perfiles = perfiles.filter(p => p.id !== id);
                    localStorage.setItem("kelmatica_perfiles", JSON.stringify(perfiles));
                    renderizarTabla();
                }
            });
        });
    }

    inputBuscar.addEventListener("input", (e) => {
        const busqueda = e.target.value.toLowerCase();
        const perfilesFiltrados = perfiles.filter(perfil => 
            perfil.nombre.toLowerCase().includes(busqueda) || 
            perfil.rol.toLowerCase().includes(busqueda)
        );
        renderizarTabla(perfilesFiltrados);
    });

    btnAbrirModal.addEventListener("click", () => abrirModal("nuevo"));
    btnCerrarModal.addEventListener("click", cerrarModal);
    btnCancelar.addEventListener("click", cerrarModal);

    renderizarTabla();
});

function borrarUsuario(index) {
    
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    if (confirm(`¿Estás segura de que deseas eliminar a ${usuarios[index].nombre}?`)) {
      
        usuarios.splice(index, 1);
        
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        renderizarTablaUsuarios(); 
    }
}

function prepararEditarUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios[index];

    document.getElementById('modal-usuario-titulo').innerText = "EDITAR CLIENTE";
 
    document.getElementById('user-index').value = index;

    document.getElementById('user-nombre').value = usuario.nombre;
    document.getElementById('user-apellido').value = usuario.apellido;
    document.getElementById('user-email').value = usuario.email;
    document.getElementById('user-celular').value = usuario.celular;
    document.getElementById('user-estado').value = usuario.estado;
    document.getElementById('user-direccion').value = usuario.direccion;

    abrirModalUsuario();
}

document.getElementById('form-usuario').addEventListener('submit', function(e) {
    e.preventDefault();

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    const indexValue = document.getElementById('user-index').value;

    const datosUsuario = {
        nombre: document.getElementById('user-nombre').value,
        apellido: document.getElementById('user-apellido').value,
        email: document.getElementById('user-email').value,
        celular: document.getElementById('user-celular').value,
        estado: document.getElementById('user-estado').value,
        direccion: document.getElementById('user-direccion').value
    };

    if (indexValue === "") {
        usuarios.push(datosUsuario);
    } else {
        usuarios[indexValue] = datosUsuario;
    }

    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    document.getElementById('form-usuario').reset();
    document.getElementById('user-index').value = "";
    
    document.getElementById('modal-usuario-titulo').innerText = "REGISTRAR NUEVO CLIENTE";

    cerrarModalUsuario();
    renderizarTablaUsuarios(); 
});