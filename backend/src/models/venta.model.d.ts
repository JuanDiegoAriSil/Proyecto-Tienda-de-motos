export interface ProductoVenta {
    producto_id: number;
    cantidad: number;
}
export interface NuevaVenta {
    cliente_id: number;
    productos: ProductoVenta[];
}
export declare class ErrorVenta extends Error {
    status: number;
    constructor(status: number, message: string);
}
export declare class VentaModel {
    static obtenerTodos(): Promise<any[]>;
    static obtenerPorId(id: number): Promise<any>;
    static crear(datos: NuevaVenta): Promise<{
        id: any;
        cliente_id: number;
        total: any;
        message: string;
    }>;
    private static crearDetalle;
}
//# sourceMappingURL=venta.model.d.ts.map