
import { Router } from 'express';

import {
  obtenerInventario,
  obtenerRegistroInventarioPorId,
  crearRegistroInventario,
  actualizarRegistroInventario,
  eliminarRegistroInventario
} from '../controllers/inventario.controller';

const router = Router();

router.get('/', obtenerInventario);

router.get('/:id', obtenerRegistroInventarioPorId);

router.post('/', crearRegistroInventario);

router.put('/:id', actualizarRegistroInventario);

router.delete('/:id', eliminarRegistroInventario);

export default router;
