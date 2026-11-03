import { Component } from '@angular/core';
import { InventoryServices } from '../../Services/intentory-services';
import { TableInventory } from '../../Components/table-inventory/table-inventory';

@Component({
  imports: [TableInventory],
  standalone: true,
  selector: 'app-inventario',
  styleUrl: './inventario.css',
  templateUrl: './inventario.html',
})
export class Inventario {
  constructor(private InventoryServices: InventoryServices) {
      this.InventoryServices.getInventario().subscribe((data) => {
        console.log(data);
      });
    }
  }