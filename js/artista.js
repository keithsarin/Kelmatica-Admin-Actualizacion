document.addEventListener('DOMContentLoaded', () => {

    const menuLinks = document.querySelectorAll('.sidebar-menu li a');
    const secciones = document.querySelectorAll('.tab-content');
    menuLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').replace('#', '');

            document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
            link.closest('li').classList.add('active');

            secciones.forEach(s => {
                s.style.display = 'none';
                s.classList.remove('active');
            });

            const target = document.getElementById(targetId);
            if (target) {
                target.style.display = 'block';
                target.classList.add('active');
            }
        });
    });

    const dropArea   = document.getElementById('drop-area');
    const fileInput  = document.getElementById('file-selector');
    const previewBox = document.getElementById('image-preview');

    if (dropArea && fileInput) {
        dropArea.addEventListener('click', () => fileInput.click());

        dropArea.addEventListener('dragover', (e) => {
            e.preventDefault();
            dropArea.style.borderStyle = 'solid';
            dropArea.style.background  = 'rgba(197, 160, 89, 0.1)';
        });

        dropArea.addEventListener('dragleave', () => {
            dropArea.style.borderStyle = 'dashed';
            dropArea.style.background  = 'rgba(197, 160, 89, 0.02)';
        });

        dropArea.addEventListener('drop', (e) => {
            e.preventDefault();
            dropArea.style.borderStyle = 'dashed';
            dropArea.style.background  = 'rgba(197, 160, 89, 0.02)';
            const file = e.dataTransfer.files[0];
            if (file) mostrarPreview(file);
        });

        fileInput.addEventListener('change', () => {
            const file = fileInput.files[0];
            if (file) mostrarPreview(file);
        });
    }

    function mostrarPreview(file) {
        if (!file.type.startsWith('image/')) {
            alert('Solo se aceptan imágenes por ahora.');
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            previewBox.innerHTML = `
                <img src="${e.target.result}" alt="Preview" style="
                    width: 100%;
                    height: 350px;
                    object-fit: cover;
                    border-radius: 4px;
                    border: 1px solid #c5a059;
                ">
                <button type="button" id="btn-quitar-img" style="
                    margin-top: 10px;
                    background: transparent;
                    border: 1px solid #555;
                    color: #aaa;
                    padding: 6px 14px;
                    font-size: 0.75rem;
                    cursor: pointer;
                    width: 100%;
                    transition: 0.3s;
                ">✕ Quitar imagen</button>
            `;
            previewBox.style.display = 'block';
            dropArea.style.display   = 'none';
            document.getElementById('btn-quitar-img').addEventListener('click', () => {
                previewBox.style.display = 'none';
                previewBox.innerHTML     = '';
                dropArea.style.display   = 'flex';
                fileInput.value          = '';
            });
        };
        reader.readAsDataURL(file);
    }

    const btnActualizarImg = document.querySelector('.k-update-btn');
    if (btnActualizarImg) {
        const inputFotoPerfil = document.createElement('input');
        inputFotoPerfil.type          = 'file';
        inputFotoPerfil.accept        = 'image/*';
        inputFotoPerfil.style.display = 'none';
        document.body.appendChild(inputFotoPerfil);

        btnActualizarImg.addEventListener('click', () => inputFotoPerfil.click());

        inputFotoPerfil.addEventListener('change', () => {
            const file = inputFotoPerfil.files[0];
            if (!file) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                const base64 = e.target.result;
                const foto = document.querySelector('.k-artist-photo');
                if (foto) foto.src = base64;
                localStorage.setItem('kelmatica_foto_artista', base64);
            };
            reader.readAsDataURL(file);
        });
    }

    const fotoGuardada = localStorage.getItem('kelmatica_foto_artista');
    if (fotoGuardada) {
        const foto = document.querySelector('.k-artist-photo');
        if (foto) foto.src = fotoGuardada;
    }

    const filterBtns  = document.querySelectorAll('.k-filter-btn');
    const artworkCards = document.querySelectorAll('.k-artwork-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filtro = btn.getAttribute('data-filter');
            artworkCards.forEach(card => {
                card.style.display = (filtro === 'todas' || card.getAttribute('data-status') === filtro)
                    ? 'block' : 'none';
            });
        });
    });

    const formSubir = document.getElementById('form-subir-obra');
    if (formSubir) {
        formSubir.addEventListener('submit', (e) => {
            e.preventDefault();

            const titulo      = document.getElementById('nombre-obra').value.trim();
            const precio      = document.getElementById('precio').value.trim();
            const tecnica     = document.getElementById('tecnica').value;
            const materiales  = document.getElementById('materiales').value.trim();
            const anio        = document.getElementById('anio').value.trim();
            const tipo        = document.querySelector('input[name="tipo-obra"]:checked').value;
            const descripcion = document.getElementById('descripcion').value.trim();

            if (!titulo || !precio) {
                alert('Por favor completa al menos el título y el valor de la obra.');
                return;
            }

            const obras = JSON.parse(localStorage.getItem('kelmatica_obras_pendientes')) || [];
            obras.push({
                id: Date.now(), titulo, precio: parseFloat(precio),
                tecnica, materiales, anio, tipo, descripcion,
                estado: 'revision',
                fecha: new Date().toLocaleDateString('es-CO')
            });

            localStorage.setItem('kelmatica_obras_pendientes', JSON.stringify(obras));
            alert(`✅ La obra "${titulo}" fue enviada a revisión del administrador.`);
            formSubir.reset();

            if (previewBox) { previewBox.style.display = 'none'; previewBox.innerHTML = ''; }
            if (dropArea)   dropArea.style.display = 'flex';
            if (fileInput)  fileInput.value = '';
        });
    }

    const btnBorrador = document.querySelector('.btn-borrador');
    if (btnBorrador) {
        btnBorrador.addEventListener('click', () => {
            const titulo = document.getElementById('nombre-obra').value.trim();
            if (!titulo) { alert('Escribe al menos el título para guardar el borrador.'); return; }

            const borrador = {
                titulo,
                precio:      document.getElementById('precio').value,
                tecnica:     document.getElementById('tecnica').value,
                materiales:  document.getElementById('materiales').value,
                anio:        document.getElementById('anio').value,
                descripcion: document.getElementById('descripcion').value,
                fecha:       new Date().toLocaleDateString('es-CO')
            };

            localStorage.setItem('kelmatica_borrador', JSON.stringify(borrador));
            alert(`💾 Borrador de "${titulo}" guardado correctamente.`);
        });
    }

    const borrador = JSON.parse(localStorage.getItem('kelmatica_borrador'));
    if (borrador) {
        const restaurar = confirm(`Tienes un borrador guardado: "${borrador.titulo}". ¿Deseas restaurarlo?`);
        if (restaurar) {
            document.getElementById('nombre-obra').value  = borrador.titulo      || '';
            document.getElementById('precio').value       = borrador.precio      || '';
            document.getElementById('tecnica').value      = borrador.tecnica     || 'oleo';
            document.getElementById('materiales').value   = borrador.materiales  || '';
            document.getElementById('anio').value         = borrador.anio        || '';
            document.getElementById('descripcion').value  = borrador.descripcion || '';
        }
    }

    document.querySelectorAll('.k-action-icon').forEach(btn => {
        btn.addEventListener('click', () => {
            const card   = btn.closest('.k-artwork-card');
            const titulo = card ? card.querySelector('h3')?.textContent : 'esta obra';

            if (btn.classList.contains('k-delete')) {
                if (confirm(`¿Eliminar "${titulo}" de la galería?`)) {
                    card.style.opacity    = '0';
                    card.style.transition = '0.4s';
                    setTimeout(() => card.remove(), 400);
                }
            } else if (btn.title === 'Ocultar Temporalmente') {
                const badge = card.querySelector('.k-status-badge');
                if (badge) {
                    const oculta = badge.textContent === 'OCULTA';
                    badge.textContent      = oculta ? 'A LA VENTA' : 'OCULTA';
                    badge.style.background = oculta ? '' : '#555';
                }
            } else if (btn.title === 'Cambiar Precio') {
                const precioActual = card.querySelector('.k-artwork-price')?.textContent;
                const nuevo = prompt(`Precio actual: ${precioActual}\nEscribe el nuevo precio (solo números):`, '');
                if (nuevo && !isNaN(nuevo)) {
                    const formateado = new Intl.NumberFormat('es-CO', {
                        style: 'currency', currency: 'COP', minimumFractionDigits: 0
                    }).format(parseFloat(nuevo)).replace(/\u00a0/g, ' ');
                    card.querySelector('.k-artwork-price').textContent = formateado;
                }
            }
        });
    });

    document.querySelectorAll('.btn-order-action').forEach(btn => {
        btn.addEventListener('click', () => {
            const fila    = btn.closest('tr');
            const cliente = fila?.querySelector('.k-client-info strong')?.textContent;
            const obra    = fila?.querySelector('.k-client-info span')?.textContent;

            if (confirm(`¿Confirmar preparación del pedido de ${cliente} — ${obra}?`)) {
                const badge = fila.querySelector('.k-order-status');
                if (badge) { badge.textContent = 'EN PREPARACIÓN'; badge.className = 'k-order-status status-camino'; }
                btn.textContent   = 'PREPARANDO';
                btn.disabled      = true;
                btn.style.opacity = '0.5';
            }
        });
    });

    document.querySelectorAll('.k-notification-item').forEach(item => {
        item.addEventListener('click', () => {
            item.classList.remove('unread');
            const dot = item.querySelector('.k-notif-dot');
            if (dot) dot.style.display = 'none';
        });
    });

    const formPerfil = document.getElementById('form-editar-perfil');
    if (formPerfil) {
        formPerfil.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre       = document.getElementById('perfil-nombre').value.trim();
            const especialidad = document.getElementById('perfil-especialidad').value.trim();
            const ubicacion    = document.getElementById('perfil-ubicacion').value.trim();
            const bio          = document.getElementById('perfil-bio').value.trim();
            const instagram    = document.getElementById('perfil-instagram').value.trim();
            const behance      = document.getElementById('perfil-behance').value.trim();
            const linkedin     = document.getElementById('perfil-linkedin')?.value.trim() || '';

           
            if (nombre)       document.querySelector('.k-display-name').textContent = nombre;
            if (especialidad) document.querySelector('.k-info-item:nth-child(2) p').textContent = especialidad;
            if (ubicacion)    document.querySelector('.k-info-item:nth-child(1) p').textContent = ubicacion;
            if (bio)          document.querySelector('.k-bio-section p').textContent = bio;

       
            const links = document.querySelectorAll('.k-social-links a');
            if (links[0] && instagram) {
                links[0].href = instagram.startsWith('http') ? instagram : `https://instagram.com/${instagram.replace('@', '')}`;
            }
            if (links[1] && behance) {
                links[1].href = behance.startsWith('http') ? behance : `https://behance.net/${behance}`;
            }
            if (links[2] && linkedin) {
                links[2].href = linkedin.startsWith('http') ? linkedin : `https://linkedin.com/in/${linkedin}`;
            }

            localStorage.setItem('kelmatica_perfil_artista', JSON.stringify({ nombre, especialidad, ubicacion, bio }));
            localStorage.setItem('kelmatica_redes', JSON.stringify({ instagram, behance, linkedin }));

            cerrarModalPerfil();
            alert('✅ Perfil actualizado correctamente.');
        });
    }

    const btnEditarPerfil = document.querySelector('.btn-kelmatica-gold');
    if (btnEditarPerfil) {
        btnEditarPerfil.addEventListener('click', abrirModalPerfil);
    }

    const perfilGuardado = JSON.parse(localStorage.getItem('kelmatica_perfil_artista'));
    if (perfilGuardado) {
        if (perfilGuardado.nombre)       document.querySelector('.k-display-name').textContent = perfilGuardado.nombre;
        if (perfilGuardado.especialidad) document.querySelector('.k-info-item:nth-child(2) p').textContent = perfilGuardado.especialidad;
        if (perfilGuardado.ubicacion)    document.querySelector('.k-info-item:nth-child(1) p').textContent = perfilGuardado.ubicacion;
        if (perfilGuardado.bio)          document.querySelector('.k-bio-section p').textContent = perfilGuardado.bio;
    }

    const redesGuardadas = JSON.parse(localStorage.getItem('kelmatica_redes'));
    if (redesGuardadas) {
        const links = document.querySelectorAll('.k-social-links a');
        if (links[0] && redesGuardadas.instagram) {
            links[0].href = `https://instagram.com/${redesGuardadas.instagram.replace('@', '')}`;
        }
        if (links[1] && redesGuardadas.behance) {
            links[1].href = `https://behance.net/${redesGuardadas.behance}`;
        }
        if (links[2] && redesGuardadas.linkedin) {
            links[2].href = redesGuardadas.linkedin.startsWith('http')
                ? redesGuardadas.linkedin
                : `https://linkedin.com/in/${redesGuardadas.linkedin}`;
        }
    }

});

