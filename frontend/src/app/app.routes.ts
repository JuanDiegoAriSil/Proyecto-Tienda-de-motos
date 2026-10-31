import { Routes } from '@angular/router';
import { Clientes } from './view/clientes/clientes';
import { Productos } from './view/productos/productos';
import { Inventario } from './view/inventario/inventario';
import { Ventas } from './view/ventas/ventas';  
import { Table } from './Components/table/table';
import { MenuComponent } from './Components/menu/menu.component';
export const routes: Routes = [
    
    {
        path: '',
    component: MenuComponent,

    children: [

     {
        path: 'clientes',
        component: Clientes
      },

      {
        path: 'productos',
        component: Productos
      },

      {
        path: 'ventas',
        component: Ventas
      },

      {
        path: 'inventario',
        component: Inventario
      }

    ]
  }

];
