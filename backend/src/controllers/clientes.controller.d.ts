import type { Request, Response, NextFunction } from 'express';
export declare const obtenerClientes: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const obtenerClientePorId: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const crearCliente: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const actualizarCliente: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const eliminarCliente: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=clientes.controller.d.ts.map