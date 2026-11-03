
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class InventoryServices {

  private readonly apiUrl = `${environment.apiUrl}/inventario`;

  constructor(private http: HttpClient) {}

  getInventario(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
