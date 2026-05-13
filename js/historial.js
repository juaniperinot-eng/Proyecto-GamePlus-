'use strict';

/* =============================================
   MÓDULO: historial.js
   Responsabilidad: renderizado del panel de
   historial de compras.

   Por qué existe: concentra la lógica de presentación
   del historial. paneles.js se encarga de abrir/cerrar
   el sidebar; este módulo solo sabe cómo renderizarlo.

   Exporta: renderizarHistorial

   Importa:
     state.js   — estado.historialCompras
     helpers.js — panelVacioHTML
     dom.js     — historialItemsEl
   ============================================= */

import { estado } from './state.js';
import { panelVacioHTML } from './helpers.js';
import { historialItemsEl } from './dom.js';

/* =============================================
   HISTORIAL DE COMPRAS
   ============================================= */
export function renderizarHistorial() {
  if (estado.historialCompras.length === 0) {
    historialItemsEl.innerHTML = panelVacioHTML(
      `<rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/>`,
      'No realizaste ninguna compra aún.'
    );
    return;
  }

  historialItemsEl.innerHTML = estado.historialCompras.map(compra => `
    <div class="historial-compra">
      <div class="historial-compra-header">
        <span class="historial-fecha">${compra.fecha}</span>
        <span class="historial-total">$${compra.total.toFixed(2)}</span>
      </div>
      <ul class="historial-juegos">
        ${compra.juegos.map(t => `<li>${t}</li>`).join('')}
      </ul>
    </div>`).join('');
}
