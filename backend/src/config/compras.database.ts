import type { Compra } from '../models/compra.model';

export const comprasDB: Compra[] = [
  {
    id: 1,
    producto: 'Casco integral',
    cantidad: 5,
    proveedor: 'Distribuidora Moto',
    precio_unitario: 55,
    fecha_compra: new Date('2026-10-05T18:00:00.000Z')
  },
  {
    id: 2,
    producto: 'Guantes touring',
    cantidad: 10,
    proveedor: 'Accesorios del Camino',
    precio_unitario: 18.5,
    fecha_compra: new Date('2026-10-05T18:05:00.000Z')
  }
];

let siguienteId = comprasDB.length + 1;

export const obtenerSiguienteIdCompra = (): number => {
  const id = siguienteId;
  siguienteId += 1;

  return id;
};
