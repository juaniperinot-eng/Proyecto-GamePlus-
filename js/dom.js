'use strict';

/* =============================================
   MÓDULO: dom.js
   Responsabilidad: referencias a los elementos
   del documento HTML.

   Por qué existe: centralizar los querySelector y
   getElementById evita duplicar estas llamadas en
   cada módulo y facilita actualizar los IDs del HTML
   desde un solo lugar.

   Este módulo se evalúa DESPUÉS de que el HTML
   termina de parsearse porque main.js usa
   <script type="module">, que es diferido por defecto.

   Exporta: todos los nodos del DOM que la app necesita.
   No importa ningún otro módulo.
   ============================================= */

/* CLASE 6 — Referencias al DOM
   Consigna: querySelector y getElementById para
   acceder a los nodos del documento */

/* --- Grilla y conteo --- */
export const grilla        = document.getElementById('grilla-juegos');
export const sinResultados = document.getElementById('sin-resultados');
export const conteoJuegos  = document.getElementById('conteo-juegos');

/* --- Filtros de género --- */
export const filtrosNav = document.querySelectorAll('.nav-inferior ul li');

/* --- Overlay compartido --- */
export const overlay = document.getElementById('overlay');

/* --- Carrito --- */
export const carritoSidebar    = document.getElementById('carrito-sidebar');
export const carritoItemsEl    = document.getElementById('carrito-items');
export const carritoContador   = document.getElementById('carrito-contador');
export const carritoTotalEl    = document.getElementById('carrito-total-precio');
export const carritoBundleInfo = document.getElementById('carrito-bundle-info');
export const btnAbrirCarrito   = document.getElementById('btn-abrir-carrito');
export const btnCerrarCarrito  = document.getElementById('cerrar-carrito');
export const btnComprar        = document.getElementById('btn-comprar');

/* --- Favoritos --- */
export const favoritosSidebar   = document.getElementById('favoritos-sidebar');
export const favoritosItemsEl   = document.getElementById('favoritos-items');
export const favoritosFooter    = document.getElementById('favoritos-footer');
export const favoritosContador  = document.getElementById('favoritos-contador');
export const btnAgregarTodos    = document.getElementById('btn-agregar-todos');
export const btnAbrirFavoritos  = document.getElementById('btn-abrir-favoritos');
export const btnCerrarFavoritos = document.getElementById('cerrar-favoritos');

/* --- Historial --- */
export const historialSidebar   = document.getElementById('historial-sidebar');
export const historialItemsEl   = document.getElementById('historial-items');
export const btnCerrarHistorial = document.getElementById('cerrar-historial');

/* --- Búsqueda --- */
export const panelBusqueda      = document.getElementById('panel-busqueda');
export const inputBusqueda      = document.getElementById('input-busqueda');
export const btnBuscar          = document.getElementById('btn-buscar');
export const btnCerrarBusqueda  = document.getElementById('btn-cerrar-busqueda');
export const resultadosBusqueda = document.getElementById('resultados-busqueda');

/* --- Carousel --- */
export const carouselTrack = document.getElementById('carousel-track');
export const dotsContainer = document.getElementById('carousel-dots');
export const btnPrev       = document.getElementById('carousel-prev');
export const btnNext       = document.getElementById('carousel-next');
export const heroSection   = document.getElementById('hero-carousel');

/* --- Modal --- */
export const modalJuego        = document.getElementById('modal-juego');
export const modalImg          = document.getElementById('modal-img');
export const modalGenero       = document.getElementById('modal-genero');
export const modalTitulo       = document.getElementById('modal-titulo');
export const modalDev          = document.getElementById('modal-dev');
export const modalEstrellas    = document.getElementById('modal-estrellas');
export const modalDescripcion  = document.getElementById('modal-descripcion');
export const modalPrecioBloque = document.getElementById('modal-precio-bloque');
export const modalBtnAgregar   = document.getElementById('modal-btn-agregar');
export const modalBtnFavorito  = document.getElementById('modal-btn-favorito');
export const modalCerrar       = document.getElementById('modal-cerrar');

/* --- Header y menú mobile --- */
export const headerEl     = document.querySelector('header');
export const btnHamburger = document.getElementById('btn-hamburger');
export const menuMobile   = document.getElementById('menu-mobile');

/* --- Ordenamiento y toasts --- */
export const selectOrden    = document.getElementById('select-orden');
export const toastContainer = document.getElementById('toast-container');
