import type { Request, Response, NextFunction } from 'express';
import { CompraModel } from '../models/compra.model';

export const obtenerCompras = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const compras = await CompraModel.obtenerTodos();
    res.status(200).json(compras);
  } catch (error) {
    next(error);
  }
};

export const obtenerCompraPorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const compra = await CompraModel.obtenerPorId(id);

    if (!compra) {
      return res.status(404).json({ message: 'Compra no encontrada' });
    }

    res.status(200).json(compra);
  } catch (error) {
    next(error);
  }
};

export const crearCompra = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const compra = await CompraModel.crear(req.body);
    res.status(201).json(compra);
  } catch (error) {
    next(error);
  }
};

export const actualizarCompra = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const compra = await CompraModel.actualizar(id, req.body);

    if (!compra) {
      return res.status(404).json({ message: 'Compra no encontrada' });
    }

    res.status(200).json(compra);
  } catch (error) {
    next(error);
  }
};

export const eliminarCompra = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eliminado = await CompraModel.eliminar(Number(req.params.id));

    if (!eliminado) {
      return res.status(404).json({ message: 'Compra no encontrada' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
