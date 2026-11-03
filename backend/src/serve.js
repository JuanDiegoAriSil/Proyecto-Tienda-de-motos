"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app_1 = __importDefault(require("./app"));
const database_1 = require("./config/database");
const PORT = Number(process.env.PORT) || 3000;
async function startServer() {
    try {
        await (0, database_1.conectarDB)();
        app_1.default.listen(PORT, '0.0.0.0', () => {
            console.log('PostgreSQL conectado correctamente');
            console.log(`API ejecutándose en el puerto ${PORT}`);
        });
    }
    catch (error) {
        console.error('No se pudo iniciar el servidor:', error);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=serve.js.map