'use strict';

/* =============================================
   MÓDULO: storage.js
   Responsabilidad: persistencia de datos con
   localStorage.

   Por qué existe: aislar el código de almacenamiento
   permite cambiar la estrategia de persistencia
   (sessionStorage, IndexedDB, API remota) sin tocar
   el resto de la aplicación.

   Exporta: guardarEstado, cargarEstado

   Importa:
     data.js    — para buscar juegos por id al cargar
     state.js   — para leer/escribir carrito, favoritos e historial
     helpers.js — para actualizar los badges de conteo
     dom.js     — para los elementos badge del header
   ============================================= */

import { JUEGOS } from './data.js';
import { carrito, favoritos, estado } from './state.js';
import { actualizarBadge } from './helpers.js';
import { carritoContador, favoritosContador } from './dom.js';

/* CLASE 6 — Persistencia con localStorage
   Los datos del carrito, favoritos e historial
   se guardan para que persistan al recargar */

export function guardarEstado() {
  try {
    localStorage.setItem('carrito',   JSON.stringify([...carrito.keys()]));
    localStorage.setItem('favoritos', JSON.stringify([...favoritos]));
    localStorage.setItem('historial', JSON.stringify(estado.historialCompras));
  } catch (e) { /* cuota excedida o modo privado */ }
}

export function cargarEstado() {
  try {
    const idsCarrito = JSON.parse(localStorage.getItem('carrito')   || '[]');
    const idsFav     = JSON.parse(localStorage.getItem('favoritos') || '[]');

    idsCarrito.forEach(id => {
      const j = JUEGOS.find(x => x.id === id);
      if (j) carrito.set(id, j);
    });
    idsFav.forEach(id => favoritos.add(id));

    estado.historialCompras = JSON.parse(localStorage.getItem('historial') || '[]');

    actualizarBadge(carritoContador,   carrito.size);
    actualizarBadge(favoritosContador, favoritos.size);
  } catch (e) { /* datos corruptos */ }
}
