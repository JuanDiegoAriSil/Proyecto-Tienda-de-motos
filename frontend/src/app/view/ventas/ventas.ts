import { Component } from '@angular/core';
import { SalesServices } from '../../Services/sales-services';

@Component({
  imports: [],
  selector: 'app-ventas',
  styleUrl: './ventas.css',
  templateUrl: './ventas.html',
})
export class Ventas {
  constructor(private SalesServices: SalesServices) {
        this.SalesServices.getSale().subscribe((data) => {
          console.log(data);
        });
      }
    }