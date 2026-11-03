import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class SalesServices {
    constructor(private http: HttpClient) { }

    private readonly apiUrl = 'http://localhost:3000/api/v1/ventas';


getSale(): Observable<any> {
    return this.http.get(this.apiUrl);
}

}
