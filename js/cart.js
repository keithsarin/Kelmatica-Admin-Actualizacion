// ========================================================
// KELMÁTICA - SCRIPT DE CARRITO UNIFICADO Y PERSISTENTE
// ========================================================

let usuarioLogueado = JSON.parse(localStorage.getItem('kelmatica_logged_in')) || false;
let carrito = JSON.parse(localStorage.getItem('kelmatica_cart')) || [];

// === MANEJADOR GLOBAL DE CLICS (Delegación de Eventos) ===
document.addEventListener('click', (e) => {
    
    // 1. CAPTURAR CLIC EN "AGREGAR AL CARRITO"
    if (e.target && (e.target.id === 'btn-adquirir-detalle' || e.target.classList.contains('btn-add-to-cart'))) {
        e.preventDefault();
        const boton = e.target;
        
        const item = {
            id: boton.getAttribute('data-id') || 'obra_001',
            titulo: boton.getAttribute('data-titulo') || 'Obra de Arte',
            precio: parseFloat(boton.getAttribute('data-precio')) || 0,
            img: boton.getAttribute('data-img') || 'img/pintura 1.jpg'
        };
        
        agregarAlCarrito(item);

        // Feedback de botón blanco a dorado
        if (boton.id === 'btn-adquirir-detalle') {
            const textoOriginal = boton.innerText;
            boton.innerText = "¡AÑADIDO! ✓";
            boton.style.backgroundColor = "#bfa030"; 
            boton.style.color = "#fff";
            boton.style.borderColor = "#bfa030";

            setTimeout(() => {
                boton.innerText = textoOriginal;
                boton.style.backgroundColor = "#ffffff"; 
                boton.style.color = "#000000";
                boton.style.borderColor = "#ffffff";
            }, 1500);
        }
    }

    // 2. CAPTURAR CLIC EN EL ICONO DE LA BOLSA EN EL HEADER
    if (e.target && (e.target.id === 'open-cart-btn' || e.target.closest('#open-cart-btn'))) {
        e.preventDefault();
        actualizarInterfazVisual();
        abrirLaVentanaDelCarrito();
    }

    // 3. CAPTURAR CLIC EN EL BOTÓN "PROCEDER AL PAGO"
    if (e.target && (e.target.classList.contains('btn-checkout') || e.target.id === 'btn-proceder-pago')) {
        e.preventDefault();
        if (carrito.length === 0) {
            alert("Tu carrito está vacío. Selecciona una obra de arte para continuar.");
            return;
        }

        if (!usuarioLogueado) {
            alert("Para proceder con la adquisición de la obra, por favor inicia sesión.");
            window.location.href = 'login.html'; 
        } else {
            window.location.href = 'checkout.html'; 
        }
    }
    
    // 4. CAPTURAR CLIC EN LA "X" O EN EL OVERLAY PARA CERRAR
    // SOLUCIÓN: Ahora escucha tanto 'close-cart' como 'close-cart-btn' y estructuras internas
    if (e.target && (
        e.target.id === 'close-cart' || 
        e.target.classList.contains('close-cart-btn') || 
        e.target.closest('#close-cart') || 
        e.target.id === 'cart-overlay'
    )) {
        e.preventDefault();
        cerrarLaVentanaDelCarrito();
    }
});

// Sincronizar el estado de la UI al cargar cualquier página
document.addEventListener('DOMContentLoaded', () => {
    actualizarInterfazVisual();
});

// === FUNCIONES DE LÓGICA Y ALMACENAMIENTO ===

function agregarAlCarrito(producto) {
    const existe = carrito.some(item => item.id === producto.id);

    if (existe) {
        abrirLaVentanaDelCarrito();
        return;
    }

    carrito.push(producto);
    localStorage.setItem('kelmatica_cart', JSON.stringify(carrito));
    
    actualizarInterfazVisual();
    abrirLaVentanaDelCarrito();
}

window.eliminarDelCarrito = function(id) {
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('kelmatica_cart', JSON.stringify(carrito));
    actualizarInterfazVisual();
};

function abrirLaVentanaDelCarrito() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartSidebar) cartSidebar.classList.add('open');    
    if (cartOverlay) cartOverlay.classList.add('active');  
    document.body.style.overflow = 'hidden';               
}

function cerrarLaVentanaDelCarrito() {
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');
    if (cartSidebar) cartSidebar.classList.remove('open');
    if (cartOverlay) cartOverlay.classList.remove('active');
    document.body.style.overflow = '';                     
}

// === RENDERIZADO VISUAL CON PARCHE PARA PÁGINAS SIN PANEL ===
function actualizarInterfazVisual() {
    const contenedor = document.getElementById('cart-items-container');
    const txtSubtotal = document.getElementById('cart-sidebar-subtotal');
    const contadorMenu = document.getElementById('cart-counter');

    // 1. EL CONTADOR SIEMPRE SE ACTUALIZA (No importa la página en la que estés)
    if (contadorMenu) {
        contadorMenu.textContent = carrito.length;
    }

    // 2. ESCUDO OPTIMIZADO: Si la página actual no tiene el panel lateral (como la galería o detalles),
    // nos salimos tranquilamente porque el contador ya fue actualizado arriba.
    if (!contenedor) return;

    // 3. Renderizar mensaje si no hay pinturas seleccionadas
    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <p class="empty-cart-msg">Tu carrito está vacío.</p>
        `;
        if (txtSubtotal) txtSubtotal.textContent = "$0 COP";
        return;
    }

    // Limpiar para renderizar el estado actual
    contenedor.innerHTML = '';
    let subtotalAcumulado = 0;

    carrito.forEach(item => {
        subtotalAcumulado += item.precio;

        const formatoPrecio = new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(item.precio).replace(/\u00a0/g, ' ');

        const filaObra = document.createElement('div');
        filaObra.className = 'cart-item'; 

        filaObra.innerHTML = `
            <img src="${item.img}" alt="${item.titulo}">
            <div class="cart-item-details">
                <h4>${item.titulo}</h4>
                <p>${formatoPrecio}</p>
            </div>
            <button class="btn-remove-item" onclick="eliminarDelCarrito('${item.id}')">
                &times;
            </button>
        `;
        contenedor.appendChild(filaObra);
    });

    const subtotalFormateado = new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(subtotalAcumulado).replace(/\u00a0/g, ' ');

    if (txtSubtotal) {
        txtSubtotal.textContent = subtotalFormateado;
    }
}