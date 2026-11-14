
import type {
  Request,
  Response,
  NextFunction
} from 'express';

import bcrypt from 'bcryptjs';
import { UsuarioModel } from '../models/usuario.model';

// REGISTRAR USUARIO
export const registrarUsuario = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {
    const { email, password } = req.body ?? {};

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      password.length < 8 ||
      Buffer.byteLength(password, 'utf8') > 72
    ) {
      res.status(400).json({
        message: 'Correo inválido o contraseña fuera del rango permitido (mínimo 8 caracteres, máximo 72 bytes)'
      });
      return;
    }

    const correo = email.trim().toLowerCase();

    const usuarioExistente =
      await UsuarioModel.obtenerPorEmail(correo);

    if (usuarioExistente) {
      res.status(409).json({
        message: 'El correo ya está registrado'
      });
      return;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const usuario = await UsuarioModel.crear(
      correo,
      passwordHash
    );

    res.status(201).json({
      message: 'Usuario registrado correctamente',
      usuario
    });

  } catch (error) {
    if ((error as { code?: string }).code === '23505') {
      res.status(409).json({
        message: 'El correo ya está registrado'
      });
      return;
    }

    next(error);
  }
};

// INICIAR SESIÓN
export const iniciarSesion = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {

  try {
    const { email, password } = req.body ?? {};

    if (
      typeof email !== 'string' ||
      typeof password !== 'string' ||
      !email.trim() ||
      !password ||
      Buffer.byteLength(password, 'utf8') > 72
    ) {
      res.status(400).json({
        message: 'Correo o contraseña inválidos'
      });
      return;
    }

    const usuario = await UsuarioModel.obtenerPorEmail(
      email.trim().toLowerCase()
    );

    if (!usuario) {
      res.status(401).json({
        message: 'Credenciales incorrectas'
      });
      return;
    }

    const passwordCorrecta = await bcrypt.compare(
      password,
      usuario.password_hash
    );

    if (!passwordCorrecta) {
      res.status(401).json({
        message: 'Credenciales incorrectas'
      });
      return;
    }

    res.status(200).json({
      message: 'Credenciales correctas',
      usuario: {
        id: usuario.id,
        email: usuario.email
      }
    });

  } catch (error) {
    next(error);
  }
};
