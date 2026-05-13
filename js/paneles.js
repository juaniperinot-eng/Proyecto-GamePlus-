'use strict';

/* =============================================
   MÓDULO: paneles.js
   Responsabilidad: coordinación de los paneles
   laterales (carrito, favoritos, historial).

   Por qué existe: los tres paneles comparten un
   overlay y deben cerrarse mutuamente al abrirse.
   Centralizar este comportamiento en un módulo
   dedicado evita que carrito.js y favoritos.js
   se importen entre sí (dependencia circular).

   Este es el módulo "director de orquesta" de los
   sidebars: sabe cuáles existen y cómo interactúan,
   pero no sabe nada de la lógica interna de cada uno.

   Exporta: abrirCarrito, cerrarCarrito,
            abrirFavoritos, cerrarFavoritos,
            abrirHistorial, cerrarHistorial

   Importa:
     dom.js       — overlay y los tres sidebars
     carrito.js   — renderizarCarritoSidebar
     favoritos.js — renderizarFavoritosSidebar
     historial.js — renderizarHistorial

   Ninguno de los módulos anteriores importa paneles.js,
   por lo que no hay dependencias circulares.
   ============================================= */

import { overlay, carritoSidebar, favoritosSidebar, historialSidebar } from './dom.js';
import { renderizarCarritoSidebar } from './carrito.js';
import { renderizarFavoritosSidebar } from './favoritos.js';
import { renderizarHistorial } from './historial.js';

/* --- Carrito --- */
export function abrirCarrito() {
  cerrarFavoritos(false);
  renderizarCarritoSidebar();
  carritoSidebar.classList.add('abierto');
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

export function cerrarCarrito(restaurarScroll = true) {
  carritoSidebar.classList.remove('abierto');
  overlay.classList.remove('visible');
  if (restaurarScroll) document.body.style.overflow = '';
}

/* --- Favoritos --- */
export function abrirFavoritos() {
  cerrarCarrito(false);
  renderizarFavoritosSidebar();
  favoritosSidebar.classList.add('abierto');
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

export function cerrarFavoritos(restaurarScroll = true) {
  favoritosSidebar.classList.remove('abierto');
  overlay.classList.remove('visible');
  if (restaurarScroll) document.body.style.overflow = '';
}

/* --- Historial --- */
export function abrirHistorial() {
  cerrarCarrito(false);
  cerrarFavoritos(false);
  renderizarHistorial();
  historialSidebar.classList.add('abierto');
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

export function cerrarHistorial(restaurarScroll = true) {
  historialSidebar.classList.remove('abierto');
  overlay.classList.remove('visible');
  if (restaurarScroll) document.body.style.overflow = '';
}
