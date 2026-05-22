// ========================================================
// KELMÁTICA - SCRIPT DE CARRITO INTEGRADO CORREGIDO
// ========================================================

let usuarioLogueado = JSON.parse(localStorage.getItem('kelmatica_logged_in')) || false;
let carrito = JSON.parse(localStorage.getItem('kelmatica_cart')) || [];

// Manejador global de clics (Delegación de Eventos) para evitar fallas de carga
document.addEventListener('click', (e) => {
    
    // 1. CAPTURAR EL CLIC EN "AGREGAR AL CARRITO"
    if (e.target && (e.target.id === 'btn-adquirir-detalle' || e.target.classList.contains('btn-add-to-cart'))) {
        e.preventDefault();
        const boton = e.target;
        
        const item = {
            id: boton.getAttribute('data-id') || 'obra_pirata_001',
            titulo: boton.getAttribute('data-titulo') || 'El Pirata',
            precio: parseFloat(boton.getAttribute('data-precio')) || 3000000,
            img: boton.getAttribute('data-img') || 'img/pintura 1.jpg'
        };
        
        agregarAlCarrito(item);
    }

    // 2. CAPTURAR EL CLIC EN EL ICONO DE LA BOLSA DEL HEADER (DESDE LA GALERÍA O DETALLES)
    if (e.target && (e.target.id === 'open-cart-btn' || e.target.closest('#open-cart-btn') || e.target.id === 'cart-icon-trigger' || e.target.closest('#cart-icon-trigger'))) {
        e.preventDefault();
        // Forzamos el renderizado de los datos antes de mostrar la barra
        actualizarInterfazVisual();
        abrirLaVentanaDelCarrito();
    }

    // 3. CAPTURAR EL CLIC EN EL BOTÓN DORADO "PROCEDER AL PAGO"
    if (e.target && (e.target.id === 'btn-proceder-pago')) {
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
});

// Sincronizar el estado de la interfaz apenas cargue el documento por primera vez
document.addEventListener('DOMContentLoaded', () => {
    actualizarInterfazVisual();
});

function agregarAlCarrito(producto) {
    const existe = carrito.some(item => item.id === producto.id);

    // Si ya existe la obra, no mandamos alert; solo actualizamos y abrimos la ventana
    if (existe) {
        actualizarInterfazVisual();
        abrirLaVentanaDelCarrito();
        return;
    }

    // Insertar la obra de arte al almacenamiento local
    carrito.push(producto);
    localStorage.setItem('kelmatica_cart', JSON.stringify(carrito));
    
    // Renderizar e inmediatamente abrir la ventana de forma fluida
    actualizarInterfazVisual();
    abrirLaVentanaDelCarrito();
}

function eliminarDelCarrito(id) {
    carrito = carrito.filter(item => item.id !== id);
    localStorage.setItem('kelmatica_cart', JSON.stringify(carrito));
    actualizarInterfazVisual();
}

function abrirLaVentanaDelCarrito() {
    const cartSidebar = document.getElementById('cart-sidebar');
    if (cartSidebar) {
        cartSidebar.classList.add('active');
    }
}

// FUNCIÓN PRINCIPAL: Pinta la obra dentro de tu caja negra y actualiza los indicadores
function actualizarInterfazVisual() {
    const contenedor = document.getElementById('carrito-items-container');
    const txtSubtotal = document.getElementById('cart-subtotal-val');
    
    // Buscamos dinámicamente cualquier indicador de contador que tenga tu interfaz
    const contadorMenu = document.getElementById('cart-counter') || document.getElementById('cart-count') || document.querySelector('.badge');

    // Actualizar el número del contador sobre la bolsa del header si existe
    if (contadorMenu) {
        contadorMenu.textContent = carrito.length;
    }

    if (!contenedor) return;

    // Si está vacío, muestra el mensaje por defecto
    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <p class="empty-cart-msg" style="text-align: center; padding: 40px 20px; color: #777; font-style: italic;">
                Tu carrito está vacío.
            </p>
        `;
        if (txtSubtotal) txtSubtotal.textContent = "$0 COP";
        return;
    }

    // Limpiar contenedor para meter las obras actuales
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
        filaObra.style.cssText = `
            display: flex;
            align-items: center;
            gap: 15px;
            padding: 15px 0;
            border-bottom: 1px solid #1a1a1a;
        `;

        filaObra.innerHTML = `
            <div style="width: 65px; height: 65px; background-color: #111; border: 1px solid #222; padding: 2px; flex-shrink: 0;">
                <img src="${item.img}" alt="${item.titulo}" style="width: 100%; height: 100%; object-fit: cover;">
            </div>
            
            <div style="flex-grow: 1; font-family: 'Roboto', sans-serif;">
                <h4 style="color: #ffffff; margin: 0 0 4px 0; font-size: 0.85rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.5px;">${item.titulo}</h4>
                <p style="color: #e4be6b; margin: 0; font-size: 0.9rem; font-weight: bold;">${formatoPrecio}</p>
            </div>
            
            <button onclick="eliminarDelCarrito('${item.id}')" style="background: none; border: none; color: #555; cursor: pointer; font-size: 1.2rem; transition: color 0.2s;" onmouseover="this.style.color='#ff4444'" onmouseout="this.style.color='#555'">
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