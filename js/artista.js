document.addEventListener('DOMContentLoaded', () => {
    
    const menuLinks = document.querySelectorAll('.sidebar-menu a');
    const sections = document.querySelectorAll('.tab-content');

    menuLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
<<<<<<< HEAD
        
=======
>>>>>>> 97354fc2cedd0feec997e692037aeae22c42ecab
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            if (targetSection) {
   
                document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
                sections.forEach(section => section.style.display = 'none');
                
                // Activar el actual y mostrar sección
                this.parentElement.classList.add('active');
                targetSection.style.display = 'block';
            }
        });
    });

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
<<<<<<< HEAD
=======

>>>>>>> 97354fc2cedd0feec997e692037aeae22c42ecab
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

<<<<<<< HEAD
   
=======
>>>>>>> 97354fc2cedd0feec997e692037aeae22c42ecab
    const btnBorrador = document.querySelector('.btn-borrador');
    if (btnBorrador) {
        btnBorrador.addEventListener('click', () => {
            alert("Progreso guardado en Kelmática. Puedes terminar la publicación más tarde.");
        });
    }
});
<<<<<<< HEAD
ú
const linkPerfil = document.querySelector('a[href="#perfil"]');
if (linkPerfil) {
    
=======
const linkPerfil = document.querySelector('a[href="#perfil"]');
if (linkPerfil) {
>>>>>>> 97354fc2cedd0feec997e692037aeae22c42ecab
    linkPerfil.click(); 
}
