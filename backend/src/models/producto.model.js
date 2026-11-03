"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductoModel = void 0;
const database_1 = require("../config/database");
class ProductoModel {
    // CONSULTAR TODOS LOS PRODUCTOS
    static async obtenerTodos() {
        const resultado = await database_1.pool.query('SELECT * FROM productos ORDER BY id ASC');
        return resultado.rows;
    }
    // CONSULTAR PRODUCTO POR ID
    static async obtenerPorId(id) {
        const resultado = await database_1.pool.query('SELECT * FROM productos WHERE id = $1', [id]);
        return resultado.rows[0] || null;
    }
    // CREAR UN PRODUCTO
    static async crear(producto) {
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
        const resultado = await database_1.pool.query(consulta, valores);
        const nuevoProducto = resultado.rows[0];
        if (!nuevoProducto) {
            throw new Error('No se pudo crear el producto');
        }
        return nuevoProducto;
    }
    // ACTUALIZAR UN PRODUCTO
    static async actualizar(id, producto) {
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
        const resultado = await database_1.pool.query(consulta, valores);
        return resultado.rows[0] || null;
    }
    // ELIMINAR UN PRODUCTO
    static async eliminar(id) {
        const resultado = await database_1.pool.query('DELETE FROM productos WHERE id = $1 RETURNING id', [id]);
        return (resultado.rowCount ?? 0) > 0;
    }
}
exports.ProductoModel = ProductoModel;
//# sourceMappingURL=producto.model.js.map