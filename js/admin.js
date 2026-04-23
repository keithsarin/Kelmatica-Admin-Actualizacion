document.addEventListener('DOMContentLoaded', () => {
<<<<<<< HEAD
  
=======
>>>>>>> 97354fc2cedd0feec997e692037aeae22c42ecab
    const botones = document.querySelectorAll('.sidebar-nav li');
    const secciones = document.querySelectorAll('.content-section');

    botones.forEach((btn) => {
        btn.addEventListener('click', () => {
<<<<<<< HEAD
          
            botones.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

         
            secciones.forEach(s => s.style.display = 'none');

          
=======
            botones.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            secciones.forEach(s => s.style.display = 'none');

>>>>>>> 97354fc2cedd0feec997e692037aeae22c42ecab
            const sectionName = btn.getAttribute('data-section');
            const targetSection = document.getElementById('section-' + sectionName);
            
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });

<<<<<<< HEAD
  
=======
    const buscador = document.getElementById('user-search');
    if (buscador) {
        buscador.addEventListener('keyup', (e) => {
            const texto = e.target.value.toLowerCase();
            const filasTabla = document.querySelectorAll('#lista-usuarios-body tr');

            filasTabla.forEach(fila => {
                const contenidoFila = fila.textContent.toLowerCase();
                fila.style.display = contenidoFila.includes(texto) ? '' : 'none';
            });
        });
    }
    const ctxVentas = document.getElementById('chartVentas');
    if (ctxVentas) {
        new Chart(ctxVentas.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                    label: 'Ventas 2026',
                    data: [1200000, 1500000, 1900000, 2500000, 3000000, 2800000, 2500000, 3200000, 4200000, 4500000, 4800000, 5000000],
                    borderColor: '#c5a059',
                    backgroundColor: 'rgba(197, 160, 89, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
    const ctxObras = document.getElementById('chartObras');
    if (ctxObras) {
        new Chart(ctxObras.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Óleo', 'Acrílico', 'Alto Relieve', 'Acuarela'],
                datasets: [{
                    label: 'Visualizaciones',
                    data: [450, 320, 600, 150],
                    backgroundColor: ['#c5a059', '#a6864a', '#e2c285', '#d4b477'],
                    borderRadius: 8
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
});

function verFichaObra(titulo, cliente, artista, descripcion, presupuesto, imagen) {
    const modal = document.getElementById('modal-revision');
    if (modal) {
        document.getElementById('modal-obra-titulo').innerText = titulo;
        document.getElementById('modal-cliente').innerText = cliente;
        document.getElementById('modal-obra-artista').innerText = artista;
        document.getElementById('modal-descripcion').innerText = descripcion;
        document.getElementById('modal-presupuesto').innerText = presupuesto;
        document.getElementById('modal-obra-img').src = imagen;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function cerrarModalRevision() {
    const modal = document.getElementById('modal-revision');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function enviarAlArtista(aprobado) {
    if (aprobado) {
        alert("Solicitud aprobada. Se ha enviado al panel del Artista.");
    } else {
        alert("Solicitud rechazada.");
    }
    cerrarModalRevision();
}

window.onclick = function(event) {
    const modal = document.getElementById('modal-revision');
    if (event.target == modal) {
        cerrarModalRevision();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.sidebar-nav li');
    const secciones = document.querySelectorAll('.content-section');

    botones.forEach((btn) => {
        btn.addEventListener('click', () => {
           
            botones.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            secciones.forEach(s => s.style.display = 'none');

            const sectionName = btn.getAttribute('data-section');
            const targetSection = document.getElementById('section-' + sectionName);
            
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });

>>>>>>> 97354fc2cedd0feec997e692037aeae22c42ecab
    const buscador = document.getElementById('user-search');
    if (buscador) {
        buscador.addEventListener('keyup', (e) => {
            const texto = e.target.value.toLowerCase();
            const filasTabla = document.querySelectorAll('#lista-usuarios-body tr');

            filasTabla.forEach(fila => {
                const contenidoFila = fila.textContent.toLowerCase();
                fila.style.display = contenidoFila.includes(texto) ? '' : 'none';
            });
        });
    }

<<<<<<< HEAD

=======
>>>>>>> 97354fc2cedd0feec997e692037aeae22c42ecab
    const ctxVentas = document.getElementById('chartVentas');
    if (ctxVentas) {
        new Chart(ctxVentas.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                    label: 'Ventas 2026',
                    data: [1200000, 1500000, 1900000, 2500000, 3000000, 2800000, 2500000, 3200000, 4200000, 4500000, 4800000, 5000000],
                    borderColor: '#c5a059',
                    backgroundColor: 'rgba(197, 160, 89, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

<<<<<<< HEAD
  
=======
>>>>>>> 97354fc2cedd0feec997e692037aeae22c42ecab
    const ctxObras = document.getElementById('chartObras');
    if (ctxObras) {
        new Chart(ctxObras.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Óleo', 'Acrílico', 'Alto Relieve', 'Acuarela'],
                datasets: [{
                    label: 'Visualizaciones',
                    data: [450, 320, 600, 150],
                    backgroundColor: ['#c5a059', '#a6864a', '#e2c285', '#d4b477'],
                    borderRadius: 8
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
});
<<<<<<< HEAD

=======
>>>>>>> 97354fc2cedd0feec997e692037aeae22c42ecab
function verFichaObra(titulo, cliente, artista, descripcion, presupuesto, imagen) {
    const modal = document.getElementById('modal-revision');
    if (modal) {
        document.getElementById('modal-obra-titulo').innerText = titulo;
        document.getElementById('modal-cliente').innerText = cliente;
        document.getElementById('modal-obra-artista').innerText = artista;
        document.getElementById('modal-descripcion').innerText = descripcion;
        document.getElementById('modal-presupuesto').innerText = presupuesto;
        document.getElementById('modal-obra-img').src = imagen;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function cerrarModalRevision() {
    const modal = document.getElementById('modal-revision');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function enviarAlArtista(aprobado) {
    if (aprobado) {
        alert("✅ Solicitud aprobada. Se ha enviado al panel del Artista.");
    } else {
        alert("❌ Solicitud rechazada.");
    }
    cerrarModalRevision();
}

window.onclick = function(event) {
    const modal = document.getElementById('modal-revision');
    if (event.target == modal) {
        cerrarModalRevision();
    }
}
<<<<<<< HEAD
document.addEventListener('DOMContentLoaded', () => {
  
    const botones = document.querySelectorAll('.sidebar-nav li');
    const secciones = document.querySelectorAll('.content-section');

    botones.forEach((btn) => {
        btn.addEventListener('click', () => {
          
            botones.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

    
            secciones.forEach(s => s.style.display = 'none');

          
            const sectionName = btn.getAttribute('data-section');
            const targetSection = document.getElementById('section-' + sectionName);
            
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });


    const buscador = document.getElementById('user-search');
    if (buscador) {
        buscador.addEventListener('keyup', (e) => {
            const texto = e.target.value.toLowerCase();
            const filasTabla = document.querySelectorAll('#lista-usuarios-body tr');

            filasTabla.forEach(fila => {
                const contenidoFila = fila.textContent.toLowerCase();
                fila.style.display = contenidoFila.includes(texto) ? '' : 'none';
            });
        });
    }

 
    const ctxVentas = document.getElementById('chartVentas');
    if (ctxVentas) {
        new Chart(ctxVentas.getContext('2d'), {
            type: 'line',
            data: {
                labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
                datasets: [{
                    label: 'Ventas 2026',
                    data: [1200000, 1500000, 1900000, 2500000, 3000000, 2800000, 2500000, 3200000, 4200000, 4500000, 4800000, 5000000],
                    borderColor: '#c5a059',
                    backgroundColor: 'rgba(197, 160, 89, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    fill: true
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }

  
    const ctxObras = document.getElementById('chartObras');
    if (ctxObras) {
        new Chart(ctxObras.getContext('2d'), {
            type: 'bar',
            data: {
                labels: ['Óleo', 'Acrílico', 'Alto Relieve', 'Acuarela'],
                datasets: [{
                    label: 'Visualizaciones',
                    data: [450, 320, 600, 150],
                    backgroundColor: ['#c5a059', '#a6864a', '#e2c285', '#d4b477'],
                    borderRadius: 8
                }]
            },
            options: { responsive: true, maintainAspectRatio: false }
        });
    }
});


function verFichaObra(titulo, cliente, artista, descripcion, presupuesto, imagen) {
    const modal = document.getElementById('modal-revision');
    if (modal) {
        document.getElementById('modal-obra-titulo').innerText = titulo;
        document.getElementById('modal-cliente').innerText = cliente;
        document.getElementById('modal-obra-artista').innerText = artista;
        document.getElementById('modal-descripcion').innerText = descripcion;
        document.getElementById('modal-presupuesto').innerText = presupuesto;
        document.getElementById('modal-obra-img').src = imagen;
        
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
    }
}

function cerrarModalRevision() {
    const modal = document.getElementById('modal-revision');
    if (modal) {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }
}

function enviarAlArtista(aprobado) {
    if (aprobado) {
        alert("✅ Solicitud aprobada. Se ha enviado al panel del Artista.");
    } else {
        alert("❌ Solicitud rechazada.");
    }
    cerrarModalRevision();
}

window.onclick = function(event) {
    const modal = document.getElementById('modal-revision');
    if (event.target == modal) {
        cerrarModalRevision();
    }
}
// Funciones para Gestión de Usuarios
function abrirModalUsuario() {
    document.getElementById('modal-usuario-titulo').innerText = "Agregar Nuevo Perfil";
    document.getElementById('form-usuario').reset();
    document.getElementById('modal-usuario').style.display = 'flex';
}

function cerrarModalUsuario() {
    document.getElementById('modal-usuario').style.display = 'none';
}

function editarUsuario(nombre, rol, estado) {
    document.getElementById('modal-usuario-titulo').innerText = "Editar Perfil";
    document.getElementById('user-nombre').value = nombre;
    document.getElementById('user-rol').value = rol;
    document.getElementById('user-estado').value = estado;
    document.getElementById('modal-usuario').style.display = 'flex';
}

function eliminarFila(boton) {
    if (confirm("¿Estás seguro de que deseas eliminar este perfil? Esta acción no se puede deshacer.")) {
        // Elimina la fila (tr) que contiene al botón
        const fila = boton.closest('tr');
        fila.remove();
    }
}

// Manejar el envío del formulario (Agregar a la tabla)
document.getElementById('form-usuario')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nombre = document.getElementById('user-nombre').value;
    const rol = document.getElementById('user-rol').value;
    const estado = document.getElementById('user-estado').value;
    const tabla = document.getElementById('lista-usuarios-body');

    // Aquí podrías diferenciar si es edición o nuevo, por ahora agregaremos uno nuevo:
    const nuevaFila = `
        <tr>
            <td>${nombre}</td>
            <td>${rol}</td>
            <td><span class="${estado === 'Activo' ? 'status-active' : 'status-inactive'}">${estado}</span></td>
            <td>
                <button class="btn-icon"><i class="fa-solid fa-eye"></i></button>
                <button class="btn-icon" onclick="editarUsuario('${nombre}', '${rol}', '${estado}')"><i class="fa-solid fa-pen"></i></button>
                <button class="btn-icon btn-delete" onclick="eliminarFila(this)"><i class="fa-solid fa-trash"></i></button>
            </td>
        </tr>
    `;

    tabla.innerHTML += nuevaFila;
    cerrarModalUsuario();
});
=======
>>>>>>> 97354fc2cedd0feec997e692037aeae22c42ecab
