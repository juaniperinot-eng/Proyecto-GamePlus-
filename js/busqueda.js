'use strict';

/* =============================================
   MÓDULO: busqueda.js
   Responsabilidad: panel de búsqueda estilo
   PlayStation Store (desliza desde arriba).

   Por qué existe: el flujo de búsqueda tiene su
   propio estado (terminoActual), su propio panel
   visual y su propia lógica de debounce. Aislarlo
   evita que el módulo principal se llene de detalles
   de implementación del input.

   Exporta: abrirBusqueda, cerrarBusqueda,
            mostrarResultadosBusqueda

   Importa:
     data.js    — JUEGOS, ETIQUETAS_GENERO
     state.js   — estado (terminoActual)
     helpers.js — (no necesita helpers directamente)
     dom.js     — panel, input, botones, resultados
     catalog.js — renderizarJuegos
   ============================================= */

import { JUEGOS, ETIQUETAS_GENERO } from './data.js';
import { estado } from './state.js';
import { panelBusqueda, inputBusqueda, btnBuscar, resultadosBusqueda } from './dom.js';
import { renderizarJuegos } from './catalog.js';

/* CLASE 7 — Búsqueda estilo PlayStation Store
   Position fixed: el panel se desliza desde arriba */

export function abrirBusqueda() {
  panelBusqueda.classList.add('abierto');
  /* El panel tiene su propio fondo oscuro — no usa el overlay compartido
     para evitar que el div negro (z-index 400) tape el panel (z-index 500) */
  document.body.style.overflow = 'hidden';
  setTimeout(() => inputBusqueda.focus(), 50);
  btnBuscar.setAttribute('aria-expanded', 'true');
  mostrarResultadosBusqueda('');
}

export function cerrarBusqueda() {
  panelBusqueda.classList.remove('abierto');
  document.body.style.overflow = '';
  inputBusqueda.value = '';
  resultadosBusqueda.innerHTML = '';
  btnBuscar.setAttribute('aria-expanded', 'false');
  renderizarJuegos(estado.terminoActual);
}

export function mostrarResultadosBusqueda(termino) {
  estado.terminoActual = termino.trim();
  const t = estado.terminoActual.toLowerCase();

  if (!t) {
    resultadosBusqueda.innerHTML = `<p class="resultados-hint">Escribí el nombre de un juego para ver resultados.</p>`;
    return;
  }

  const encontrados = JUEGOS.filter(j =>
    j.titulo.toLowerCase().includes(t) || j.dev.toLowerCase().includes(t)
  );

  if (encontrados.length === 0) {
    resultadosBusqueda.innerHTML = `<p class="resultados-vacio">No se encontraron juegos para "<strong>${termino}</strong>".</p>`;
    return;
  }

  const etiquetaSeccion = `<p class="resultados-titulo-seccion">${encontrados.length} resultado${encontrados.length !== 1 ? 's' : ''}</p>`;

  const items = encontrados.map(j => `
    <button class="resultado-item" data-id="${j.id}">
      <img src="img/juegos/${j.img}" alt="${j.titulo}">
      <div class="resultado-info">
        <span class="resultado-titulo">${resaltarCoincidencia(j.titulo, t)}</span>
        <span class="resultado-meta">${j.dev} · ${ETIQUETAS_GENERO[j.genero] || j.genero}</span>
      </div>
      <span class="resultado-precio">$${j.precio.toFixed(2)}</span>
    </button>`).join('');

  resultadosBusqueda.innerHTML = etiquetaSeccion + items;

  resultadosBusqueda.querySelectorAll('.resultado-item').forEach(btn => {
    btn.addEventListener('click', () => {
      cerrarBusqueda();
      document.getElementById('tienda').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

/* Función privada: resalta el texto coincidente (no se exporta) */
function resaltarCoincidencia(texto, termino) {
  const regex = new RegExp(`(${termino.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  return texto.replace(regex, '<mark style="background:transparent;color:var(--accent-soft);font-weight:700">$1</mark>');
}
