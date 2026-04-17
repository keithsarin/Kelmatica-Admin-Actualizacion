document.addEventListener('DOMContentLoaded', () => {
    // --- 1. LÓGICA DEL MENÚ (SIDEBAR) ---
    const botones = document.querySelectorAll('.sidebar-nav li');
    const secciones = document.querySelectorAll('.content-section');

    botones.forEach((btn) => {
        btn.addEventListener('click', () => {
            // Quitar clase active
            botones.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Ocultar todas las secciones
            secciones.forEach(s => s.style.display = 'none');

            // Mostrar la sección basada en el data-section
            const sectionName = btn.getAttribute('data-section');
            const targetSection = document.getElementById('section-' + sectionName);
            
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });

    // --- 2. LÓGICA DEL BUSCADOR DE USUARIOS ---
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

    // --- 3. GRÁFICO DE VENTAS ---
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

    // --- 4. GRÁFICO DE OBRAS ---
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

// --- 5. FUNCIONES GLOBALES (MODAL) ---
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

// Cerrar al hacer clic fuera del modal
window.onclick = function(event) {
    const modal = document.getElementById('modal-revision');
    if (event.target == modal) {
        cerrarModalRevision();
    }
}
document.addEventListener('DOMContentLoaded', () => {
    // --- 1. LÓGICA DEL MENÚ (SIDEBAR) ---
    const botones = document.querySelectorAll('.sidebar-nav li');
    const secciones = document.querySelectorAll('.content-section');

    botones.forEach((btn) => {
        btn.addEventListener('click', () => {
            // Quitar clase active
            botones.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Ocultar todas las secciones
            secciones.forEach(s => s.style.display = 'none');

            // Mostrar la sección basada en el data-section
            const sectionName = btn.getAttribute('data-section');
            const targetSection = document.getElementById('section-' + sectionName);
            
            if (targetSection) {
                targetSection.style.display = 'block';
            }
        });
    });

    // --- 2. LÓGICA DEL BUSCADOR DE USUARIOS ---
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

    // --- 3. GRÁFICO DE VENTAS ---
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

    // --- 4. GRÁFICO DE OBRAS ---
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

// --- 5. FUNCIONES GLOBALES (MODAL) ---
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

// Cerrar al hacer clic fuera del modal
window.onclick = function(event) {
    const modal = document.getElementById('modal-revision');
    if (event.target == modal) {
        cerrarModalRevision();
    }
}