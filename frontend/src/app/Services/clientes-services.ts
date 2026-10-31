
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';

export interface Cliente {
  id: number;
  nombre: string;
  apellido: string;
  edad: number | null;
  sexo: string | null;
  email: string;
  fecha_creacion: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientsServices {

  private readonly apiUrl =
    'http://localhost:3000/api/v1/clientes';

  constructor(private http: HttpClient) {}

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }
}
