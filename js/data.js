'use strict';

/* =============================================
   MÓDULO: data.js (Capa de Acceso a Datos Dinámica)
   Responsabilidad: Obtener los datos desde la API de Airtable
   y exponerlos al resto de la aplicación.
   ============================================= */

export const JUEGOS = [];

export const ETIQUETAS_GENERO = {
  shooter:       'Shooter',
  rpg:           'RPG',
  accion:        'Acción',
  horror:        'Horror',
  supervivencia: 'Supervivencia',
};

/**
 * Función asíncrona que conecta con Airtable y puebla el array JUEGOS.
 */
export async function cargarJuegosDesdeAirtable() {
  const BASE_ID = 'appWu3RaCnDNne4vA'; 
  const PAT = 'patvoJmun7akGE9w9.2f95245d09daf11b41408aa953e762723e77d2878ed7add14bf5ce7d4616eeb7';
  const TABLA = 'Productos'; // Asegúrate de que tu tabla en Airtable se llame así

  const url = `https://api.airtable.com/v0/${BASE_ID}/${TABLA}`;

  try {
    const respuesta = await fetch(url, {
      headers: { Authorization: `Bearer ${PAT}` }
    });

    if (!respuesta.ok) {
      throw new Error(`Error HTTP: ${respuesta.status}`);
    }

    const datos = await respuesta.json();

    // 1. Limpiamos el array para evitar duplicados si la función se llama dos veces
    JUEGOS.length = 0; 

    // 2. Mapeo estricto de datos (Data Mapping)
    datos.records.forEach(registro => {
      const campos = registro.fields;
      
      JUEGOS.push({
        id: campos.id ? Number(campos.id) : registro.id,
        img: campos.img || '',
        imgHero: campos.imgHero || '',
        titulo: campos.titulo || 'Sin título',
        dev: campos.dev || 'Desconocido',
        anio: campos.anio ? Number(campos.anio) : null,
        genero: campos.genero || '',
        precio: campos.precio ? Number(campos.precio) : 0,
        precioOriginal: campos.precioOriginal ? Number(campos.precioOriginal) : null,
        rating: campos.rating ? Number(campos.rating) : 0,
        descripcion: campos.descripcion || ''
      });
    });

    console.info("Catálogo cargado exitosamente desde Airtable.", JUEGOS);

  } catch (error) {
    console.error("Fallo crítico en la capa de datos:", error);
  }
}