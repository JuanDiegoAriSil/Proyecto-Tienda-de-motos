
import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';

import { Router, RouterOutlet } from '@angular/router';

import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AsyncPipe } from '@angular/common';

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
    AsyncPipe
  ]
})
export class MenuComponent {

  // DETECTAR EL TAMAÑO DE LA PANTALLA
  private breakpointObserver = inject(BreakpointObserver);

  // OBTENER LA RUTA ACTUAL
  private router = inject(Router);

  // VERIFICAR SI SE ESTÁ UTILIZANDO UN CELULAR
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay({ bufferSize: 1, refCount: true })
    );

  // IDENTIFICAR QUÉ OPCIÓN DEL MENÚ ESTÁ SELECCIONADA
  get rutaActual(): string {
    return this.router.url.split('?')[0].split('#')[0];
  }

}
