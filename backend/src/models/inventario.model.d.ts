export interface Inventario {
    id?: number;
    producto_id: number;
    producto?: string;
    cantidad: number;
    ubicacion?: string;
    fecha_actualizacion?: Date;
}
export declare class InventarioModel {
    static obtenerTodos(): Promise<Inventario[]>;
    static obtenerPorId(id: number): Promise<Inventario | null>;
    static crear(registro: Inventario): Promise<Inventario>;
    static actualizar(id: number, registro: Inventario): Promise<Inventario | null>;
    static eliminar(id: number): Promise<boolean>;
    static verificarProducto(productoId: number): Promise<boolean>;
}
//# sourceMappingURL=inventario.model.d.ts.map