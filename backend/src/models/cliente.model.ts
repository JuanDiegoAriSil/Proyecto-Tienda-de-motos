
import { pool } from '../config/database';

export interface Cliente {
  id?: number;
  nombre: string;
  apellido: string;
  edad?: number;
  sexo?: string;
  email: string;
  fecha_creacion?: Date;
}

export class ClienteModel {

  // CONSULTAR TODOS LOS CLIENTES
  static async obtenerTodos(): Promise<Cliente[]> {
    const resultado = await pool.query<Cliente>(
      'SELECT * FROM clientes ORDER BY id ASC'
    );

    return resultado.rows;
  }

  // CONSULTAR CLIENTE POR ID
  static async obtenerPorId(
    id: number
  ): Promise<Cliente | null> {

    const resultado = await pool.query<Cliente>(
      'SELECT * FROM clientes WHERE id = $1',
      [id]
    );

    return resultado.rows[0] || null;
  }

  // CREAR UN CLIENTE
  static async crear(
    cliente: Cliente
  ): Promise<Cliente> {

    const consulta = `
      INSERT INTO clientes
      (nombre, apellido, edad, sexo, email, fecha_creacion)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *
    `;

    const valores = [
      cliente.nombre,
      cliente.apellido,
      cliente.edad ?? null,
      cliente.sexo ?? null,
      cliente.email
    ];

    const resultado = await pool.query<Cliente>(
      consulta,
      valores
    );

    return resultado.rows[0]!;
  }

  // ACTUALIZAR UN CLIENTE
  static async actualizar(
    id: number,
    cliente: Cliente
  ): Promise<Cliente | null> {

    const consulta = `
      UPDATE clientes
      SET
        nombre = $1,
        apellido = $2,
        edad = $3,
        sexo = $4,
        email = $5
      WHERE id = $6
      RETURNING *
    `;

    const valores = [
      cliente.nombre,
      cliente.apellido,
      cliente.edad ?? null,
      cliente.sexo ?? null,
      cliente.email,
      id
    ];

    const resultado = await pool.query<Cliente>(
      consulta,
      valores
    );

    return resultado.rows[0] || null;
  }

  // ELIMINAR UN CLIENTE
  static async eliminar(
    id: number
  ): Promise<boolean> {

    const resultado = await pool.query(
      'DELETE FROM clientes WHERE id = $1 RETURNING id',
      [id]
    );

    return (resultado.rowCount ?? 0) > 0;
  }
}
