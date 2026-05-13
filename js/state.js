'use strict';

/* =============================================
   MÓDULO: state.js
   Responsabilidad: estado compartido y mutable
   de toda la aplicación.

   Por qué existe: centralizar el estado evita
   que cada módulo declare sus propias variables
   globales. Cualquier cambio al estado es visible
   para todos los módulos que importan este archivo
   gracias a que Map, Set y objetos se pasan por
   referencia en JavaScript.

   Exporta:
     carrito   — Map (clave = id, valor = objeto juego)
     favoritos — Set (solo ids, sin duplicados)
     estado    — objeto con variables de control de la UI

   No importa ningún otro módulo.
   ============================================= */

/* CLASE 6 — Variables y estado
   Consigna: uso de const y let según si el valor
   cambia o no. const = no se reasigna, let = sí.
   Map y Set son estructuras de datos nativas de ES6. */

/* Map: clave=id, valor=objeto juego. Evita duplicados */
export const carrito = new Map();

/* Set: solo valores únicos, sin repetir ids */
export const favoritos = new Set();

/* Objeto mutable compartido: las propiedades pueden
   cambiar libremente desde cualquier módulo importador.
   Usar un objeto en lugar de múltiples variables sueltas
   facilita ver de un vistazo todo el estado de la app. */
export const estado = {
  filtroActual:     'todos',   /* género activo en la barra inferior */
  terminoActual:    '',        /* texto de búsqueda activo */
  ordenActual:      'default', /* criterio de ordenamiento */
  historialCompras: [],        /* array de compras realizadas */
  juegoModalActual: null,      /* juego mostrado en el modal de detalle */
};
