
import { Component, OnInit } from '@angular/core';
import { DatePipe, CurrencyPipe } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { SalesServices } from '../../Services/sales-services';

@Component({
  selector: 'app-table-sales',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    CurrencyPipe
  ],
  templateUrl: './table-sales.html',
  styleUrl: './table-sales.css'
})
export class TableSales implements OnInit {

  displayedColumns: string[] = [
    'id',
    'cliente_id',
    'cliente_nombre',
    'cliente_apellido',
    'fecha_venta',
    'total'
  ];

  daticos: any[] = [];

  constructor(
    private salesServices: SalesServices
  ) {}

  ngOnInit(): void {
    this.cargarVentas();
  }

  cargarVentas(): void {

    this.salesServices.getSale().subscribe({
      next: (datos) => {
        this.daticos = datos;
      },
      error: (error) => {
        console.error(
          'Error consultando ventas:',
          error
        );
      }
    });

  }
}
