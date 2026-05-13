'use strict';

/* =============================================
   MÓDULO: storage.js
   Responsabilidad: persistencia de datos con
   localStorage usando claves centralizadas (STORAGE_KEYS).

   Por qué existe: aislar el código de almacenamiento
   permite cambiar la estrategia de persistencia
   (sessionStorage, IndexedDB, API remota) sin tocar
   el resto de la aplicación.

   Exporta: guardarEstado, cargarEstado

   Importa:
     data.js    — para buscar juegos por id al cargar
     state.js   — estado global (carrito, favoritos, historial)
     helpers.js — actualización de badges
     dom.js     — elementos del header
   ============================================= */

import { JUEGOS } from './data.js';
import { carrito, favoritos, estado } from './state.js';
import { actualizarBadge } from './helpers.js';
import { carritoContador, favoritosContador } from './dom.js';

/* CLASE 7 — Centralización de storage keys */
const STORAGE_KEYS = {
  CARRITO: 'gameplus_carrito',
  FAVORITOS: 'gameplus_favoritos',
  HISTORIAL: 'gameplus_historial'
};

export function guardarEstado() {
  try {
    localStorage.setItem(
      STORAGE_KEYS.CARRITO,
      JSON.stringify([...carrito.keys()])
    );

    localStorage.setItem(
      STORAGE_KEYS.FAVORITOS,
      JSON.stringify([...favoritos])
    );

    localStorage.setItem(
      STORAGE_KEYS.HISTORIAL,
      JSON.stringify(estado.historialCompras)
    );
  } catch (e) {
    /* cuota excedida o modo privado */
  }
}

export function cargarEstado() {
  try {
    const idsCarrito = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.CARRITO) || '[]'
    );

    const idsFav = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.FAVORITOS) || '[]'
    );

    idsCarrito.forEach(id => {
      const j = JUEGOS.find(x => x.id === id);
      if (j) carrito.set(id, j);
    });

    idsFav.forEach(id => favoritos.add(id));

    estado.historialCompras = JSON.parse(
      localStorage.getItem(STORAGE_KEYS.HISTORIAL) || '[]'
    );

    actualizarBadge(carritoContador, carrito.size);
    actualizarBadge(favoritosContador, favoritos.size);

  } catch (e) {
    /* datos corruptos */
  }
}