
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';

import { ProductsServices } from '../../Services/products-services';

@Component({
  selector: 'app-table-products',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule
  ],
  templateUrl: './table-products.html',
  styleUrl: './table-products.css'
})
export class TableProducts implements OnInit {

  displayedColumns: string[] = [
    'id',
    'nombre',
    'descripcion',
    'marca',
    'categoria',
    'precio'
  ];

  daticos: any[] = [];

  constructor(
    private productsServices: ProductsServices
  ) {}

  ngOnInit(): void {
    this.productsServices.getProductos().subscribe({
      next: (datos) => {
        this.daticos = datos;
      },
      error: (error) => {
        console.error('Error consultando productos:', error);
      }
    });
  }
}
