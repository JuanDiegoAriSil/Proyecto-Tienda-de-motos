"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarCliente = exports.actualizarCliente = exports.crearCliente = exports.obtenerClientePorId = exports.obtenerClientes = void 0;
const cliente_model_1 = require("../models/cliente.model");
const obtenerClientes = async (req, res, next) => {
    try {
        const clientes = await cliente_model_1.ClienteModel.obtenerTodos();
        res.status(200).json(clientes);
    }
    catch (error) {
        next(error);
    }
};
exports.obtenerClientes = obtenerClientes;
const obtenerClientePorId = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const cliente = await cliente_model_1.ClienteModel.obtenerPorId(id);
        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente no encontrado'
            });
        }
        res.status(200).json(cliente);
    }
    catch (error) {
        next(error);
    }
};
exports.obtenerClientePorId = obtenerClientePorId;
const crearCliente = async (req, res, next) => {
    try {
        const cliente = await cliente_model_1.ClienteModel.crear(req.body);
        res.status(201).json(cliente);
    }
    catch (error) {
        next(error);
    }
};
exports.crearCliente = crearCliente;
const actualizarCliente = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const cliente = await cliente_model_1.ClienteModel.actualizar(id, req.body);
        if (!cliente) {
            return res.status(404).json({
                message: 'Cliente no encontrado'
            });
        }
        res.status(200).json(cliente);
    }
    catch (error) {
        next(error);
    }
};
exports.actualizarCliente = actualizarCliente;
const eliminarCliente = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        const eliminado = await cliente_model_1.ClienteModel.eliminar(id);
        if (!eliminado) {
            return res.status(404).json({
                message: 'Cliente no encontrado'
            });
        }
        res.status(204).send();
    }
    catch (error) {
        next(error);
    }
};
exports.eliminarCliente = eliminarCliente;
//# sourceMappingURL=clientes.controller.js.map