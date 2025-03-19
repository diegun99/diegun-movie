import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';
import { appRoutes } from './app.routes';
import { provideHttpClient, withFetch } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes,withComponentInputBinding()),
    provideHttpClient(withFetch())// provideCLiente hace que elservicio httpcliente pueda ser inyectado..with fetch usa el fectch nativo de javascript y cachea
  ],
};
