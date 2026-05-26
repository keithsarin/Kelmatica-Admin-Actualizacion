
let usuarioLogueado = JSON.parse(localStorage.getItem('kelmatica_logged_in')) || false;
let carrito = JSON.parse(localStorage.getItem('kelmatica_cart')) || [];
document.addEventListener('click', (e) => {
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

    if (e.target && (e.target.id === 'open-cart-btn' || e.target.closest('#open-cart-btn'))) {
        e.preventDefault();
        actualizarInterfazVisual();
        abrirLaVentanaDelCarrito();
    }

    if (e.target && (e.target.classList.contains('btn-checkout') || e.target.id === 'btn-proceder-pago')) {
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

document.addEventListener('DOMContentLoaded', () => {
    actualizarInterfazVisual();
});

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

function actualizarInterfazVisual() {
    const contenedor = document.getElementById('cart-items-container');
    const txtSubtotal = document.getElementById('cart-sidebar-subtotal');
    const contadorMenu = document.getElementById('cart-counter');

    if (contadorMenu) {
        contadorMenu.textContent = carrito.length;
    }

    if (!contenedor) return;

    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <p class="empty-cart-msg">Tu carrito está vacío.</p>
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