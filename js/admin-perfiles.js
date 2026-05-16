document.addEventListener("DOMContentLoaded", () => {
    // 1. Datos iniciales quemados por si el localStorage está vacío
    const perfilesPredeterminados = [
        { id: "1", nombre: "Juan Pérez", rol: "Artista", estado: "Activo" },
        { id: "2", nombre: "María Paulina", rol: "Cliente", estado: "Activo" },
        { id: "3", nombre: "Kelly Galván", rol: "Administrador", estado: "Activo" }
    ];

    // Cargar datos de localStorage o usar los predeterminados
    let perfiles = JSON.parse(localStorage.getItem("kelmatica_perfiles"));
    if (!perfiles) {
        perfiles = perfilesPredeterminados;
        localStorage.setItem("kelmatica_perfiles", JSON.stringify(perfiles));
    }

    // 2. Elementos del DOM
    const tablaBody = document.getElementById("lista-usuarios-body");
    const modal = document.getElementById("modal-perfil");
    const formPerfil = document.getElementById("form-perfil");
    const modalTitulo = document.getElementById("modal-titulo");
    
    // Inputs del formulario
    const inputId = document.getElementById("perfil-id");
    const inputNombre = document.getElementById("perfil-nombre");
    const inputRol = document.getElementById("perfil-rol");
    const inputEstado = document.getElementById("perfil-estado");
    const inputBuscar = document.getElementById("user-search");

    // Botones de control del modal
    const btnAbrirModal = document.getElementById("btn-abrir-modal");
    const btnCerrarModal = document.getElementById("btn-cerrar-modal");
    const btnCancelar = document.getElementById("btn-cancelar");

    // 3. Función para renderizar (dibujar) la tabla en pantalla
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

    // 4. Funciones del Modal (Abrir / Cerrar)
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

    // 5. Guardar o Actualizar Perfil
    formPerfil.addEventListener("submit", (e) => {
        e.preventDefault();

        const id = inputId.value;
        const nombre = inputNombre.value.trim();
        const rol = inputRol.value;
        const estado = inputEstado.value;

        if (id) {
            // Modo: EDITAR / ACTUALIZAR
            perfiles = perfiles.map(p => p.id === id ? { id, nombre, rol, estado } : p);
        } else {
            // Modo: CREAR / AGREGAR NUEVO
            const nuevoPerfil = {
                id: Date.now().toString(), // Genera un ID único basado en el tiempo
                nombre,
                rol,
                estado
            };
            perfiles.push(nuevoPerfil);
        }

        // Guardar cambios en LocalStorage y refrescar vista
        localStorage.setItem("kelmatica_perfiles", JSON.stringify(perfiles));
        renderizarTabla();
        cerrarModal();
    });

    // 6. Asignar acciones dinámicas a los botones de Editar y Borrar
    function asignarEventosBotones() {
        // Botones Editar
        document.querySelectorAll(".btn-editar").forEach(btn => {
            btn.addEventListener("click", () => {
                const id = btn.getAttribute("data-id");
                abrirModal("editar", id);
            });
        });

        // Botones Borrar
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

    // 7. Buscador en tiempo real
    inputBuscar.addEventListener("input", (e) => {
        const busqueda = e.target.value.toLowerCase();
        const perfilesFiltrados = perfiles.filter(perfil => 
            perfil.nombre.toLowerCase().includes(busqueda) || 
            perfil.rol.toLowerCase().includes(busqueda)
        );
        renderizarTabla(perfilesFiltrados);
    });

    // Eventos de los clics para el modal
    btnAbrirModal.addEventListener("click", () => abrirModal("nuevo"));
    btnCerrarModal.addEventListener("click", cerrarModal);
    btnCancelar.addEventListener("click", cerrarModal);

    // Inicializar la tabla al cargar la página
    renderizarTabla();
});
// ==========================================================================
// 1. FUNCIÓN PARA ELIMINAR UN CLIENTE
// ==========================================================================
function borrarUsuario(index) {
    // Traemos la lista actualizada desde localStorage
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Una alerta elegante nativa para confirmar la acción
    if (confirm(`¿Estás segura de que deseas eliminar a ${usuarios[index].nombre}?`)) {
        // Removemos el usuario del array usando su posición
        usuarios.splice(index, 1);
        
        // Guardamos la nueva lista en localStorage
        localStorage.setItem('usuarios', JSON.stringify(usuarios));
        
        // Volvemos a pintar la tabla para que desaparezca visualmente
        renderizarTablaUsuarios(); 
    }
}

// ==========================================================================
// 2. FUNCIÓN PARA PREPARAR EL MODAL PARA EDICIÓN (CARGAR DATOS)
// ==========================================================================
function prepararEditarUsuario(index) {
    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    const usuario = usuarios[index];

    // Cambiamos el título del modal para que la interfaz sea clara
    document.getElementById('modal-usuario-titulo').innerText = "EDITAR CLIENTE";
    
    // CAMPOS DE CONTROL: Guardamos el índice en el input hidden que tienes en tu HTML
    // Esto es vital para que el formulario sepa si está guardando uno NUEVO o ACTUALIZANDO uno viejo
    document.getElementById('user-index').value = index;

    // Rellenamos los campos del formulario con los datos existentes
    document.getElementById('user-nombre').value = usuario.nombre;
    document.getElementById('user-apellido').value = usuario.apellido;
    document.getElementById('user-email').value = usuario.email;
    document.getElementById('user-celular').value = usuario.celular;
    document.getElementById('user-estado').value = usuario.estado;
    document.getElementById('user-direccion').value = usuario.direccion;

    // Abrimos el modal de manera hermosa
    abrirModalUsuario();
}

// ==========================================================================
// 3. FUNCIÓN DE GUARDADO UNIFICADO (PROCESAR EL FORMULARIO)
// ==========================================================================
// Reemplaza o adapta tu lógica de "Guardar" actual para que maneje ambos casos:
document.getElementById('form-usuario').addEventListener('submit', function(e) {
    e.preventDefault();

    let usuarios = JSON.parse(localStorage.getItem('usuarios')) || [];
    
    // Capturamos el valor del input oculto
    const indexValue = document.getElementById('user-index').value;

    // Creamos el objeto con los datos del formulario
    const datosUsuario = {
        nombre: document.getElementById('user-nombre').value,
        apellido: document.getElementById('user-apellido').value,
        email: document.getElementById('user-email').value,
        celular: document.getElementById('user-celular').value,
        estado: document.getElementById('user-estado').value,
        direccion: document.getElementById('user-direccion').value
    };

    if (indexValue === "") {
        // CASO A: Si el input oculto está vacío, significa que es un CLIENTE NUEVO
        usuarios.push(datosUsuario);
    } else {
        // CASO B: Si tiene un número, estamos ACTUALIZANDO un cliente existente
        usuarios[indexValue] = datosUsuario;
    }

    // Guardamos la lista final en LocalStorage
    localStorage.setItem('usuarios', JSON.stringify(usuarios));

    // Reseteamos el formulario por completo (incluyendo el input oculto)
    document.getElementById('form-usuario').reset();
    document.getElementById('user-index').value = "";
    
    // Restauramos el título original del modal
    document.getElementById('modal-usuario-titulo').innerText = "REGISTRAR NUEVO CLIENTE";

    // Cerramos el modal y actualizamos la tabla
    cerrarModalUsuario();
    renderizarTablaUsuarios(); // Tu función encargada de pintar los datos en el HTML
});