"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.VentaModel = exports.ErrorVenta = void 0;
const database_1 = require("../config/database");
class ErrorVenta extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
        this.name = 'ErrorVenta';
    }
}
exports.ErrorVenta = ErrorVenta;
class VentaModel {
    // CONSULTAR TODAS LAS VENTAS
    static async obtenerTodos() {
        const resultado = await database_1.pool.query(`
      SELECT
        v.id,
        v.cliente_id,
        c.nombre AS cliente_nombre,
        c.apellido AS cliente_apellido,
        v.fecha_venta,
        v.total
      FROM ventas v
      INNER JOIN clientes c
        ON c.id = v.cliente_id
      ORDER BY v.id DESC
    `);
        return resultado.rows;
    }
    // CONSULTAR VENTA POR ID CON SUS DETALLES
    static async obtenerPorId(id) {
        const resultado = await database_1.pool.query(`
      SELECT
        v.*,
        c.nombre AS cliente_nombre,
        c.apellido AS cliente_apellido
      FROM ventas v
      INNER JOIN clientes c
        ON c.id = v.cliente_id
      WHERE v.id = $1
    `, [id]);
        const venta = resultado.rows[0];
        if (!venta) {
            return null;
        }
        const detalles = await database_1.pool.query(`
      SELECT
        d.id,
        d.producto_id,
        p.nombre AS producto_nombre,
        d.cantidad,
        d.precio_unitario,
        d.subtotal
      FROM detalle_ventas d
      INNER JOIN productos p
        ON p.id = d.producto_id
      WHERE d.venta_id = $1
      ORDER BY d.id
    `, [id]);
        return {
            ...venta,
            productos: detalles.rows
        };
    }
    // REGISTRAR VENTA Y DESCONTAR INVENTARIO
    static async crear(datos) {
        // Validar también desde el modelo
        if (!Number.isInteger(datos?.cliente_id) ||
            datos.cliente_id <= 0 ||
            !Array.isArray(datos.productos) ||
            datos.productos.length === 0) {
            throw new ErrorVenta(400, 'Los datos de la venta son inválidos');
        }
        const ids = new Set();
        for (const item of datos.productos) {
            if (!Number.isInteger(item?.producto_id) ||
                item.producto_id <= 0 ||
                !Number.isInteger(item.cantidad) ||
                item.cantidad <= 0) {
                throw new ErrorVenta(400, 'Producto o cantidad inválida');
            }
            if (ids.has(item.producto_id)) {
                throw new ErrorVenta(400, 'No se permite repetir un producto en la venta');
            }
            ids.add(item.producto_id);
        }
        const client = await database_1.pool.connect();
        try {
            // INICIAR TRANSACCIÓN
            await client.query('BEGIN');
            // VERIFICAR CLIENTE
            const cliente = await client.query('SELECT id FROM clientes WHERE id = $1::INTEGER', [datos.cliente_id]);
            if (cliente.rows.length === 0) {
                throw new ErrorVenta(404, 'Cliente no encontrado');
            }
            // CREAR CABECERA DE VENTA
            const resultadoVenta = await client.query(`
        INSERT INTO ventas
        (cliente_id, fecha_venta, total)
        VALUES ($1::INTEGER, NOW(), 0)
        RETURNING id
      `, [datos.cliente_id]);
            const ventaId = resultadoVenta.rows[0]?.id;
            if (!ventaId) {
                throw new Error('No se pudo crear la venta');
            }
            // ORDENAR PRODUCTOS PARA BLOQUEO CONSISTENTE
            const productos = [...datos.productos].sort((a, b) => a.producto_id - b.producto_id);
            // PROCESAR CADA PRODUCTO
            for (const item of productos) {
                // CONSULTAR PRODUCTO Y PRECIO REAL
                const resultadoProducto = await client.query(`
          SELECT
            id,
            nombre,
            precio
          FROM productos
          WHERE id = $1::INTEGER
          FOR UPDATE
        `, [item.producto_id]);
                const producto = resultadoProducto.rows[0];
                if (!producto) {
                    throw new ErrorVenta(404, `Producto ${item.producto_id} no encontrado`);
                }
                // CONSULTAR INVENTARIO
                const resultadoInventario = await client.query(`
          SELECT
            id,
            cantidad
          FROM inventario
          WHERE producto_id = $1::INTEGER
          ORDER BY id
          FOR UPDATE
        `, [item.producto_id]);
                const registros = resultadoInventario.rows;
                // CALCULAR EXISTENCIAS DISPONIBLES
                const disponible = registros.reduce((total, registro) => total + registro.cantidad, 0);
                if (disponible < item.cantidad) {
                    throw new ErrorVenta(409, `Inventario insuficiente para ${producto.nombre}. ` +
                        `Disponible: ${disponible}`);
                }
                // DESCONTAR INVENTARIO POR UBICACIÓN
                let pendiente = item.cantidad;
                for (const registro of registros) {
                    if (pendiente === 0) {
                        break;
                    }
                    const descuento = Math.min(pendiente, registro.cantidad);
                    if (descuento <= 0) {
                        continue;
                    }
                    await client.query(`
            UPDATE inventario
            SET
              cantidad = cantidad - $1::INTEGER,
              fecha_actualizacion = NOW()
            WHERE id = $2::INTEGER
          `, [
                        descuento,
                        registro.id
                    ]);
                    pendiente -= descuento;
                }
                // GUARDAR DETALLE DE VENTA
                await this.crearDetalle(client, ventaId, item.producto_id, item.cantidad);
            }
            // CALCULAR Y GUARDAR TOTAL
            const resultadoTotal = await client.query(`
        UPDATE ventas
        SET total = (
          SELECT COALESCE(SUM(subtotal), 0)
          FROM detalle_ventas
          WHERE venta_id = $1::INTEGER
        )
        WHERE id = $1::INTEGER
        RETURNING total
      `, [ventaId]);
            const total = resultadoTotal.rows[0]?.total;
            if (total === undefined) {
                throw new Error('No se pudo calcular el total de la venta');
            }
            // CONFIRMAR TRANSACCIÓN
            await client.query('COMMIT');
            return {
                id: ventaId,
                cliente_id: datos.cliente_id,
                total,
                message: 'Venta registrada correctamente'
            };
        }
        catch (error) {
            // REVERTIR CAMBIOS SI FALLA LA VENTA
            await client.query('ROLLBACK');
            throw error;
        }
        finally {
            // LIBERAR CONEXIÓN
            client.release();
        }
    }
    // GUARDAR DETALLE DE VENTA
    // GUARDAR DETALLE DE VENTA
    static async crearDetalle(client, ventaId, productoId, cantidad) {
        const consulta = `
      INSERT INTO detalle_ventas
      (
        venta_id,
        producto_id,
        cantidad,
        precio_unitario
      )
      SELECT
        $1::INTEGER,
        p.id,
        $3::INTEGER,
        p.precio
      FROM productos p
      WHERE p.id = $2::INTEGER
      RETURNING
        id,
        venta_id,
        producto_id,
        cantidad,
        precio_unitario,
        subtotal
    `;
        const resultado = await client.query(consulta, [
            ventaId,
            productoId,
            cantidad
        ]);
        if (resultado.rowCount !== 1) {
            throw new Error('No se pudo registrar el detalle de la venta');
        }
    }
}
exports.VentaModel = VentaModel;
//# sourceMappingURL=venta.model.js.map