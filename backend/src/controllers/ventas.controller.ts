
import type {
  Request,
  Response,
  NextFunction
} from 'express';

import {
  VentaModel,
  ErrorVenta,
  type NuevaVenta
} from '../models/venta.model';

// CONSULTAR TODAS LAS VENTAS
export const obtenerVentas = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const ventas = await VentaModel.obtenerTodos();

    res.status(200).json(ventas);

  } catch (error) {

    next(error);

  }
};

// CONSULTAR VENTA POR ID
export const obtenerVentaPorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        message: 'ID de venta inválido'
      });
      return;
    }

    const venta = await VentaModel.obtenerPorId(id);

    if (!venta) {
      res.status(404).json({
        message: 'Venta no encontrada'
      });
      return;
    }

    res.status(200).json(venta);

  } catch (error) {

    next(error);

  }
};

// REGISTRAR UNA VENTA
export const crearVenta = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const datos = req.body as NuevaVenta;

    if (
      !datos ||
      !Number.isInteger(datos.cliente_id) ||
      datos.cliente_id <= 0 ||
      !Array.isArray(datos.productos) ||
      datos.productos.length === 0
    ) {
      res.status(400).json({
        message: 'Cliente y productos son obligatorios'
      });
      return;
    }

    const ids = new Set<number>();

    for (const producto of datos.productos) {

      if (
        !producto ||
        !Number.isInteger(producto.producto_id) ||
        producto.producto_id <= 0 ||
        !Number.isInteger(producto.cantidad) ||
        producto.cantidad <= 0
      ) {
        res.status(400).json({
          message: 'Producto o cantidad inválida'
        });
        return;
      }

      if (ids.has(producto.producto_id)) {
        res.status(400).json({
          message: 'No se permite repetir un producto'
        });
        return;
      }

      ids.add(producto.producto_id);
    }

    const venta = await VentaModel.crear(datos);

    res.status(201).json(venta);

  } catch (error) {

    if (error instanceof ErrorVenta) {
      res.status(error.status).json({
        message: error.message
      });
      return;
    }

    next(error);

  }
};
