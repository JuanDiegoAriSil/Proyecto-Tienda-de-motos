
import { pool } from '../config/database';

export interface Producto {
  id?: number;
  nombre: string;
  descripcion?: string;
  marca: string;
  categoria: string;
  precio: number;
  fecha_creacion?: Date;
}

export class ProductoModel {

  // CONSULTAR TODOS LOS PRODUCTOS
  static async obtenerTodos(): Promise<Producto[]> {

    const resultado = await pool.query<Producto>(
      'SELECT * FROM productos ORDER BY id ASC'
    );

    return resultado.rows;
  }

  // CONSULTAR PRODUCTO POR ID
  static async obtenerPorId(
    id: number
  ): Promise<Producto | null> {

    const resultado = await pool.query<Producto>(
      'SELECT * FROM productos WHERE id = $1',
      [id]
    );

    return resultado.rows[0] || null;
  }

  // CREAR UN PRODUCTO
  static async crear(
    producto: Producto
  ): Promise<Producto> {

    const consulta = `
      INSERT INTO productos
      (nombre, descripcion, marca, categoria, precio, fecha_creacion)
      VALUES ($1, $2, $3, $4, $5, NOW())
      RETURNING *
    `;

    const valores = [
      producto.nombre,
      producto.descripcion ?? null,
      producto.marca,
      producto.categoria,
      producto.precio
    ];

    const resultado = await pool.query<Producto>(
      consulta,
      valores
    );

    const nuevoProducto = resultado.rows[0];

    if (!nuevoProducto) {
      throw new Error('No se pudo crear el producto');
    }

    return nuevoProducto;
  }

  // ACTUALIZAR UN PRODUCTO
  static async actualizar(
    id: number,
    producto: Producto
  ): Promise<Producto | null> {

    const consulta = `
      UPDATE productos
      SET
        nombre = $1,
        descripcion = $2,
        marca = $3,
        categoria = $4,
        precio = $5
      WHERE id = $6
      RETURNING *
    `;

    const valores = [
      producto.nombre,
      producto.descripcion ?? null,
      producto.marca,
      producto.categoria,
      producto.precio,
      id
    ];

    const resultado = await pool.query<Producto>(
      consulta,
      valores
    );

    return resultado.rows[0] || null;
  }

  // ELIMINAR UN PRODUCTO
  static async eliminar(
    id: number
  ): Promise<boolean> {

    const resultado = await pool.query(
      'DELETE FROM productos WHERE id = $1 RETURNING id',
      [id]
    );

    return (resultado.rowCount ?? 0) > 0;
  }
}
