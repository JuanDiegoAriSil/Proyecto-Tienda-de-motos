import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({

    providedIn: 'root'
})

export class InventoryServicess {

    constructor(private http: HttpClient) { }

    private readonly apiUrl = 'http://localhost:3000/api/v1/inventario';


getInventory(): Observable<any> {
    return this.http.get(this.apiUrl);
}

}