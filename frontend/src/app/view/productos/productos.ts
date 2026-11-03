import { Component } from '@angular/core';
import { ProductsServices } from '../../Services/products-services';
import { TableProducts } from '../../Components/table-products/table-products';

@Component({
  imports: [TableProducts],
  selector: 'app-productos',
  styleUrl: './productos.css',
  templateUrl: './productos.html',
})
export class Productos {
    constructor(private productsServices: ProductsServices) {
      this.productsServices.getProductos().subscribe((data) => {
        console.log(data);
      });
    }
  }