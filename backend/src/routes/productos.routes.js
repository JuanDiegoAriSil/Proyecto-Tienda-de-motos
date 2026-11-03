"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const productos_controller_1 = require("../controllers/productos.controller");
const router = (0, express_1.Router)();
router.get('/', productos_controller_1.obtenerProductos);
router.get('/:id', productos_controller_1.obtenerProductoPorId);
router.post('/', productos_controller_1.crearProducto);
router.put('/:id', productos_controller_1.actualizarProducto);
router.delete('/:id', productos_controller_1.eliminarProducto);
exports.default = router;
//# sourceMappingURL=productos.routes.js.map