import { Component } from '@angular/core';
import { ClientsServices } from '../../Services/clientes-services';
import { Table } from '../../Components/table/table';

@Component({
  imports: [Table],
  selector: 'app-clientes',
  styleUrl: './clientes.css',
  templateUrl: './clientes.html',
})
export class Clientes {
  constructor(private clientsServices: ClientsServices) {
    this.clientsServices.getClientes().subscribe((data) => {
      console.log(data);
    });
  }
}
  