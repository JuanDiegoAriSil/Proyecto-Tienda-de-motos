import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { shareReplay } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { Clientes } from '../../view/clientes/clientes';
import { Productos } from '../../view/productos/productos';
import { Ventas } from '../../view/ventas/ventas';


@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css',
  imports: [
    MatToolbarModule, 
    MatButtonModule,
    MatSidenavModule, 
    MatListModule, 
    MatIconModule, 
    RouterOutlet, 
    Clientes, 
    Productos, 
    Ventas,
    AsyncPipe,
  ]
})
export class MenuComponent {
[x: string]: any;

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

}
