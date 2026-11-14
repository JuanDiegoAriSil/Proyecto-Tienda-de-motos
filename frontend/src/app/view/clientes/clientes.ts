
import { Component, OnInit, inject } from '@angular/core';
import { ClientsServices } from '../../Services/clientes-services';
import { Cliente } from '../../models/cliente.model';
import { Table } from '../../Components/table/table';

@Component({
  selector: 'app-clientes',
  imports: [Table],
  styleUrl: './clientes.css',
  templateUrl: './clientes.html',
})
export class Clientes implements OnInit {

  private clientsServices = inject(ClientsServices);

  clients: Cliente[] = [];

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.clientsServices.getClientes().subscribe({
      next: (data) => {
        console.log('Clientes recibidos:', data);
        this.clients = data;
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
      }
    });
  }
}
