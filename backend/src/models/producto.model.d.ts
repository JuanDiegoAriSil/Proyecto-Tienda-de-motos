export interface Producto {
    id?: number;
    nombre: string;
    descripcion?: string;
    marca: string;
    categoria: string;
    precio: number;
    fecha_creacion?: Date;
}
export declare class ProductoModel {
    static obtenerTodos(): Promise<Producto[]>;
    static obtenerPorId(id: number): Promise<Producto | null>;
    static crear(producto: Producto): Promise<Producto>;
    static actualizar(id: number, producto: Producto): Promise<Producto | null>;
    static eliminar(id: number): Promise<boolean>;
}
//# sourceMappingURL=producto.model.d.ts.map