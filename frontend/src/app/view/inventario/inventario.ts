import { Component } from '@angular/core';
import { InventoryServices } from '../../Services/intentory-services';
import {Table} from '../../Components/table/table';

@Component({
  imports: [Table],
  standalone: true,
  selector: 'app-inventario',
  styleUrl: './inventario.css',
  templateUrl: './inventario.html',
})
export class Inventario {
  inventario: Inventario[] = [];
  constructor(private InventoryServices: InventoryServices) {
      this.InventoryServices.getInventario().subscribe((data) => {
        console.log(data);
        this.inventario = data;  
      });
    }
  }