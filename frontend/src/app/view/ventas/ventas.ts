import { Component } from '@angular/core';
import { SalesServices } from '../../Services/sales-services';
import { Table } from '../../Components/table/table';

@Component({
  imports: [Table],
  standalone: true,
  selector: 'app-ventas',
  styleUrl: './ventas.css',
  templateUrl: './ventas.html',
})
export class Ventas {
  ventas: Ventas[] = [];
  constructor(private SalesServices: SalesServices) {
        this.SalesServices.getSale().subscribe((data) => {
          console.log(data);
          this.ventas = data;
        });
      }
    }