'use strict';

/* =============================================
   MÓDULO: carrito.js
   Responsabilidad: toda la lógica del carrito de
   compras (agregar, quitar, renderizar, comprar).

   Por qué existe: encapsula las operaciones del Map
   `carrito` y el rendering del panel lateral derecho.
   paneles.js se encarga de abrir/cerrar el sidebar;
   este módulo solo maneja los datos y la vista interna.

   Exporta: agregarAlCarrito, quitarDelCarrito,
            renderizarCarritoSidebar, actualizarBtnComprar,
            actualizarBtnCarritoEnGrilla, procesarCompra

   Importa:
     data.js    — para buscar el objeto juego por id
     state.js   — carrito (Map) y estado
     helpers.js — actualizarBadge, panelVacioHTML, toast
     dom.js     — elementos del sidebar y grilla
     storage.js — guardarEstado
     catalog.js — renderizarJuegos (re-renderiza la grilla)

   Nota sobre dependencias circulares:
   paneles.js importa carrito.js para renderizar.
   Para evitar el ciclo, carrito.js NO importa paneles.js.
   La acción "abrir carrito al hacer clic en un juego
   que ya está agregado" se maneja en eventos.js.
   ============================================= */

import { JUEGOS } from './data.js';
import { carrito, estado } from './state.js';
import { actualizarBadge, panelVacioHTML, toast } from './helpers.js';
import {
  carritoItemsEl, carritoContador, carritoTotalEl,
  carritoBundleInfo, btnComprar, grilla,
} from './dom.js';
import { guardarEstado } from './storage.js';
import { renderizarJuegos } from './catalog.js';

/* CLASE 6 — Carrito
   Consigna: manipulación del DOM, eventos y
   métodos sobre objetos (Map) */

export function actualizarBtnComprar() {
  btnComprar.disabled = carrito.size === 0;
}

export function agregarAlCarrito(id) {
  /* Si ya está en el carrito, el llamador decide qué hacer
     (eventos.js abre el panel en ese caso) */
  if (carrito.has(id)) return;
  const j = JUEGOS.find(x => x.id === id);
  if (!j) return;

  carrito.set(id, j);
  actualizarBadge(carritoContador, carrito.size);
  actualizarBtnComprar();
  guardarEstado();
  /* Actualiza solo el botón de esta tarjeta — sin re-renderizar toda la grilla */
  actualizarBtnCarritoEnGrilla(id, true);
  toast(`🛒 "${j.titulo}" agregado al carrito`);
}

export function quitarDelCarrito(id) {
  const j = carrito.get(id);
  if (!j) return;
  carrito.delete(id);
  actualizarBadge(carritoContador, carrito.size);
  actualizarBtnComprar();
  guardarEstado();
  renderizarCarritoSidebar();
  actualizarBtnCarritoEnGrilla(id, false);
  toast(`"${j.titulo}" quitado del carrito`);
}

export function actualizarBtnCarritoEnGrilla(id, enCarrito) {
  const btn = grilla.querySelector(`.btn-agregar[data-id="${id}"]`);
  if (!btn) return;
  btn.textContent = enCarrito ? '✓ Agregado' : '+ Agregar';
  btn.classList.toggle('en-carrito', enCarrito);
}

export function renderizarCarritoSidebar() {
  if (carrito.size === 0) {
    carritoItemsEl.innerHTML = panelVacioHTML(
      `<circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>`,
      'Tu carrito está vacío.'
    );
    carritoTotalEl.textContent = '$0.00';
    return;
  }

  let total = 0;
  carritoItemsEl.innerHTML = [...carrito.values()].map(j => {
    total += j.precio;
    return `
      <div class="panel-item">
        <img src="img/juegos/${j.img}" alt="${j.titulo}">
        <div class="panel-item-info">
          <h4>${j.titulo}</h4>
          <p>${j.dev}</p>
        </div>
        <div class="panel-item-acciones">
          <span class="panel-item-precio">$${j.precio.toFixed(2)}</span>
          <button class="btn-quitar" data-id="${j.id}">Quitar</button>
        </div>
      </div>`;
  }).join('');

  /* Descuento bundle: 10% si hay 3 o más juegos */
  const descuentoBundle = carrito.size >= 3 ? total * 0.10 : 0;
  const totalFinal      = total - descuentoBundle;

  if (descuentoBundle > 0) {
    carritoBundleInfo.innerHTML = `
      <span>Bundle ${carrito.size} juegos &minus; 10% off</span>
      <span class="bundle-ahorro">&minus;$${descuentoBundle.toFixed(2)}</span>`;
    carritoBundleInfo.hidden = false;
  } else {
    carritoBundleInfo.hidden = true;
  }

  carritoTotalEl.textContent = `$${totalFinal.toFixed(2)}`;

  carritoItemsEl.querySelectorAll('.btn-quitar').forEach(btn => {
    btn.addEventListener('click', () => quitarDelCarrito(Number(btn.dataset.id)));
  });
}

/* Procesa la compra: guarda en historial, vacía el carrito
   y actualiza la UI. eventos.js cierra el panel luego de llamar esto. */
export function procesarCompra() {
  if (carrito.size === 0) return;

  let subtotal = 0;
  const juegosTitulos = [];
  carrito.forEach(j => { subtotal += j.precio; juegosTitulos.push(j.titulo); });
  const descuento  = carrito.size >= 3 ? subtotal * 0.10 : 0;
  const totalFinal = subtotal - descuento;

  estado.historialCompras.unshift({
    fecha:  new Date().toLocaleDateString('es-AR', { day: '2-digit', month: '2-digit', year: 'numeric' }),
    juegos: juegosTitulos,
    total:  totalFinal,
  });

  toast('¡Gracias por tu compra! 🎮');
  carrito.clear();
  actualizarBadge(carritoContador, 0);
  actualizarBtnComprar();
  guardarEstado();
  renderizarJuegos(estado.terminoActual);
}
