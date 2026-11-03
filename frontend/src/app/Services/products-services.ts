import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';


@Injectable({

    providedIn: 'root'
})

export class ProductsServices {

    constructor(private http: HttpClient) { }

    private readonly apiUrl = `${environment.apiUrl}/productos`;


getProductos(): Observable<any> {
    return this.http.get(this.apiUrl);
}

}
    
    

