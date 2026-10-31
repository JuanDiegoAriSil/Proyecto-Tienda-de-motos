import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';


@Injectable({

    providedIn: 'root'
})

export class ProductsServices {

    constructor(private http: HttpClient) { }

    private readonly apiUrl = 'http://localhost:3000/api/v1/productos';


getProducts(): Observable<any> {
    return this.http.get(this.apiUrl);
}

}
    
    

