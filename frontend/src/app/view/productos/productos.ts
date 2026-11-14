import { Component } from '@angular/core';
import { ProductsServices } from '../../Services/products-services';
import { Table } from '../../Components/table/table';

@Component({
  imports: [Table],
  selector: 'app-productos',
  styleUrl: './productos.css',
  templateUrl: './productos.html',
})
export class Productos {
    products: Productos[] = [];
    constructor(private productsServices: ProductsServices) {
      this.productsServices.getProductos().subscribe((data) => {
        console.log(data);
        this.products = data;
      });
    }
  }