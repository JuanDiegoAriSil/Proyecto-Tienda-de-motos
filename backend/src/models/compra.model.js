"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CompraModel = void 0;
const database_1 = require("../config/database");
class CompraModel {
    // CONSULTAR TODAS LAS COMPRAS
    static async obtenerTodos() {
        const resultado = await database_1.pool.query('SELECT * FROM compras ORDER BY id ASC');
        return resultado.rows;
    }
    // CONSULTAR COMPRA POR ID
    static async obtenerPorId(id) {
        const resultado = await database_1.pool.query('SELECT * FROM compras WHERE id = $1', [id]);
        return resultado.rows[0] || null;
    }
    // CREAR UNA COMPRA
    static async crear(compra) {
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
        const resultado = await database_1.pool.query(consulta, valores);
        const nuevaCompra = resultado.rows[0];
        if (!nuevaCompra) {
            throw new Error('No se pudo crear la compra');
        }
        return nuevaCompra;
    }
    // ACTUALIZAR UNA COMPRA
    static async actualizar(id, compra) {
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
        const resultado = await database_1.pool.query(consulta, valores);
        return resultado.rows[0] || null;
    }
    // ELIMINAR UNA COMPRA
    static async eliminar(id) {
        const resultado = await database_1.pool.query('DELETE FROM compras WHERE id = $1 RETURNING id', [id]);
        return (resultado.rowCount ?? 0) > 0;
    }
}
exports.CompraModel = CompraModel;
//# sourceMappingURL=compra.model.js.map