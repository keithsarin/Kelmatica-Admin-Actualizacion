document.addEventListener('DOMContentLoaded', () => {
    const botones = document.querySelectorAll('.sidebar-nav li');
    const secciones = document.querySelectorAll('.content-section');

    console.log("Botones encontrados:", botones.length);
    console.log("Secciones encontradas:", secciones.length);

    botones.forEach((btn, i) => {
        btn.onclick = () => {
            console.log("Diste clic al botón index:", i);
            
            // 1. Limpiar activos
            botones.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // 2. Cambiar visibilidad
            secciones.forEach(s => s.style.display = 'none');
            if(secciones[i]) {
                secciones[i].style.display = 'block';
            }
        };
    });
});
// Lógica del Buscador
const buscador = document.getElementById('user-search');
const filasTabla = document.querySelectorAll('.table-section tbody tr');

buscador.addEventListener('keyup', (e) => {
    const texto = e.target.value.toLowerCase();

    filasTabla.forEach(fila => {
        // Miramos el texto de la celda del nombre (columna 1) y el rol (columna 2)
        const contenidoFila = fila.textContent.toLowerCase();
        
        if (contenidoFila.includes(texto)) {
            fila.style.display = ''; // Mostrar
        } else {
            fila.style.display = 'none'; // Ocultar
        }
    });
});
// Funciones para controlar el Modal de Revisión
function verFichaObra() {
    const modal = document.getElementById('modal-revision');
    // Esto es para que se muestre como un flex container
    modal.style.display = 'flex'; 
    // Evita que el fondo se pueda scrollear
    document.body.style.overflow = 'hidden'; 
}

function cerrarModalRevision() {
    const modal = document.getElementById('modal-revision');
    modal.style.display = 'none';
    // Devuelve el scroll al body
    document.body.style.overflow = ''; 
}

// Lógica de los botones de acción (Aceptar/Rechazar)
function confirmarAprobacion(esAprobado) {
    if (esAprobado) {
        // En un caso real, aquí enviarías un email al artista
        alert("¡Obra Aprobada! Se ha notificado al artista y ya es visible en la galería.");
    } else {
        // En un caso real, aquí abrirías otro prompt para el motivo
        const motivo = prompt("Por favor, ingresa el motivo del rechazo para enviarlo al artista:");
        if (motivo) {
            alert("Obra Rechazada. Se ha enviado la notificación con el motivo: " + motivo);
        }
    }
    cerrarModalRevision();
}

// Cerrar el modal si haces clic por fuera (en la sombra)
window.addEventListener('click', (e) => {
    const modal = document.getElementById('modal-revision');
    if (e.target === modal) {
        cerrarModalRevision();
    }
});
// Configuración de Gráficas
document.addEventListener('DOMContentLoaded', () => {
    // 1. Gráfico de Ventas (Línea)
    const ctxVentas = document.getElementById('chartVentas').getContext('2d');
    new Chart(ctxVentas, {
        type: 'line',
        data: {
            labels: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun'],
            datasets: [{
                label: 'Ventas 2026',
                data: [1200000, 1900000, 3000000, 2500000, 4200000, 5000000],
                borderColor: '#c5a059', // Dorado Kelmática
                backgroundColor: 'rgba(197, 160, 89, 0.1)',
                borderWidth: 3,
                fill: true,
                tension: 0.4 // Hace la línea curva y elegante
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true, grid: { color: '#222' } },
                x: { grid: { display: false } }
            }
        }
    });

    // 2. Gráfico de Obras (Barras)
    const ctxObras = document.getElementById('chartObras').getContext('2d');
    new Chart(ctxObras, {
        type: 'bar',
        data: {
            labels: ['Óleos', 'Digital', 'Esculturas'],
            datasets: [{
                label: 'Visitas',
                data: [450, 890, 200],
                backgroundColor: ['#c5a059', '#e0e0e0', '#444']
            }]
        }
    });
});