export interface Compra {
    id?: number;
    producto: string;
    cantidad: number;
    proveedor: string;
    precio_unitario: number;
    fecha_compra?: Date;
}
export declare class CompraModel {
    static obtenerTodos(): Promise<Compra[]>;
    static obtenerPorId(id: number): Promise<Compra | null>;
    static crear(compra: Compra): Promise<Compra>;
    static actualizar(id: number, compra: Compra): Promise<Compra | null>;
    static eliminar(id: number): Promise<boolean>;
}
//# sourceMappingURL=compra.model.d.ts.map