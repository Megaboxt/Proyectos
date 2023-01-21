
// function tarea( callback ) {
//     console.log('mi primer tarea');

//     callback()
// }

// // Sintaxis Node para llamar la funcion
// exports.tarea = tarea;

// Compilar SASS con Gulp

const { src, dest, watch, parallel } = require("gulp"); // Extrae funcionalidades de gulp
// src sirve para identificar un archivo
// dest sirve para guardar un archivo
// watch es una funcion, sirve para automatizar la ejecucion de las funciones desde la terminal
// 


// Constantes de CSS
const sass = require("gulp-sass")(require('sass'));  // Llama la dependencia del package.json
const plumber = require('gulp-plumber');

// Constante de Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

function css(callback) {
    src('src/scss/**/*.scss')  // Identificar archivo SASS
    .pipe( plumber() )
    .pipe( sass() )         // Compilarlo
    .pipe( dest("build/css")); // Almacenarla en el disco duro // guarda momentaneamente informacion
    
    callback(); // Avisa a Gulp cuando llegamos al final
}

// Imagenes
function imagenes(callback) {
    const opciones = {
        optimizationLevel: 3
    }
    
    src('src/img/**/*.{png,jpg}')
        .pipe( cache(imagemin(opciones) ) ) 
        .pipe( dest('build/img')) // Lo almacena en disco duro(creando carpeta build/img)

    callback();
}

function versionwebp(callback) {

    const opciones = { // Indica la calidad de la imagen 
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')  // Busca las diferentes extensiones
        .pipe( webp(opciones) ) // Queda en memoria un tiempo
        .pipe( dest('build/img')) // Lo almacena en disco duro(creando carpeta build/img)

    callback();
}

function versionAvif(callback) {

    const opciones = { // Indica la calidad de la imagen 
        quality: 50
    };

    src('src/img/**/*.{png,jpg}')  // Busca las diferentes extensiones
        .pipe( avif(opciones) ) // Queda en memoria un tiempo
        .pipe( dest('build/img')) // Lo almacena en disco duro(creando carpeta build/img)

    callback();
}

function javascript( callback ) {
    src('src/js/**/*.js')
        .pipe( dest('build/js'));
    
    callback();
}

// Watch, sirve para automatizar la ejecucion de las funciones desde la terminal
// con npx gulp dev, nos permite ejecutar paquetes sin necesidad de instalarlos globalmente
function dev(callback) {
    watch("src/scss/**/*.scss", css);
    watch("src/js/**/*.js", javascript);

    callback();
}


// Workflow
exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionwebp = versionwebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionwebp, versionAvif, javascript, dev );