
import { Component, OnInit, inject } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

import { ClientsServices } from '../../Services/clientes-services';
import { Cliente } from '../../models/cliente.model';

@Component({
  selector: 'app-table',
  styleUrl: './table.css',
  templateUrl: './table.html',
  imports: [MatTableModule],
})
export class Table implements OnInit {

  private clientesService = inject(ClientsServices);

  displayedColumns: string[] = [
    'id',
    'nombre',
    'apellido',
    'edad',
    'sexo',
    'email'
  ];

  daticos: Cliente[] = [];

  cargando = false;
  error = '';

  ngOnInit(): void {
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.cargando = true;
    this.error = '';

    this.clientesService.getClientes().subscribe({
      next: (clientes) => {
        this.daticos = clientes;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al consultar clientes:', error);
        this.error = 'No se pudieron cargar los clientes';
        this.cargando = false;
      }
    });
  }
}
