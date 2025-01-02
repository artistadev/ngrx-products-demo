import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectProducts, selectProductsErrorMessage, selectProductsLoading, selectProductsShowProductCode, selectProductsTotal } from '../state/products.selectors';
import { ProductsPageActions } from '../state/products.actions';
import { AsyncPipe, NgIf } from '@angular/common';
import { ProductsListComponent } from '../products-list/products-list.component';

@Component({
  selector: 'app-products-page',
  imports: [ NgIf, AsyncPipe, ProductsListComponent ],
  templateUrl: './products-page.component.html',
  styleUrl: './products-page.component.css',
})
export class ProductsPageComponent {
  products$ = this.store.select(selectProducts);
  total$ = this.store.select(selectProductsTotal);
  showProductCode$ = this.store.select(selectProductsShowProductCode);
  loading$ = this.store.select(selectProductsLoading);
  errorMessage$ = this.store.select(selectProductsErrorMessage);
  
  constructor(private store: Store) {}

  toggleShowProductCode() {
    this.store.dispatch(ProductsPageActions.toggleShowProductCode());
  }
}
