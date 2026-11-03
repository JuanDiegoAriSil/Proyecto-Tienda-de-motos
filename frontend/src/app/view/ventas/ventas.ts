import { Component } from '@angular/core';
import { SalesServices } from '../../Services/sales-services';
import { TableSales } from '../../Components/table-sales/table-sales';

@Component({
  imports: [TableSales],
  standalone: true,
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