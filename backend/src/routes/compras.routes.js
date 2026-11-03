"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const compras_controller_1 = require("../controllers/compras.controller");
const router = (0, express_1.Router)();
router.get('/', compras_controller_1.obtenerCompras);
router.get('/:id', compras_controller_1.obtenerCompraPorId);
router.post('/', compras_controller_1.crearCompra);
router.put('/:id', compras_controller_1.actualizarCompra);
router.delete('/:id', compras_controller_1.eliminarCompra);
exports.default = router;
//# sourceMappingURL=compras.routes.js.map