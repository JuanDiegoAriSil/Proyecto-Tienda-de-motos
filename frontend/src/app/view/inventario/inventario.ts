import { Component } from '@angular/core';
import { InventoryServicess } from '../../Services/intentory-services';


@Component({
  imports: [],
  selector: 'app-inventario',
  styleUrl: './inventario.css',
  templateUrl: './inventario.html',
})
export class Inventario {
  constructor(private InventoryServices: InventoryServicess) {
      this.InventoryServices.getInventory().subscribe((data) => {
        console.log(data);
      });
    }
  }