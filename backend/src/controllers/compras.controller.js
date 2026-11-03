"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarCompra = exports.actualizarCompra = exports.crearCompra = exports.obtenerCompraPorId = exports.obtenerCompras = void 0;
const compra_model_1 = require("../models/compra.model");
const obtenerCompras = async (req, res, next) => {
    try {
        const compras = await compra_model_1.CompraModel.obtenerTodos();
        res.status(200).json(compras);
    }
    catch (error) {
        next(error);
    }
};
exports.obtenerCompras = obtenerCompras;
const obtenerCompraPorId = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const compra = await compra_model_1.CompraModel.obtenerPorId(id);
        if (!compra) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.status(200).json(compra);
    }
    catch (error) {
        next(error);
    }
};
exports.obtenerCompraPorId = obtenerCompraPorId;
const crearCompra = async (req, res, next) => {
    try {
        const compra = await compra_model_1.CompraModel.crear(req.body);
        res.status(201).json(compra);
    }
    catch (error) {
        next(error);
    }
};
exports.crearCompra = crearCompra;
const actualizarCompra = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const compra = await compra_model_1.CompraModel.actualizar(id, req.body);
        if (!compra) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.status(200).json(compra);
    }
    catch (error) {
        next(error);
    }
};
exports.actualizarCompra = actualizarCompra;
const eliminarCompra = async (req, res, next) => {
    try {
        const eliminado = await compra_model_1.CompraModel.eliminar(Number(req.params.id));
        if (!eliminado) {
            return res.status(404).json({ message: 'Compra no encontrada' });
        }
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.eliminarCompra = eliminarCompra;
//# sourceMappingURL=compras.controller.js.map