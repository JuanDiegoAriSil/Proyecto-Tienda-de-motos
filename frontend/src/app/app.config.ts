
import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners
} from '@angular/core';

import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import {
  provideClientHydration,
  withHttpTransferCacheOptions
} from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),

    provideRouter(routes),

    provideClientHydration(
      withHttpTransferCacheOptions({
        filter: (req) => {
          // No almacenar en la caché de transferencia
          // las consultas a nuestra API REST.
          return !req.url.includes('/api/v1/');
        }
      })
    )
  ]
};
