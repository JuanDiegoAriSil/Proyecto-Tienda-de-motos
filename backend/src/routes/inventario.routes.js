"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const inventario_controller_1 = require("../controllers/inventario.controller");
const router = (0, express_1.Router)();
router.get('/', inventario_controller_1.obtenerInventario);
router.get('/:id', inventario_controller_1.obtenerRegistroInventarioPorId);
router.post('/', inventario_controller_1.crearRegistroInventario);
router.put('/:id', inventario_controller_1.actualizarRegistroInventario);
router.delete('/:id', inventario_controller_1.eliminarRegistroInventario);
exports.default = router;
//# sourceMappingURL=inventario.routes.js.map