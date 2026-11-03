
import { Component, OnInit } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { DatePipe } from '@angular/common';
import { InventoryServices } from '../../Services/intentory-services';

@Component({
  selector: 'app-table-inventory',
  standalone: true,
  imports: [MatTableModule, DatePipe],
  templateUrl: './table-inventory.html',
  styleUrl: './table-inventory.css'
})
export class TableInventory implements OnInit {

  displayedColumns: string[] = [
    'id',
    'producto_id',
    'producto',
    'cantidad',
    'ubicacion',
    'fecha_actualizacion'
  ];

  daticos: any[] = [];

  constructor(
    private inventoryServices: InventoryServices
  ) {}

  ngOnInit(): void {
    this.cargarInventario();
  }

  cargarInventario(): void {

    this.inventoryServices.getInventario().subscribe({
      next: (datos) => {
        this.daticos = datos;
      },
      error: (error) => {
        console.error(
          'Error consultando inventario:',
          error
        );
      }
    });

  }
}
