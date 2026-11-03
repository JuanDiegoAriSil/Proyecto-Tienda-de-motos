
import dotenv from 'dotenv';
dotenv.config();

import app from './app';
import { conectarDB } from './config/database';

const PORT = Number(process.env.PORT) || 3000;

async function startServer(): Promise<void> {
  try {
    await conectarDB();

    app.listen(PORT, '0.0.0.0', () => {
      console.log('PostgreSQL conectado correctamente');
      console.log(`API ejecutándose en el puerto ${PORT}`);
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
