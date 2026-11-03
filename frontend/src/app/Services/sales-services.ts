import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
@Injectable({
  providedIn: 'root'
})

export class SalesServices {
    constructor(private http: HttpClient) { }

    private readonly apiUrl = `${environment.apiUrl}/ventas`;


getSale(): Observable<any> {
    return this.http.get(this.apiUrl);
}

}
