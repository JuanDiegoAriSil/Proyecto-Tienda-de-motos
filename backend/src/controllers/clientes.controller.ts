import type { Request, Response, NextFunction } from 'express';

import { ClienteModel } from '../models/cliente.model';


export const obtenerClientes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const clientes =
      await ClienteModel.obtenerTodos();

    res.status(200).json(clientes);

  } catch (error) {

    next(error);

  }
};


export const obtenerClientePorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const id = Number(req.params.id);

    const cliente =
      await ClienteModel.obtenerPorId(id);

    if (!cliente) {

      return res.status(404).json({
        message: 'Cliente no encontrado'
      });

    }

    res.status(200).json(cliente);

  } catch (error) {

    next(error);

  }
};


export const crearCliente = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const cliente =
      await ClienteModel.crear(req.body);

    res.status(201).json(cliente);

  } catch (error) {

    next(error);

  }
};


export const actualizarCliente = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const id = Number(req.params.id);

    const cliente =
      await ClienteModel.actualizar(
        id,
        req.body
      );

    if (!cliente) {

      return res.status(404).json({
        message: 'Cliente no encontrado'
      });

    }

    res.status(200).json(cliente);

  } catch (error) {

    next(error);

  }
};


export const eliminarCliente = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const id = Number(req.params.id);

    const eliminado =
      await ClienteModel.eliminar(id);

    if (!eliminado) {

      return res.status(404).json({
        message: 'Cliente no encontrado'
      });

    }

    res.status(204).send();

  } catch (error) {

    next(error);

  }
};