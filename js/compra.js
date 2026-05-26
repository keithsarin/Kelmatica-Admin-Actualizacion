const CLAVE_CARRITO = 'kelmatica_cart';
const COSTOS_ENVIO = {
    estandar: 15000,
    rapido:   30000
};

let carritoActual = [];
let costoEnvioSeleccionado = COSTOS_ENVIO.estandar;

document.addEventListener('DOMContentLoaded', () => {
    cargarCarritoDesdeStorage();
    renderizarItemsResumen();
    calcularYMostrarTotales();
    inicializarEventosEnvio();
    inicializarEventosPago();
    inicializarCupon();
});

function cargarCarritoDesdeStorage() {
    const datos = localStorage.getItem(CLAVE_CARRITO);
    carritoActual = datos ? JSON.parse(datos) : [];

    if (carritoActual.length === 0) {
        const contenedor = document.getElementById('items-resumen-compra');
        if (contenedor) {
            contenedor.innerHTML = `
                <p style="
                    text-align: center;
                    padding: 30px 10px;
                    color: #9ca3af;
                    font-style: italic;
                    font-size: 0.85rem;
                ">Tu carrito está vacío.</p>
            `;
        }
    }
}

function renderizarItemsResumen() {
    const contenedor = document.getElementById('items-resumen-compra');
    if (!contenedor) return;

    if (carritoActual.length === 0) return;

    contenedor.innerHTML = '';

    carritoActual.forEach(item => {
        const precioFormateado = formatearPrecioCOP(item.precio);

        const div = document.createElement('div');
        div.className = 'item-resumen';
        div.innerHTML = `
            <img 
                src="${item.img}" 
                alt="${item.titulo}"
                onerror="this.style.background='#1a1a1a'; this.src='';"
            >
            <div class="detalles-item">
                <h3>${item.titulo}</h3>
                <p>Obra original · 1 unidad</p>
            </div>
            <span class="precio-item">${precioFormateado}</span>
        `;
        contenedor.appendChild(div);
    });
}

function calcularYMostrarTotales() {
    const subtotal = carritoActual.reduce((acc, item) => acc + item.precio, 0);
    const total    = subtotal + costoEnvioSeleccionado;

    const elSubtotal = document.getElementById('resumen-subtotal');
    const elEnvio    = document.getElementById('resumen-envio');
    const elTotal    = document.getElementById('resumen-total');

    if (elSubtotal) elSubtotal.textContent = formatearPrecioCOP(subtotal);
    if (elEnvio)    elEnvio.textContent    = formatearPrecioCOP(costoEnvioSeleccionado);
    if (elTotal)    elTotal.textContent    = formatearPrecioCOP(total);
}

function inicializarEventosEnvio() {
    const radios = document.querySelectorAll('input[name="metodo-envio"]');
    const labels = document.querySelectorAll('.radio-envio');

    radios.forEach(radio => {
        radio.addEventListener('change', () => {
            labels.forEach(l => l.classList.remove('activo'));
            const labelActivo = radio.closest('.radio-envio');
            if (labelActivo) labelActivo.classList.add('activo');

            costoEnvioSeleccionado = COSTOS_ENVIO[radio.value] || COSTOS_ENVIO.estandar;
            calcularYMostrarTotales();
        });
    });
}

function inicializarEventosPago() {
    const botonesPestana = document.querySelectorAll('.boton-pestana');

    botonesPestana.forEach(boton => {
        boton.addEventListener('click', () => {
            const objetivo = boton.getAttribute('data-objetivo');
            if (!objetivo) return;

            botonesPestana.forEach(b => b.classList.remove('activo'));
            document.querySelectorAll('.contenido-pestana-pago').forEach(c => c.classList.remove('activo'));

            boton.classList.add('activo');
            const contenidoObjetivo = document.getElementById(objetivo);
            if (contenidoObjetivo) contenidoObjetivo.classList.add('activo');
        });
    });
}

function inicializarCupon() {
    const botonCupon = document.getElementById('boton-aplicar-cupon');
    const inputCupon = document.getElementById('codigo-cupon');

    if (!botonCupon || !inputCupon) return;

    botonCupon.addEventListener('click', () => {
        const codigo = inputCupon.value.trim().toUpperCase();

        const cupones = {
            'KELMATICA10': 0.10,
            'ARTE15':      0.15,
            'BIENVENIDO':  0.05,
        };
        if (cupones[codigo]) {
            const descuento = cupones[codigo];
            aplicarDescuento(descuento, codigo);
        } else {
            mostrarFeedbackCupon('Código no válido o ya utilizado.', false);
        }
    });
}

