'use strict';

/* =============================================
   MÓDULO: modal.js
   Responsabilidad: modal de detalle del juego
   (position fixed, capa encima de todo el documento).

   Por qué existe: el modal tiene su propia lógica
   de apertura, cierre y sincronización de botones
   (carrito/favoritos). Centralizar esto evita mezclar
   el comportamiento del modal con el de la grilla.

   Exporta: abrirModal, actualizarModalBtns, cerrarModal

   Importa:
     data.js    — JUEGOS, ETIQUETAS_GENERO
     state.js   — carrito, favoritos, estado
     helpers.js — estrellasHTML
     dom.js     — todos los elementos del modal
   ============================================= */

import { JUEGOS, ETIQUETAS_GENERO } from './data.js';
import { carrito, favoritos, estado } from './state.js';
import { estrellasHTML } from './helpers.js';
import {
  modalJuego, modalImg, modalGenero, modalTitulo, modalDev,
  modalEstrellas, modalDescripcion, modalPrecioBloque,
  modalBtnAgregar, modalBtnFavorito,
} from './dom.js';

/* CLASE 7 — Modal de detalle del juego
   Position fixed: capa encima de todo el documento */

export function abrirModal(id) {
  const j = JUEGOS.find(x => x.id === id);
  if (!j) return;
  estado.juegoModalActual = j;

  modalImg.src                 = j.imgHero ? `img/${j.imgHero}` : `img/juegos/${j.img}`;
  modalImg.alt                 = j.titulo;
  modalGenero.textContent      = ETIQUETAS_GENERO[j.genero] || j.genero;
  modalTitulo.textContent      = j.titulo;
  modalDev.textContent         = `${j.dev} · ${j.anio}`;
  modalEstrellas.innerHTML     = estrellasHTML(j.rating || 0);
  modalDescripcion.textContent = j.descripcion || '';

  const descuento = j.precioOriginal ? Math.round((1 - j.precio / j.precioOriginal) * 100) : 0;
  modalPrecioBloque.innerHTML = `
    <div class="tarjeta-precio">
      ${descuento > 0 ? `
        <span class="precio-badge">-${descuento}%</span>
        <span class="precio-original">$${j.precioOriginal.toFixed(2)}</span>
      ` : ''}
      <span class="precio-actual">$${j.precio.toFixed(2)}</span>
    </div>`;

  actualizarModalBtns();
  modalJuego.hidden = false;
  document.body.style.overflow = 'hidden';
}

/* Sincroniza el texto y estado de los botones del modal
   con el estado actual del carrito y favoritos */
export function actualizarModalBtns() {
  if (!estado.juegoModalActual) return;
  const j      = estado.juegoModalActual;
  const enCart = carrito.has(j.id);
  const esFav  = favoritos.has(j.id);

  modalBtnAgregar.textContent = enCart ? '✓ En el carrito' : '+ Agregar al carrito';
  modalBtnAgregar.classList.toggle('en-carrito', enCart);
  modalBtnAgregar.dataset.id = j.id;

  modalBtnFavorito.innerHTML = esFav ? '♥' : '♡';
  modalBtnFavorito.classList.toggle('favorito-activo', esFav);
  modalBtnFavorito.dataset.id = j.id;
}

export function cerrarModal() {
  modalJuego.hidden = true;
  document.body.style.overflow = '';
  estado.juegoModalActual = null;
}
