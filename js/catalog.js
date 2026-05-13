'use strict';

/* =============================================
   MÓDULO: catalog.js
   Responsabilidad: renderizado del catálogo de
   juegos (grilla principal).

   Por qué existe: separar el rendering del catálogo
   permite que otros módulos (carrito, favoritos,
   búsqueda) pidan actualizar la grilla sin saber
   cómo funciona internamente.

   Exporta: renderizarJuegos, tarjetaHTML

   Importa:
     data.js    — JUEGOS y ETIQUETAS_GENERO
     state.js   — filtroActual, ordenActual, carrito, favoritos
     helpers.js — estrellasHTML
     dom.js     — grilla, sinResultados, conteoJuegos
   ============================================= */

import { JUEGOS, ETIQUETAS_GENERO } from './data.js';
import { carrito, favoritos, estado } from './state.js';
import { estrellasHTML } from './helpers.js';
import { grilla, sinResultados, conteoJuegos } from './dom.js';

/* CLASE 2 y 6 — Renderizado dinámico del catálogo
   Consigna: los artículos se generan con JS a
   partir del array JUEGOS, aplicando filtros y orden */
export function renderizarJuegos(termino = '') {
  const t = termino.toLowerCase().trim();

  /* Filtra por género y texto de búsqueda */
  const filtrados = JUEGOS.filter(j => {
    const generoOk   = estado.filtroActual === 'todos' || j.genero === estado.filtroActual;
    const busquedaOk = !t || j.titulo.toLowerCase().includes(t) || j.dev.toLowerCase().includes(t);
    return generoOk && busquedaOk;
  });

  /* Ordena según la selección del usuario */
  const comparadores = {
    'precio-asc':  (a, b) => a.precio - b.precio,
    'precio-desc': (a, b) => b.precio - a.precio,
    'nombre-asc':  (a, b) => a.titulo.localeCompare(b.titulo, 'es'),
    'anio-desc':   (a, b) => b.anio - a.anio,
  };
  if (comparadores[estado.ordenActual]) filtrados.sort(comparadores[estado.ordenActual]);

  sinResultados.hidden = filtrados.length > 0;
  conteoJuegos.textContent = filtrados.length === JUEGOS.length
    ? `${JUEGOS.length} juegos`
    : `${filtrados.length} de ${JUEGOS.length}`;

  grilla.innerHTML = filtrados.map(tarjetaHTML).join('');
}

/* Genera el HTML de una tarjeta de juego */
export function tarjetaHTML(j) {
  const esFav    = favoritos.has(j.id);
  const enCart   = carrito.has(j.id);
  const etiqueta = ETIQUETAS_GENERO[j.genero] || j.genero;

  /* Calcula el porcentaje de descuento */
  const descuento = j.precioOriginal
    ? Math.round((1 - j.precio / j.precioOriginal) * 100)
    : 0;

  const precioHTML = `
    <div class="tarjeta-precio">
      ${descuento > 0 ? `
        <span class="precio-badge">-${descuento}%</span>
        <span class="precio-original">$${j.precioOriginal.toFixed(2)}</span>
      ` : ''}
      <span class="precio-actual">$${j.precio.toFixed(2)}</span>
    </div>`;

  return `
    <article class="tarjeta tarjeta--clickable" data-id="${j.id}" role="listitem">
      <div class="tarjeta-imagen">
        <img src="img/juegos/${j.img}" alt="${j.titulo}" loading="lazy"
             onerror="this.style.opacity='0';this.onerror=null">
        <button class="btn-favorito${esFav ? ' favorito-activo' : ''}"
                data-id="${j.id}" aria-label="${esFav ? 'Quitar de' : 'Agregar a'} favoritos">
          ${esFav ? '♥' : '♡'}
        </button>
      </div>
      <div class="tarjeta-cuerpo">
        <span class="tarjeta-genero">${etiqueta}</span>
        <h3>${j.titulo}</h3>
        <p class="tarjeta-dev">${j.dev} · ${j.anio}</p>
        <div class="estrellas">${estrellasHTML(j.rating || 0)}</div>
        <div class="tarjeta-footer">
          ${precioHTML}
          <button class="btn-agregar${enCart ? ' en-carrito' : ''}" data-id="${j.id}">
            ${enCart ? '✓ Agregado' : '+ Agregar'}
          </button>
        </div>
      </div>
    </article>`;
}
