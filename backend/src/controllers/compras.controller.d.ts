import type { Request, Response, NextFunction } from 'express';
export declare const obtenerCompras: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const obtenerCompraPorId: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const crearCompra: (req: Request, res: Response, next: NextFunction) => Promise<void>;
export declare const actualizarCompra: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const eliminarCompra: (req: Request, res: Response, next: NextFunction) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=compras.controller.d.ts.map