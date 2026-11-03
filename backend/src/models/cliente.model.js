"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteModel = void 0;
const database_1 = require("../config/database");
class ClienteModel {
    // CONSULTAR TODOS LOS CLIENTES
    static async obtenerTodos() {
        const resultado = await database_1.pool.query('SELECT * FROM clientes ORDER BY id ASC');
        return resultado.rows;
    }
    // CONSULTAR CLIENTE POR ID
    static async obtenerPorId(id) {
        const resultado = await database_1.pool.query('SELECT * FROM clientes WHERE id = $1', [id]);
        return resultado.rows[0] || null;
    }
    // CREAR UN CLIENTE
    static async crear(cliente) {
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
        const resultado = await database_1.pool.query(consulta, valores);
        return resultado.rows[0];
    }
    // ACTUALIZAR UN CLIENTE
    static async actualizar(id, cliente) {
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
        const resultado = await database_1.pool.query(consulta, valores);
        return resultado.rows[0] || null;
    }
    // ELIMINAR UN CLIENTE
    static async eliminar(id) {
        const resultado = await database_1.pool.query('DELETE FROM clientes WHERE id = $1 RETURNING id', [id]);
        return (resultado.rowCount ?? 0) > 0;
    }
}
exports.ClienteModel = ClienteModel;
//# sourceMappingURL=cliente.model.js.map