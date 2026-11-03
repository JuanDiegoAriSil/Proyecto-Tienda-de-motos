"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarRegistroInventario = exports.actualizarRegistroInventario = exports.crearRegistroInventario = exports.obtenerRegistroInventarioPorId = exports.obtenerInventario = void 0;
const inventario_model_1 = require("../models/inventario.model");
// VALIDAR IDENTIFICADOR
const idValido = (id) => {
    return Number.isSafeInteger(id) && Number(id) > 0;
};
// VALIDAR DATOS DEL INVENTARIO
const validarInventario = (datos) => {
    if (!datos || typeof datos !== 'object') {
        return 'Los datos del inventario son obligatorios';
    }
    if (!idValido(datos.producto_id)) {
        return 'El producto_id debe ser un número entero positivo';
    }
    if (!Number.isSafeInteger(datos.cantidad) ||
        datos.cantidad < 0) {
        return 'La cantidad debe ser un número entero mayor o igual a cero';
    }
    if (datos.ubicacion !== undefined &&
        typeof datos.ubicacion !== 'string') {
        return 'La ubicación debe ser un texto';
    }
    return null;
};
// CONSULTAR TODO EL INVENTARIO
const obtenerInventario = async (req, res, next) => {
    try {
        const inventario = await inventario_model_1.InventarioModel.obtenerTodos();
        res.status(200).json(inventario);
    }
    catch (error) {
        next(error);
    }
};
exports.obtenerInventario = obtenerInventario;
// CONSULTAR REGISTRO POR ID
const obtenerRegistroInventarioPorId = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!idValido(id)) {
            res.status(400).json({
                message: 'ID de inventario inválido'
            });
            return;
        }
        const registro = await inventario_model_1.InventarioModel.obtenerPorId(id);
        if (!registro) {
            res.status(404).json({
                message: 'Registro de inventario no encontrado'
            });
            return;
        }
        res.status(200).json(registro);
    }
    catch (error) {
        next(error);
    }
};
exports.obtenerRegistroInventarioPorId = obtenerRegistroInventarioPorId;
// CREAR REGISTRO DE INVENTARIO
const crearRegistroInventario = async (req, res, next) => {
    try {
        const errorValidacion = validarInventario(req.body);
        if (errorValidacion) {
            res.status(400).json({
                message: errorValidacion
            });
            return;
        }
        // VERIFICAR QUE EL PRODUCTO EXISTA
        const producto = await inventario_model_1.InventarioModel.verificarProducto(req.body.producto_id);
        if (!producto) {
            res.status(404).json({
                message: 'El producto indicado no existe'
            });
            return;
        }
        const registro = await inventario_model_1.InventarioModel.crear(req.body);
        res.status(201).json(registro);
    }
    catch (error) {
        next(error);
    }
};
exports.crearRegistroInventario = crearRegistroInventario;
// ACTUALIZAR REGISTRO DE INVENTARIO
const actualizarRegistroInventario = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!idValido(id)) {
            res.status(400).json({
                message: 'ID de inventario inválido'
            });
            return;
        }
        const errorValidacion = validarInventario(req.body);
        if (errorValidacion) {
            res.status(400).json({
                message: errorValidacion
            });
            return;
        }
        // VERIFICAR QUE EL REGISTRO EXISTA
        const existente = await inventario_model_1.InventarioModel.obtenerPorId(id);
        if (!existente) {
            res.status(404).json({
                message: 'Registro de inventario no encontrado'
            });
            return;
        }
        // VERIFICAR QUE EL PRODUCTO EXISTA
        const producto = await inventario_model_1.InventarioModel.verificarProducto(req.body.producto_id);
        if (!producto) {
            res.status(404).json({
                message: 'El producto indicado no existe'
            });
            return;
        }
        const registro = await inventario_model_1.InventarioModel.actualizar(id, req.body);
        if (!registro) {
            res.status(404).json({
                message: 'No se pudo actualizar el inventario'
            });
            return;
        }
        res.status(200).json(registro);
    }
    catch (error) {
        next(error);
    }
};
exports.actualizarRegistroInventario = actualizarRegistroInventario;
// ELIMINAR REGISTRO DE INVENTARIO
const eliminarRegistroInventario = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!idValido(id)) {
            res.status(400).json({
                message: 'ID de inventario inválido'
            });
            return;
        }
        const eliminado = await inventario_model_1.InventarioModel.eliminar(id);
        if (!eliminado) {
            res.status(404).json({
                message: 'Registro de inventario no encontrado'
            });
            return;
        }
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.eliminarRegistroInventario = eliminarRegistroInventario;
//# sourceMappingURL=inventario.controller.js.map