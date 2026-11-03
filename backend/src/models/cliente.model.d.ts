export interface Cliente {
    id?: number;
    nombre: string;
    apellido: string;
    edad?: number;
    sexo?: string;
    email: string;
    fecha_creacion?: Date;
}
export declare class ClienteModel {
    static obtenerTodos(): Promise<Cliente[]>;
    static obtenerPorId(id: number): Promise<Cliente | null>;
    static crear(cliente: Cliente): Promise<Cliente>;
    static actualizar(id: number, cliente: Cliente): Promise<Cliente | null>;
    static eliminar(id: number): Promise<boolean>;
}
//# sourceMappingURL=cliente.model.d.ts.map