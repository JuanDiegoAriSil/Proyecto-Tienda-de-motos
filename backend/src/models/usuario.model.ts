
import { pool } from '../config/database';

export interface Usuario {
  id?: number;
  email: string;
  password_hash: string;
}

export class UsuarioModel {

  // BUSCAR USUARIO POR EMAIL
  static async obtenerPorEmail(
    email: string
  ): Promise<Usuario | null> {

    const resultado = await pool.query<Usuario>(
      'SELECT * FROM usuarios WHERE email = $1',
      [email]
    );

    return resultado.rows[0] ?? null;
  }

  // CREAR USUARIO
  static async crear(
    email: string,
    passwordHash: string
  ): Promise<{ id: number; email: string }> {

    const resultado = await pool.query(
      `INSERT INTO usuarios (email, password_hash)
       VALUES ($1, $2)
       RETURNING id, email`,
      [email, passwordHash]
    );

    return resultado.rows[0];
  }
}