function cerrarSesion() {
    localStorage.removeItem('kelmatica_logged_in');
    localStorage.removeItem('sesionKelmatica');
    window.location.href = 'index.html';
}

function abrirModalPerfil() {
    const modal = document.getElementById('modal-editar-perfil');
    if (modal) modal.style.display = 'flex';

    document.getElementById('perfil-nombre').value       = document.querySelector('.k-display-name')?.textContent.trim() || '';
    document.getElementById('perfil-especialidad').value = document.querySelector('.k-info-item:nth-child(2) p')?.textContent.trim() || '';
    document.getElementById('perfil-ubicacion').value    = document.querySelector('.k-info-item:nth-child(1) p')?.textContent.trim() || '';
    document.getElementById('perfil-bio').value          = document.querySelector('.k-bio-section p')?.textContent.trim() || '';

    const redes = JSON.parse(localStorage.getItem('kelmatica_redes'));
    if (redes) {
        if (document.getElementById('perfil-instagram')) document.getElementById('perfil-instagram').value = redes.instagram || '';
        if (document.getElementById('perfil-behance'))   document.getElementById('perfil-behance').value   = redes.behance   || '';
        if (document.getElementById('perfil-linkedin'))  document.getElementById('perfil-linkedin').value  = redes.linkedin  || '';
    }
}

function cerrarModalPerfil() {
    const modal = document.getElementById('modal-editar-perfil');
    if (modal) modal.style.display = 'none';
}

window.addEventListener('click', (e) => {
    const modal = document.getElementById('modal-editar-perfil');
    if (e.target === modal) cerrarModalPerfil();
});