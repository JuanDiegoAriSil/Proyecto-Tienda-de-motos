import { Component } from '@angular/core';
import { ProductsServices } from '../../Services/products-services';

@Component({
  imports: [],
  selector: 'app-productos',
  styleUrl: './productos.css',
  templateUrl: './productos.html',
})
export class Productos {
    constructor(private productsServices: ProductsServices) {
      this.productsServices.getProducts().subscribe((data) => {
        console.log(data);
      });
    }
  }