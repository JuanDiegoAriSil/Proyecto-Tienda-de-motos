"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.crearVenta = exports.obtenerVentaPorId = exports.obtenerVentas = void 0;
const venta_model_1 = require("../models/venta.model");
// CONSULTAR TODAS LAS VENTAS
const obtenerVentas = async (req, res, next) => {
    try {
        const ventas = await venta_model_1.VentaModel.obtenerTodos();
        res.status(200).json(ventas);
    }
    catch (error) {
        next(error);
    }
};
exports.obtenerVentas = obtenerVentas;
// CONSULTAR VENTA POR ID
const obtenerVentaPorId = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({
                message: 'ID de venta inválido'
            });
            return;
        }
        const venta = await venta_model_1.VentaModel.obtenerPorId(id);
        if (!venta) {
            res.status(404).json({
                message: 'Venta no encontrada'
            });
            return;
        }
        res.status(200).json(venta);
    }
    catch (error) {
        next(error);
    }
};
exports.obtenerVentaPorId = obtenerVentaPorId;
// REGISTRAR UNA VENTA
const crearVenta = async (req, res, next) => {
    try {
        const datos = req.body;
        if (!datos ||
            !Number.isInteger(datos.cliente_id) ||
            datos.cliente_id <= 0 ||
            !Array.isArray(datos.productos) ||
            datos.productos.length === 0) {
            res.status(400).json({
                message: 'Cliente y productos son obligatorios'
            });
            return;
        }
        const ids = new Set();
        for (const producto of datos.productos) {
            if (!producto ||
                !Number.isInteger(producto.producto_id) ||
                producto.producto_id <= 0 ||
                !Number.isInteger(producto.cantidad) ||
                producto.cantidad <= 0) {
                res.status(400).json({
                    message: 'Producto o cantidad inválida'
                });
                return;
            }
            if (ids.has(producto.producto_id)) {
                res.status(400).json({
                    message: 'No se permite repetir un producto'
                });
                return;
            }
            ids.add(producto.producto_id);
        }
        const venta = await venta_model_1.VentaModel.crear(datos);
        res.status(201).json(venta);
    }
    catch (error) {
        if (error instanceof venta_model_1.ErrorVenta) {
            res.status(error.status).json({
                message: error.message
            });
            return;
        }
        next(error);
    }
};
exports.crearVenta = crearVenta;
//# sourceMappingURL=ventas.controller.js.map