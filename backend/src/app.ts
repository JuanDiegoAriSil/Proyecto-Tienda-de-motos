import express from 'express';
import cors from 'cors';

import clientesRoutes from './routes/clientes.routes';
import productosRoutes from './routes/productos.routes';
import inventarioRoutes from './routes/inventario.routes';
import comprasRoutes from './routes/compras.routes';


const app = express(); // llama lo que se va usar

app.use(cors()); //

app.use(express.json()); // defiene que se va a usar json

app.get('/api/v1/health', (req, res) => { // define la ruta de health

  res.json({
    status: 'OK'
  });

});

app.use( // define la ruta de clientes es lo que se tiene (menu) y lo que se va a usar (clientesRoutes)
  '/api/v1/clientes',
  clientesRoutes
);

app.use('/api/v1/productos', productosRoutes);
app.use('/api/v1/inventario', inventarioRoutes);
app.use('/api/v1/compras', comprasRoutes);


export default app; // si otra clase necesista