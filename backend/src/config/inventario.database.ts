import type { Inventario } from '../models/inventario.model';

export const inventarioDB: Inventario[] = [
  {
    id: 1,
    producto: 'Casco integral',
    cantidad: 15,
    ubicacion: 'Estante A1',
    fecha_actualizacion: new Date('2026-10-05T18:00:00.000Z')
  },
  {
    id: 2,
    producto: 'Guantes touring',
    cantidad: 24,
    ubicacion: 'Estante B2',
    fecha_actualizacion: new Date('2026-10-05T18:05:00.000Z')
  }
];

let siguienteId = inventarioDB.length + 1;

export const obtenerSiguienteIdInventario = (): number => {
  const id = siguienteId;
  siguienteId += 1;

  return id;
};
