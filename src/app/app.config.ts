import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideStoreDevtools } from '@ngrx/store-devtools'
import { provideRouterStore, routerReducer } from '@ngrx/router-store';
import { InMemoryDataService } from './in-memory-data.service';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { environment } from 'src/environments/environment.development';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptorsFromDi()),
    provideZoneChangeDetection({ eventCoalescing: true }), 
    provideStore({
      router: routerReducer,
    }),
    provideRouterStore(),
    provideRouter(routes),
    provideHttpClient(),
    provideStoreDevtools({ name: "Ngrx Products Demo", maxAge: 25, logOnly: environment.production }),
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService)
    ),
    provideEffects()
  ]
};
