
import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { conectarDB } from './config/database';

const PORT = process.env.PORT || 3000;

// Función encargada de iniciar el servidor
async function startServer(): Promise<void> {
  try {
    // 1. Comprobar conexión con PostgreSQL
    await conectarDB();

    // 2. Iniciar Express cuando la conexión sea exitosa
    app.listen(PORT, () => {
      console.log(
        `API ejecutándose en http://localhost:${PORT}`
      );
    });

  } catch (error) {
    console.error(
      'No se pudo iniciar el servidor:',
      error
    );

    process.exit(1);
  }
}

startServer();
