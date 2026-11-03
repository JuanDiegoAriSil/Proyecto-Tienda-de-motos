"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const clientes_controller_1 = require("../controllers/clientes.controller");
const router = (0, express_1.Router)();
router.get('/', clientes_controller_1.obtenerClientes);
router.get('/:id', clientes_controller_1.obtenerClientePorId);
router.post('/', clientes_controller_1.crearCliente);
router.put('/:id', clientes_controller_1.actualizarCliente);
router.delete('/:id', clientes_controller_1.eliminarCliente);
exports.default = router;
//# sourceMappingURL=clientes.routes.js.map