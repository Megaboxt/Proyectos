// Activar eventos en HTML
document.addEventListener('DOMContentLoaded', function() {
    iniciarApp();
});

function iniciarApp() {
    crearGaleria();
}


/* Creando los elementos y sources de galeria */
function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');
    // galeria.textContent = 'Modificando la seccion de galeria';

    /* Creando iteracion del elemento "picture" 1 hasta el 12 */
    for (let i = 1; i <= 12; i++ ) {

        const imagen = document.createElement('picture');

        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img width="200" height="300" src="build/img/thumb/${i}.jpg" alt="Imagen galeria">
        `;
        // Creando callback mostrar imagen
        imagen.onClick = function() {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);
    }
}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');

        imagen.innerHTML = `
            <source srcset="build/img/grande/${id}.avif" type="image/avif">
            <source srcset="build/img/grande/${id}.webp" type="image/webp">
            <img width="200" height="300" src="build/img/grande/${id}.jpg" alt="Imagen galeria">
        `;
    
    // Generando un elemento div
    const overlay = document.createElement('DIV');
    overlay.appendChild(imagen);
    // Con la clase overlay
    overlay.classList.add('overlay');

    // Mostrando overlay en el body (sombreado)
    const body = document.querySelector('body');
    body.appendChild(overlay);
}