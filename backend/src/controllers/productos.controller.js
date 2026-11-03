"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarProducto = exports.actualizarProducto = exports.crearProducto = exports.obtenerProductoPorId = exports.obtenerProductos = void 0;
const producto_model_1 = require("../models/producto.model");
const obtenerProductos = async (req, res, next) => {
    try {
        const productos = await producto_model_1.ProductoModel.obtenerTodos();
        res.status(200).json(productos);
    }
    catch (error) {
        next(error);
    }
};
exports.obtenerProductos = obtenerProductos;
const obtenerProductoPorId = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const producto = await producto_model_1.ProductoModel.obtenerPorId(id);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    }
    catch (error) {
        next(error);
    }
};
exports.obtenerProductoPorId = obtenerProductoPorId;
const crearProducto = async (req, res, next) => {
    try {
        const producto = await producto_model_1.ProductoModel.crear(req.body);
        res.status(201).json(producto);
    }
    catch (error) {
        next(error);
    }
};
exports.crearProducto = crearProducto;
const actualizarProducto = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const producto = await producto_model_1.ProductoModel.actualizar(id, req.body);
        if (!producto) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(200).json(producto);
    }
    catch (error) {
        next(error);
    }
};
exports.actualizarProducto = actualizarProducto;
const eliminarProducto = async (req, res, next) => {
    try {
        const eliminado = await producto_model_1.ProductoModel.eliminar(Number(req.params.id));
        if (!eliminado) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.eliminarProducto = eliminarProducto;
//# sourceMappingURL=productos.controller.js.map