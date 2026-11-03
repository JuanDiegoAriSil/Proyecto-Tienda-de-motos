import type { Request, Response, NextFunction } from 'express';
export declare const obtenerProductos: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const obtenerProductoPorId: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const crearProducto: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const actualizarProducto: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const eliminarProducto: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=productos.controller.d.ts.map