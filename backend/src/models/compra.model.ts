
import { pool } from '../config/database';

export interface Compra {
  id?: number;
  producto: string;
  cantidad: number;
  proveedor: string;
  precio_unitario: number;
  fecha_compra?: Date;
}

export class CompraModel {

  // CONSULTAR TODAS LAS COMPRAS
  static async obtenerTodos(): Promise<Compra[]> {
    const resultado = await pool.query<Compra>(
      'SELECT * FROM compras ORDER BY id ASC'
    );

    return resultado.rows;
  }

  // CONSULTAR COMPRA POR ID
  static async obtenerPorId(
    id: number
  ): Promise<Compra | null> {

    const resultado = await pool.query<Compra>(
      'SELECT * FROM compras WHERE id = $1',
      [id]
    );

    return resultado.rows[0] || null;
  }

  // CREAR UNA COMPRA
  static async crear(
    compra: Compra
  ): Promise<Compra> {

    const consulta = `
      INSERT INTO compras
      (producto, cantidad, proveedor, precio_unitario, fecha_compra)
      VALUES ($1, $2, $3, $4, NOW())
      RETURNING *
    `;

    const valores = [
      compra.producto,
      compra.cantidad,
      compra.proveedor,
      compra.precio_unitario
    ];

    const resultado = await pool.query<Compra>(
      consulta,
      valores
    );

    const nuevaCompra = resultado.rows[0];

    if (!nuevaCompra) {
      throw new Error('No se pudo crear la compra');
    }

    return nuevaCompra;
  }

  // ACTUALIZAR UNA COMPRA
  static async actualizar(
    id: number,
    compra: Compra
  ): Promise<Compra | null> {

    const consulta = `
      UPDATE compras
      SET
        producto = $1,
        cantidad = $2,
        proveedor = $3,
        precio_unitario = $4
      WHERE id = $5
      RETURNING *
    `;

    const valores = [
      compra.producto,
      compra.cantidad,
      compra.proveedor,
      compra.precio_unitario,
      id
    ];

    const resultado = await pool.query<Compra>(
      consulta,
      valores
    );

    return resultado.rows[0] || null;
  }

  // ELIMINAR UNA COMPRA
  static async eliminar(
    id: number
  ): Promise<boolean> {

    const resultado = await pool.query(
      'DELETE FROM compras WHERE id = $1 RETURNING id',
      [id]
    );

    return (resultado.rowCount ?? 0) > 0;
  }
}
