
import 'dotenv/config';
import { Pool } from 'pg';

export const pool = new Pool({
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT || 5432),
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
});

export async function conectarDB(): Promise<void> {
  try {
    const resultado = await pool.query(
      'SELECT current_database() AS base_datos'
    );

    console.log('PostgreSQL conectado correctamente');
    console.log('Base de datos:', resultado.rows[0].base_datos);

  } catch (error) {
    console.error('Error de conexión a PostgreSQL:', error);
    throw error;
  }
}
