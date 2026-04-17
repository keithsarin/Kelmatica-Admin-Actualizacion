document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. NAVEGACIÓN TIPO PESTAÑA (Single Page Application) ---
    const menuLinks = document.querySelectorAll('.sidebar-menu a');
    const sections = document.querySelectorAll('.tab-content');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Obtener el ID de la sección (ej: "perfil" o "subir-obra")
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
                // Quitar 'active' de todos los li y ocultar secciones
                document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
                sections.forEach(section => section.style.display = 'none');
                
                // Activar el actual y mostrar sección
                this.parentElement.classList.add('active');
                targetSection.style.display = 'block';
            }
        });
    });

    // --- 2. PREVISUALIZACIÓN DE IMAGEN (Módulo Subir Obra) ---
    const dropArea = document.getElementById('drop-area');
    const fileSelector = document.getElementById('file-selector');
    const imagePreview = document.getElementById('image-preview');

    if (dropArea && fileSelector) {
        dropArea.addEventListener('click', () => fileSelector.click());

        fileSelector.addEventListener('change', function() {
            const file = this.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = function(e) {
                    imagePreview.innerHTML = `
                        <img src="${e.target.result}" style="max-width: 100%; height: 250px; object-fit: cover; border: 1px solid #c5a059; border-radius: 10px;">
                        <p style="color: #c5a059; font-size: 0.8rem; margin-top: 10px; letter-spacing: 2px;">OBRA LISTA PARA REVISIÓN</p>
                    `;
                    dropArea.style.display = 'none';
                    imagePreview.style.display = 'block';
                }
                reader.readAsDataURL(file);
            }
        });
    }

    // --- 3. VALIDACIÓN Y ENVÍO DEL FORMULARIO ---
    const formObra = document.getElementById('form-subir-obra');
    if (formObra) {
        formObra.addEventListener('submit', (e) => {
            e.preventDefault();

            const nombre = document.getElementById('nombre-obra').value;
            const precio = document.getElementById('precio').value;

            if (precio <= 0) {
                alert("⚠️ El valor de la obra debe ser un monto real.");
                return;
            }

            alert(`¡Obra "${nombre}" enviada a Kelmática! El administrador la validará pronto.`);
            formObra.reset();
            imagePreview.style.display = 'none';
            dropArea.style.display = 'block';
        });
    }

    // --- 4. BOTÓN GUARDAR BORRADOR ---
    const btnBorrador = document.querySelector('.btn-borrador');
    if (btnBorrador) {
        btnBorrador.addEventListener('click', () => {
            alert("Progreso guardado en Kelmática. Puedes terminar la publicación más tarde.");
        });
    }
});
// Forzar que al cargar la página se vea el perfil y se marque el menú
const linkPerfil = document.querySelector('a[href="#perfil"]');
if (linkPerfil) {
    // Simulamos un clic para que la lógica que ya creamos se ejecute sola
    linkPerfil.click(); 
}