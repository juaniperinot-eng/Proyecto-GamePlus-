'use strict';

/*
  main.js — punto de entrada de la aplicación.

  El HTML está completo en index.html, por lo que dom.js puede evaluarse
  de forma segura con imports dinámicos (await import()), que se resuelven
  después de que <script type="module"> es diferido y el DOM está listo.

  Orden de inicialización (importa el orden):
  1. cargarEstado()        — restaura carrito/favoritos del localStorage
  2. actualizarBtnComprar() — habilita/deshabilita el botón de compra
  3. renderizarJuegos()    — pinta la grilla con los datos cargados
  4. initCarousel()        — inicia el carousel y sus event listeners
  5. import './eventos.js' — registra todos los demás listeners de la app
*/

const { cargarEstado }         = await import('./storage.js');
const { renderizarJuegos }     = await import('./catalog.js');
const { actualizarBtnComprar } = await import('./carrito.js');
const { initCarousel }         = await import('./carousel.js');
await import('./eventos.js');

cargarEstado();
actualizarBtnComprar();
renderizarJuegos();
initCarousel();

// initUI();
// initEvents();
