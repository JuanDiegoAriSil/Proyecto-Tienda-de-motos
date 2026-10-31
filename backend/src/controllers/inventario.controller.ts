import type { Request, Response, NextFunction } from 'express';
import { InventarioModel } from '../models/inventario.model';

export const obtenerInventario = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const inventario = await InventarioModel.obtenerTodos();
    res.status(200).json(inventario);
  } catch (error) {
    next(error);
  }
};

export const obtenerRegistroInventarioPorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const registro = await InventarioModel.obtenerPorId(id);

    if (!registro) {
      return res.status(404).json({ message: 'Registro de inventario no encontrado' });
    }

    res.status(200).json(registro);
  } catch (error) {
    next(error);
  }
};

export const crearRegistroInventario = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const registro = await InventarioModel.crear(req.body);
    res.status(201).json(registro);
  } catch (error) {
    next(error);
  }
};

export const actualizarRegistroInventario = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const registro = await InventarioModel.actualizar(id, req.body);

    if (!registro) {
      return res.status(404).json({ message: 'Registro de inventario no encontrado' });
    }

    res.status(200).json(registro);
  } catch (error) {
    next(error);
  }
};

export const eliminarRegistroInventario = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eliminado = await InventarioModel.eliminar(Number(req.params.id));

    if (!eliminado) {
      return res.status(404).json({ message: 'Registro de inventario no encontrado' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
