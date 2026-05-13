'use strict';

/* =============================================
   MÓDULO: favoritos.js
   Responsabilidad: lógica completa de favoritos
   (toggle, renderizado del panel lateral izquierdo,
   agregar todos al carrito).

   Por qué existe: encapsula las operaciones sobre
   el Set `favoritos` y el rendering de su sidebar.
   Es el único módulo que sabe cómo se ve y comporta
   el panel de favoritos.

   Exporta: toggleFavorito, actualizarBtnFavoritoEnGrilla,
            renderizarFavoritosSidebar, agregarTodosAlCarrito

   Importa:
     data.js    — para buscar el objeto juego por id
     state.js   — favoritos (Set), carrito (Map), estado
     helpers.js — actualizarBadge, panelVacioHTML, toast
     dom.js     — elementos del sidebar y grilla
     storage.js — guardarEstado
     catalog.js — renderizarJuegos
     carrito.js — agregarAlCarrito, actualizarBtnCarritoEnGrilla

   Nota sobre dependencias circulares:
   paneles.js importa favoritos.js para renderizar.
   Para evitar el ciclo, favoritos.js NO importa paneles.js.
   ============================================= */

import { JUEGOS } from './data.js';
import { carrito, favoritos, estado } from './state.js';
import { actualizarBadge, panelVacioHTML, toast } from './helpers.js';
import { favoritosSidebar, favoritosItemsEl, favoritosFooter, favoritosContador, carritoContador, grilla } from './dom.js';
import { guardarEstado } from './storage.js';
import { renderizarJuegos } from './catalog.js';
import { agregarAlCarrito, actualizarBtnComprar } from './carrito.js';

/* CLASE 6 — Favoritos
   Consigna: métodos que manipulan objetos y
   nodos del DOM (Set, classList, innerHTML) */

export function toggleFavorito(id) {
  const j = JUEGOS.find(x => x.id === id);
  if (!j) return;

  if (favoritos.has(id)) {
    favoritos.delete(id);
    toast(`"${j.titulo}" quitado de favoritos`, 'toast-fav');
  } else {
    favoritos.add(id);
    toast(`♥ "${j.titulo}" guardado en favoritos`, 'toast-fav');
  }

  actualizarBadge(favoritosContador, favoritos.size);
  guardarEstado();
  /* Actualiza solo el botón corazón de esta tarjeta — sin re-renderizar toda la grilla */
  actualizarBtnFavoritoEnGrilla(id, favoritos.has(id));

  if (favoritosSidebar.classList.contains('abierto')) {
    renderizarFavoritosSidebar();
  }
}

export function actualizarBtnFavoritoEnGrilla(id, esFav) {
  const btn = grilla.querySelector(`.btn-favorito[data-id="${id}"]`);
  if (!btn) return;
  btn.innerHTML = esFav ? '♥' : '♡';
  btn.classList.toggle('favorito-activo', esFav);
  btn.setAttribute('aria-label', `${esFav ? 'Quitar de' : 'Agregar a'} favoritos`);
}

export function renderizarFavoritosSidebar() {
  favoritosFooter.hidden = favoritos.size === 0;

  if (favoritos.size === 0) {
    favoritosItemsEl.innerHTML = panelVacioHTML(
      `<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>`,
      'Todavía no tenés favoritos.<br>Hacé click en ♡ en cualquier juego.'
    );
    return;
  }

  favoritosItemsEl.innerHTML = [...favoritos].map(id => {
    const j = JUEGOS.find(x => x.id === id);
    if (!j) return '';
    const enCart = carrito.has(j.id);
    return `
      <div class="panel-item">
        <img src="img/juegos/${j.img}" alt="${j.titulo}">
        <div class="panel-item-info">
          <h4>${j.titulo}</h4>
          <p>$${j.precio.toFixed(2)}</p>
        </div>
        <div class="panel-item-acciones">
          <button class="btn-agregar-mini${enCart ? ' en-carrito' : ''}"
                  data-id="${j.id}">${enCart ? '✓' : '+ Carrito'}</button>
          <button class="btn-quitar" data-id="${j.id}" data-tipo="favorito">Quitar</button>
        </div>
      </div>`;
  }).join('');

  favoritosItemsEl.querySelectorAll('.btn-quitar[data-tipo="favorito"]').forEach(btn => {
    btn.addEventListener('click', () => {
      toggleFavorito(Number(btn.dataset.id));
      renderizarFavoritosSidebar();
    });
  });

  favoritosItemsEl.querySelectorAll('.btn-agregar-mini').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = Number(btn.dataset.id);
      /* Si ya está en el carrito, el botón muestra "✓" y no hacemos nada más */
      if (!carrito.has(id)) {
        agregarAlCarrito(id);
        renderizarFavoritosSidebar();
      }
    });
  });
}

export function agregarTodosAlCarrito() {
  let agregados = 0;
  favoritos.forEach(id => {
    if (!carrito.has(id)) {
      const j = JUEGOS.find(x => x.id === id);
      if (j) { carrito.set(id, j); agregados++; }
    }
  });

  if (agregados > 0) {
    actualizarBadge(carritoContador, carrito.size);
    actualizarBtnComprar();
    guardarEstado();
    renderizarJuegos(estado.terminoActual);
    toast(`🛒 ${agregados} juego${agregados > 1 ? 's' : ''} agregado${agregados > 1 ? 's' : ''} al carrito`);
  } else {
    toast('Todos los favoritos ya están en el carrito');
  }
  renderizarFavoritosSidebar();
}
