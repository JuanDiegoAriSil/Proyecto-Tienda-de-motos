import type { Request, Response, NextFunction } from 'express';
import { ProductoModel } from '../models/producto.model';

export const obtenerProductos = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const productos = await ProductoModel.obtenerTodos();
    res.status(200).json(productos);
  } catch (error) {
    next(error);
  }
};

export const obtenerProductoPorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const producto = await ProductoModel.obtenerPorId(id);

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json(producto);
  } catch (error) {
    next(error);
  }
};

export const crearProducto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const producto = await ProductoModel.crear(req.body);
    res.status(201).json(producto);
  } catch (error) {
    next(error);
  }
};

export const actualizarProducto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = Number(req.params.id);
    const producto = await ProductoModel.actualizar(id, req.body);

    if (!producto) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(200).json(producto);
  } catch (error) {
    next(error);
  }
};

export const eliminarProducto = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const eliminado = await ProductoModel.eliminar(Number(req.params.id));

    if (!eliminado) {
      return res.status(404).json({ message: 'Producto no encontrado' });
    }

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
