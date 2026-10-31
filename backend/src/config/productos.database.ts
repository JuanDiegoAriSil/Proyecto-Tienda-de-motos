import type { Producto } from '../models/producto.model';

export const productosDB: Producto[] = [
  {
    id: 1,
    nombre: 'Casco integral',
    descripcion: 'Casco integral certificado para motociclista',
    marca: 'Rider',
    categoria: 'Proteccion',
    precio: 89.99,
    fecha_creacion: new Date('2026-10-05T18:00:00.000Z')
  },
  {
    id: 2,
    nombre: 'Guantes touring',
    descripcion: 'Guantes para conduccion en carretera',
    marca: 'MotoPro',
    categoria: 'Ropa',
    precio: 34.5,
    fecha_creacion: new Date('2026-10-05T18:05:00.000Z')
  }
];

let siguienteId = productosDB.length + 1;

export const obtenerSiguienteIdProducto = (): number => {
  const id = siguienteId;
  siguienteId += 1;

  return id;
};
