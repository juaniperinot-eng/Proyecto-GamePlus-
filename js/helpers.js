'use strict';

/* =============================================
   MÓDULO: helpers.js
   Responsabilidad: funciones utilitarias puras
   y reutilizables en toda la aplicación.

   Por qué existe: agrupar pequeñas funciones de
   ayuda en un lugar evita copiarlas en cada módulo.
   Son funciones "sin dominio propio": no saben de
   juegos, ni de carrito, ni de favoritos.

   Exporta: estrellasHTML, actualizarBadge,
            panelVacioHTML, toast,
            formatearPrecio

   Importa: dom.js (solo toastContainer para los
   mensajes flotantes)
   ============================================= */

import { toastContainer } from './dom.js';

/* CLASE 6 — Funciones auxiliares
   Consigna: helpers reutilizables en todo el archivo */

/* Genera HTML de estrellas según el rating (1-5) */
export function estrellasHTML(rating) {
  return Array.from({ length: 5 }, (_, i) =>
    `<span class="estrella${i < rating ? ' activa' : ''}">${i < rating ? '★' : '☆'}</span>`
  ).join('');
}

/* Actualiza el badge numérico sobre un ícono */
export function actualizarBadge(el, cantidad) {
  el.textContent = cantidad;
  el.classList.toggle('visible', cantidad > 0);
}

/* Genera el HTML del estado vacío de un panel */
export function panelVacioHTML(pathSVG, mensaje) {
  return `
    <div class="panel-vacio">
      <svg xmlns="http://www.w3.org/2000/svg"
           width="52"
           height="52"
           viewBox="0 0 24 24"
           fill="none"
           stroke="currentColor"
           stroke-width="1.5"
           stroke-linecap="round"
           stroke-linejoin="round">
        ${pathSVG}
      </svg>

      <p>${mensaje}</p>
    </div>
  `;
}

/* Muestra un mensaje flotante que desaparece solo */
export function toast(mensaje, claseExtra = '') {
  const el = document.createElement('div');

  el.className = ['toast', claseExtra]
    .filter(Boolean)
    .join(' ');

  el.textContent = mensaje;

  toastContainer.appendChild(el);

  el.addEventListener('animationend', event => {
    if (event.animationName === 'toast-out') {
      el.remove();
    }
  });
}

/* Formatea números como precios monetarios */
export function formatearPrecio(precio) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS'
  }).format(precio);
}