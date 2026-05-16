document.addEventListener('DOMContentLoaded', () => {
    // === ELEMENTOS INTERFACES DEL CARRITO ===
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartSidebar = document.getElementById('cart-sidebar');
    const cartOverlay = document.getElementById('cart-overlay');

    // === EVENTOS PARA ABRIR Y CERRAR ===

    // Abrir Carrito
    if (openCartBtn) {
        openCartBtn.addEventListener('click', () => {
            cartSidebar.classList.add('open');
            cartOverlay.classList.add('show');
            document.body.style.overflow = 'hidden'; // Evita scroll de fondo
        });
    }

    // Función Centralizada para Cerrar
    const closeCart = () => {
        cartSidebar.classList.remove('open');
        cartOverlay.classList.remove('show');
        document.body.style.overflow = ''; // Devuelve el scroll normal
    };

    // Cerrar al hacer clic en la equis (X)
    if (closeCartBtn) {
        closeCartBtn.addEventListener('click', closeCart);
    }

    // Cerrar al hacer clic en la capa oscura exterior
    if (cartOverlay) {
        cartOverlay.addEventListener('click', closeCart);
    }
});
// === 5. ESCUCHAR LOS CLICS EN LA GALERÍA ===
    document.addEventListener('click', (e) => {
        if (e.target && e.target.classList.contains('btn-add-to-cart')) {
            const btn = e.target;
            
            const productData = {
                id: btn.getAttribute('data-id'),
                titulo: btn.getAttribute('data-titulo'),
                precio: parseFloat(btn.getAttribute('data-precio')),
                img: btn.getAttribute('data-img')
            };

            addToCart(productData);

            // [NUEVO] Feedback visual premium si es el botón de la vista de detalle
            if (btn.id === 'btn-adquirir-detalle') {
                const textoOriginal = btn.innerText;
                btn.innerText = "¡AÑADIDO AL CARRITO! ✓";
                btn.style.backgroundColor = "#bfa030"; // Un tono dorado más oscuro de confirmación
                btn.style.color = "#fff";
                btn.disabled = true;

                // Regresa a su estado normal después de 2 segundos
                setTimeout(() => {
                    btn.innerText = textoOriginal;
                    btn.style.backgroundColor = ""; // Regresa al CSS original
                    btn.style.color = "";
                    btn.disabled = false;
                }, 2000);
            }
        }
    });
    // ========================================================
// KELMÁTICA - SCRIPT DE CARRITO INTEGRADO A TU INTERFAZ
// ========================================================

let usuarioLogueado = JSON.parse(localStorage.getItem('kelmatica_logged_in')) || false;
let carrito = JSON.parse(localStorage.getItem('kelmatica_cart')) || [];

document.addEventListener('DOMContentLoaded', () => {
    initCarritoEstructural();
});

function initCarritoEstructural() {
    // 1. Detectar el botón "ADQUIRIR PIEZA" de las páginas de detalle
    const btnAdquirir = document.getElementById('btn-adquirir-detalle');
    if (btnAdquirir) {
        btnAdquirir.addEventListener('click', (e) => {
            e.preventDefault();
            const item = {
                id: btnAdquirir.getAttribute('data-id'),
                titulo: btnAdquirir.getAttribute('data-titulo'),
                precio: parseFloat(btnAdquirir.getAttribute('data-precio')),
                img: btnAdquirir.getAttribute('data-img')
            };
            agregarAlCarrito(item);
        });
    }

    // 2. FUNCIÓN PEDIDA: Al darle clic al icono de la bolsa abre el carrito siempre
    const btnBolsaMenu = document.getElementById('open-cart-btn');
    if (btnBolsaMenu) {
        btnBolsaMenu.addEventListener('click', (e) => {
            e.preventDefault();
            abrirLaVentanaDelCarrito();
        });
    }

    // 3. Lógica del botón Dorado "PROCEDER AL PAGO"
    const btnPago = document.getElementById('btn-proceder-pago');
    if (btnPago) {
        btnPago.addEventListener('click', () => {
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
        });
    }

    // Dibujar el estado inicial y poner el contador del menú en su lugar al cargar
    actualizarInterfazVisual();
}

function agregarAlCarrito(producto) {
    const existe = carrito.some(item => item.id === producto.id);

    if (existe) {
        abrirLaVentanaDelCarrito();
        return;
    }

    // Insertar la obra de arte única
    carrito.push(producto);
    localStorage.setItem('kelmatica_cart', JSON.stringify(carrito));
    
    // Renderizar e inmediatamente abrir la ventana para dar feedback visual
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

// FUNCIÓN PRINCIPAL: Pinta la obra dentro de tu caja negra y actualiza el contador del menú
function actualizarInterfazVisual() {
    const contenedor = document.getElementById('carrito-items-container');
    const txtSubtotal = document.getElementById('cart-subtotal-val');
    const contadorMenu = document.getElementById('cart-counter');

    // Actualizar la burbuja del menú del header inmediatamente (el número sobre la bolsa)
    if (contadorMenu) {
        contadorMenu.textContent = carrito.length;
    }

    if (!contenedor) return;

    // Si está vacío, mantener tu texto original en cursiva y gris
    if (carrito.length === 0) {
        contenedor.innerHTML = `
            <div style="text-align: center; padding: 60px 20px; font-family: sans-serif; color: #777; font-style: italic;">
                Tu carrito está vacío.
            </div>
        `;
        if (txtSubtotal) txtSubtotal.textContent = "$0 COP";
        return;
    }

    // Limpiar para renderizar las obras activas
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