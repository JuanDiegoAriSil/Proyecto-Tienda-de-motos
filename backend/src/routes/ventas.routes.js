"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const ventas_controller_1 = require("../controllers/ventas.controller");
const router = (0, express_1.Router)();
router.get('/', ventas_controller_1.obtenerVentas);
router.get('/:id', ventas_controller_1.obtenerVentaPorId);
router.post('/', ventas_controller_1.crearVenta);
exports.default = router;
//# sourceMappingURL=ventas.routes.js.map