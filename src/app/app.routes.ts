import { Routes } from '@angular/router';
import { ProductsService } from './products/products.service';
import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';
import { ProductEffects } from './products/state/products.effects';
import { productsFeature } from './products/state/products.reducer';

export const routes: Routes = [
    {
      path: '',
      loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent)
    },
    {
        path: 'home',
        loadComponent: () => import('./home/home.component').then((m) => m.HomeComponent)
    },
    {
      path: 'products',
      loadChildren: () => import('./products/products.routes')
        .then(mod => mod.routes),
      providers: [
        ProductsService,
        provideState(productsFeature),
        provideEffects(ProductEffects)
      ]
    }
  ];
