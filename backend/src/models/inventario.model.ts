
import { pool } from '../config/database';

export interface Inventario {
  id?: number;
  producto: string;
  cantidad: number;
  ubicacion?: string;
  fecha_actualizacion?: Date;
}

export class InventarioModel {

  // CONSULTAR TODO EL INVENTARIO
  static async obtenerTodos(): Promise<Inventario[]> {
    const resultado = await pool.query<Inventario>(
      'SELECT * FROM inventario ORDER BY id ASC'
    );

    return resultado.rows;
  }

  // CONSULTAR INVENTARIO POR ID
  static async obtenerPorId(
    id: number
  ): Promise<Inventario | null> {

    const resultado = await pool.query<Inventario>(
      'SELECT * FROM inventario WHERE id = $1',
      [id]
    );

    return resultado.rows[0] || null;
  }

  // CREAR UN REGISTRO DE INVENTARIO
  static async crear(
    registro: Inventario
  ): Promise<Inventario> {

    const consulta = `
      INSERT INTO inventario
      (producto, cantidad, ubicacion, fecha_actualizacion)
      VALUES ($1, $2, $3, NOW())
      RETURNING *
    `;

    const valores = [
      registro.producto,
      registro.cantidad,
      registro.ubicacion ?? ''
    ];

    const resultado = await pool.query<Inventario>(
      consulta,
      valores
    );

    const nuevoRegistro = resultado.rows[0];

    if (!nuevoRegistro) {
      throw new Error('No se pudo crear el registro de inventario');
    }

    return nuevoRegistro;
  }

  // ACTUALIZAR UN REGISTRO DE INVENTARIO
  static async actualizar(
    id: number,
    registro: Inventario
  ): Promise<Inventario | null> {

    const consulta = `
      UPDATE inventario
      SET
        producto = $1,
        cantidad = $2,
        ubicacion = $3,
        fecha_actualizacion = NOW()
      WHERE id = $4
      RETURNING *
    `;

    const valores = [
      registro.producto,
      registro.cantidad,
      registro.ubicacion ?? '',
      id
    ];

    const resultado = await pool.query<Inventario>(
      consulta,
      valores
    );

    return resultado.rows[0] || null;
  }

  // ELIMINAR UN REGISTRO DE INVENTARIO
  static async eliminar(
    id: number
  ): Promise<boolean> {

    const resultado = await pool.query(
      'DELETE FROM inventario WHERE id = $1 RETURNING id',
      [id]
    );

    return (resultado.rowCount ?? 0) > 0;
  }
}
