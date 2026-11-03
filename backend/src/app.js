"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const clientes_routes_1 = __importDefault(require("./routes/clientes.routes"));
const productos_routes_1 = __importDefault(require("./routes/productos.routes"));
const inventario_routes_1 = __importDefault(require("./routes/inventario.routes"));
const compras_routes_1 = __importDefault(require("./routes/compras.routes"));
const ventas_routes_1 = __importDefault(require("./routes/ventas.routes"));
const app = (0, express_1.default)(); // llama lo que se va usar
app.use((0, cors_1.default)()); //
app.use(express_1.default.json()); // defiene que se va a usar json
app.get('/api/v1/health', (req, res) => {
    res.json({
        status: 'OK'
    });
});
app.use(// define la ruta de clientes es lo que se tiene (menu) y lo que se va a usar (clientesRoutes)
'/api/v1/clientes', clientes_routes_1.default);
app.use('/api/v1/productos', productos_routes_1.default);
app.use('/api/v1/inventario', inventario_routes_1.default);
app.use('/api/v1/compras', compras_routes_1.default);
app.use('/api/v1/ventas', ventas_routes_1.default);
exports.default = app; // si otra clase necesista
//# sourceMappingURL=app.js.map