let descuentoAplicado = 0;
function aplicarDescuento(porcentaje, codigo) {
    descuentoAplicado = porcentaje;
    const subtotal  = carritoActual.reduce((acc, item) => acc + item.precio, 0);
    const descuento = subtotal * porcentaje;
    const total     = subtotal - descuento + costoEnvioSeleccionado;

    const totalesEl = document.querySelector('.totales-resumen');
    let filaDescuento = document.getElementById('fila-descuento');
    if (!filaDescuento && totalesEl) {
        filaDescuento = document.createElement('div');
        filaDescuento.id = 'fila-descuento';
        filaDescuento.className = 'fila-total';
        filaDescuento.innerHTML = `
            <span>Descuento (${Math.round(porcentaje * 100)}%)</span>
            <span id="valor-descuento" style="color: #4ade80;">-${formatearPrecioCOP(descuento)}</span>
        `;
  
        const divisorSec = totalesEl.querySelector('.divisor-secundario');
        if (divisorSec) {
            totalesEl.insertBefore(filaDescuento, divisorSec);
        } else {
            totalesEl.appendChild(filaDescuento);
        }
    } else if (filaDescuento) {
        filaDescuento.querySelector('span:first-child').textContent = `Descuento (${Math.round(porcentaje * 100)}%)`;
        document.getElementById('valor-descuento').textContent = `-${formatearPrecioCOP(descuento)}`;
    }

    const elTotal = document.getElementById('resumen-total');
    if (elTotal) elTotal.textContent = formatearPrecioCOP(total);

    mostrarFeedbackCupon(`✓ Cupón "${codigo}" aplicado — ${Math.round(porcentaje * 100)}% de descuento`, true);
    const inputCupon = document.getElementById('codigo-cupon');
    const botonCupon = document.getElementById('boton-aplicar-cupon');
    if (inputCupon) inputCupon.disabled = true;
    if (botonCupon) botonCupon.disabled = true;
}

function mostrarFeedbackCupon(mensaje, exito) {
    let feedbackEl = document.getElementById('feedback-cupon');

    if (!feedbackEl) {
        feedbackEl = document.createElement('p');
        feedbackEl.id = 'feedback-cupon';
        feedbackEl.style.cssText = `
            font-size: 0.78rem;
            margin: -10px 0 12px 0;
            padding: 0;
        `;
        const envoltura = document.querySelector('.envoltura-cupon');
        if (envoltura) envoltura.insertAdjacentElement('afterend', feedbackEl);
    }

    feedbackEl.textContent = mensaje;
    feedbackEl.style.color = exito ? '#4ade80' : '#f87171';
}

document.addEventListener('DOMContentLoaded', () => {
    const botonFinalizar = document.getElementById('boton-finalizar-pedido');
    if (!botonFinalizar) return;

    botonFinalizar.addEventListener('click', () => {
        if (carritoActual.length === 0) {
            alert('Tu carrito está vacío. Selecciona una obra antes de continuar.');
            window.location.href = 'galeria.html';
            return;
        }

        const campos = [
            'compra-nombre', 'compra-correo', 'compra-telefono',
            'compra-direccion', 'compra-ciudad', 'compra-departamento'
        ];

        let todosCompletos = true;
        campos.forEach(id => {
            const el = document.getElementById(id);
            if (!el || !el.value.trim()) {
                todosCompletos = false;
                if (el) {
                    el.style.borderColor = '#f87171';
                    el.addEventListener('input', () => {
                        el.style.borderColor = '';
                    }, { once: true });
                }
            }
        });

        if (!todosCompletos) {
            alert('Por favor completa todos los campos de envío antes de continuar.');
            return;
        }

        alert('¡Pedido confirmado! Gracias por tu compra en Kelmática.');
        localStorage.removeItem(CLAVE_CARRITO);
    });
});

function formatearPrecioCOP(valor) {
    return new Intl.NumberFormat('es-CO', {
        style: 'currency',
        currency: 'COP',
        minimumFractionDigits: 0
    }).format(valor).replace(/\u00a0/g, ' ');
}