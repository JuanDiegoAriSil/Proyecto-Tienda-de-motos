
import { pool } from '../config/database';

export interface Inventario {
  id?: number;
  producto_id: number;
  producto?: string;
  cantidad: number;
  ubicacion?: string;
  fecha_actualizacion?: Date;
}

export class InventarioModel {

  // CONSULTAR TODO EL INVENTARIO
  static async obtenerTodos(): Promise<Inventario[]> {

    const resultado = await pool.query<Inventario>(`
      SELECT
        i.id,
        i.producto_id,
        p.nombre AS producto,
        i.cantidad,
        i.ubicacion,
        i.fecha_actualizacion
      FROM inventario i
      INNER JOIN productos p
        ON p.id = i.producto_id
      ORDER BY i.id ASC
    `);

    return resultado.rows;
  }

  // CONSULTAR INVENTARIO POR ID
  static async obtenerPorId(
    id: number
  ): Promise<Inventario | null> {

    const resultado = await pool.query<Inventario>(`
      SELECT
        i.id,
        i.producto_id,
        p.nombre AS producto,
        i.cantidad,
        i.ubicacion,
        i.fecha_actualizacion
      FROM inventario i
      INNER JOIN productos p
        ON p.id = i.producto_id
      WHERE i.id = $1::INTEGER
    `, [id]);

    return resultado.rows[0] || null;
  }

  // CREAR REGISTRO DE INVENTARIO
  static async crear(
    registro: Inventario
  ): Promise<Inventario> {

    const resultado = await pool.query<Inventario>(`
      INSERT INTO inventario
      (
        producto_id,
        producto,
        cantidad,
        ubicacion,
        fecha_actualizacion
      )
      SELECT
        p.id,
        p.nombre,
        $2::INTEGER,
        $3::TEXT,
        NOW()
      FROM productos p
      WHERE p.id = $1::INTEGER
      RETURNING *
    `, [
      registro.producto_id,
      registro.cantidad,
      registro.ubicacion ?? ''
    ]);

    const inventario = resultado.rows[0];

    if (!inventario) {
      throw new Error(
        'No se pudo crear el inventario. Verifica el producto_id.'
      );
    }

    return inventario;
  }

  // ACTUALIZAR REGISTRO DE INVENTARIO
  static async actualizar(
    id: number,
    registro: Inventario
  ): Promise<Inventario | null> {

    const resultado = await pool.query<Inventario>(`
      UPDATE inventario i
      SET
        producto_id = p.id,
        producto = p.nombre,
        cantidad = $2::INTEGER,
        ubicacion = $3::TEXT,
        fecha_actualizacion = NOW()
      FROM productos p
      WHERE i.id = $4::INTEGER
        AND p.id = $1::INTEGER
      RETURNING i.*
    `, [
      registro.producto_id,
      registro.cantidad,
      registro.ubicacion ?? '',
      id
    ]);

    return resultado.rows[0] || null;
  }

  // ELIMINAR REGISTRO DE INVENTARIO
  static async eliminar(
    id: number
  ): Promise<boolean> {

    const resultado = await pool.query(`
      DELETE FROM inventario
      WHERE id = $1::INTEGER
      RETURNING id
    `, [id]);

    return (resultado.rowCount ?? 0) > 0;
  }
  
  // VERIFICAR SI UN PRODUCTO EXISTE
  static async verificarProducto(
    productoId: number
  ): Promise<boolean> {

    const resultado = await pool.query(
      `
        SELECT id
        FROM productos
        WHERE id = $1::INTEGER
      `,
      [productoId]
    );

    return resultado.rows.length > 0;
  }

}
