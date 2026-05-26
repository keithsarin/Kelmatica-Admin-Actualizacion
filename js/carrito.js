
let usuarioLogueado = JSON.parse(localStorage.getItem('kelmatica_logged_in')) || false;
let carrito = JSON.parse(localStorage.getItem('kelmatica_cart')) || [];


document.addEventListener('DOMContentLoaded', () => {
    actualizarInterfazVisual();
    actualizarBadgesPopularidad();
});

document.addEventListener('click', (e) => {

    if (e.target && (e.target.id === 'btn-adquirir-detalle' || e.target.classList.contains('btn-add-to-cart'))) {
        e.preventDefault();
        const boton = e.target;
        const item = {
            id:     boton.getAttribute('data-id')    || 'obra_pirata_001',
            titulo: boton.getAttribute('data-titulo') || 'El Pirata',
            precio: parseFloat(boton.getAttribute('data-precio')) || 3000000,
            img:    boton.getAttribute('data-img')   || 'img/pintura 1.jpg'
        };

        agregarAlCarrito(item);
    }

    if (e.target && (
        e.target.id === 'open-cart-btn' ||
        e.target.closest('#open-cart-btn') ||
        e.target.id === 'cart-icon-trigger' ||
        e.target.closest('#cart-icon-trigger')
    )) {
        e.preventDefault();
        actualizarInterfazVisual();
        abrirLaVentanaDelCarrito();
    }

    if (e.target && (e.target.id === 'checkout-btn' || e.target.id === 'btn-proceder-pago')) {
        e.preventDefault();

        if (carrito.length === 0) {
            alert("Tu carrito está vacío. Selecciona una obra de arte para continuar.");
            return;
        }

        const sesionActiva = localStorage.getItem('sesionKelmatica') === 'activa' 
                  || JSON.parse(localStorage.getItem('kelmatica_logged_in')) === true;

            if (!sesionActiva) {
            alert("Para proceder con la adquisición de la obra, por favor inicia sesión.");
            window.location.href = 'index.html#abrir-login';
        } else {
            window.location.href = 'compra.html';
        }
    }

    if (e.target && (e.target.id === 'close-cart-btn' || e.target.closest('#close-cart-btn'))) {
        e.preventDefault();
        const cartSidebar = document.getElementById('cart-sidebar');
        if (cartSidebar) {
            cartSidebar.classList.remove('active');
        }
    }

}); 

function agregarAlCarrito(producto) {
    const existe = carrito.some(item => item.id === producto.id);

    if (existe) {
        actualizarInterfazVisual();
        abrirLaVentanaDelCarrito();
        return;
    }

    carrito.push(producto);
    const clave = `popularidad_${producto.id}`;
    const conteo = parseInt(localStorage.getItem(clave) || '0') + 1;
    localStorage.setItem(clave, conteo);
    actualizarBadgesPopularidad();
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
    if (cartSidebar) {
        cartSidebar.classList.add('active');
    }
}

function actualizarInterfazVisual() {
    const contenedor  = document.getElementById('cart-items-container') || document.getElementById('carrito-items-container');
    const txtSubtotal = document.getElementById('cart-sidebar-subtotal') || document.getElementById('cart-subtotal-val');
    const contadorMenu = document.getElementById('cart-counter') || document.getElementById('cart-count') || document.querySelector('.badge');
    if (contadorMenu) {
        contadorMenu.textContent = carrito.length;
    }
    if (!contenedor) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <p class="empty-cart-msg" style="text-align: center; padding: 40px 20px; color: #777; font-style: italic; font-family: 'Roboto', sans-serif;">
                Tu carrito está vacío.
            </p>
        `;
        if (txtSubtotal) txtSubtotal.textContent = "$0 COP";
        return;
    }

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
            <div style="flex-grow: 1; font-family: 'Roboto', sans-serif; text-align: left;">
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
function actualizarBadgesPopularidad() {
    document.querySelectorAll('.k-badge-popularidad').forEach(badge => {
        const id = badge.id.replace('popularidad-', '');
        const clave = `popularidad_${id}`;
        const conteo = parseInt(localStorage.getItem(clave) || '0');
        const span = badge.querySelector('.k-contador-deseos');
        if (span) span.textContent = conteo;
    });
}