import type { Cliente } from '../models/cliente.model';

export const clientesDB: Cliente[] = [
  {
    id: 1,
    nombre: 'Ana',
    apellido: 'Gomez',
    edad: 28,
    sexo: 'Femenino',
    email: 'ana.gomez@example.com',
    fecha_creacion: new Date('2026-10-05T18:00:00.000Z')
  },
  {
    id: 2,
    nombre: 'Carlos',
    apellido: 'Rodriguez',
    edad: 34,
    sexo: 'Masculino',
    email: 'carlos.rodriguez@example.com',
    fecha_creacion: new Date('2026-10-05T18:05:00.000Z')
  }
];

let siguienteId = clientesDB.length + 1;

export const obtenerSiguienteId = (): number => {
  const id = siguienteId;
  siguienteId += 1;

  return id;
};
