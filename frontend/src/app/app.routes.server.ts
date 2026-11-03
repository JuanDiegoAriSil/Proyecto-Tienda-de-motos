
import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'clientes',
    renderMode: RenderMode.Client
  },
  {
    path: 'productos',
    renderMode: RenderMode.Client
  },
  {
    path: 'inventario',
    renderMode: RenderMode.Client
  },
  {
    path: 'ventas',
    renderMode: RenderMode.Client
  },
  {
    path: '',
    renderMode: RenderMode.Client
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
