
import type {
  Request,
  Response,
  NextFunction
} from 'express';

import { InventarioModel } from '../models/inventario.model';

// VALIDAR IDENTIFICADOR
const idValido = (id: unknown): id is number => {
  return Number.isSafeInteger(id) && Number(id) > 0;
};

// VALIDAR DATOS DEL INVENTARIO
const validarInventario = (datos: any): string | null => {

  if (!datos || typeof datos !== 'object') {
    return 'Los datos del inventario son obligatorios';
  }

  if (!idValido(datos.producto_id)) {
    return 'El producto_id debe ser un número entero positivo';
  }

  if (
    !Number.isSafeInteger(datos.cantidad) ||
    datos.cantidad < 0
  ) {
    return 'La cantidad debe ser un número entero mayor o igual a cero';
  }

  if (
    datos.ubicacion !== undefined &&
    typeof datos.ubicacion !== 'string'
  ) {
    return 'La ubicación debe ser un texto';
  }

  return null;
};

// CONSULTAR TODO EL INVENTARIO
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

// CONSULTAR REGISTRO POR ID
export const obtenerRegistroInventarioPorId = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const id = Number(req.params.id);

    if (!idValido(id)) {
      res.status(400).json({
        message: 'ID de inventario inválido'
      });
      return;
    }

    const registro = await InventarioModel.obtenerPorId(id);

    if (!registro) {
      res.status(404).json({
        message: 'Registro de inventario no encontrado'
      });
      return;
    }

    res.status(200).json(registro);

  } catch (error) {

    next(error);

  }
};

// CREAR REGISTRO DE INVENTARIO
export const crearRegistroInventario = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const errorValidacion = validarInventario(req.body);

    if (errorValidacion) {
      res.status(400).json({
        message: errorValidacion
      });
      return;
    }

    // VERIFICAR QUE EL PRODUCTO EXISTA
    const producto = await InventarioModel.verificarProducto(
      req.body.producto_id
    );

    if (!producto) {
      res.status(404).json({
        message: 'El producto indicado no existe'
      });
      return;
    }

    const registro = await InventarioModel.crear(req.body);

    res.status(201).json(registro);

  } catch (error) {

    next(error);

  }
};

// ACTUALIZAR REGISTRO DE INVENTARIO
export const actualizarRegistroInventario = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const id = Number(req.params.id);

    if (!idValido(id)) {
      res.status(400).json({
        message: 'ID de inventario inválido'
      });
      return;
    }

    const errorValidacion = validarInventario(req.body);

    if (errorValidacion) {
      res.status(400).json({
        message: errorValidacion
      });
      return;
    }

    // VERIFICAR QUE EL REGISTRO EXISTA
    const existente = await InventarioModel.obtenerPorId(id);

    if (!existente) {
      res.status(404).json({
        message: 'Registro de inventario no encontrado'
      });
      return;
    }

    // VERIFICAR QUE EL PRODUCTO EXISTA
    const producto = await InventarioModel.verificarProducto(
      req.body.producto_id
    );

    if (!producto) {
      res.status(404).json({
        message: 'El producto indicado no existe'
      });
      return;
    }

    const registro = await InventarioModel.actualizar(
      id,
      req.body
    );

    if (!registro) {
      res.status(404).json({
        message: 'No se pudo actualizar el inventario'
      });
      return;
    }

    res.status(200).json(registro);

  } catch (error) {

    next(error);

  }
};

// ELIMINAR REGISTRO DE INVENTARIO
export const eliminarRegistroInventario = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {

  try {

    const id = Number(req.params.id);

    if (!idValido(id)) {
      res.status(400).json({
        message: 'ID de inventario inválido'
      });
      return;
    }

    const eliminado = await InventarioModel.eliminar(id);

    if (!eliminado) {
      res.status(404).json({
        message: 'Registro de inventario no encontrado'
      });
      return;
    }

    res.status(204).send();

  } catch (error) {

    next(error);

  }
};
