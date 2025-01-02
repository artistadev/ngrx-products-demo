import { Component } from '@angular/core';
import { ProductEditComponent } from '../product-edit/product-edit.component';
import { Store } from '@ngrx/store';
import { ProductsPageActions } from '../state/products.actions';
import { Product } from '../product.model';
import { selectProductById, selectProductsErrorMessage, selectProductsLoading } from '../state/products.selectors';
import { AsyncPipe, NgIf } from '@angular/common';

@Component({
  selector: 'app-product-page',
  imports: [NgIf, AsyncPipe, ProductEditComponent],
  templateUrl: './product-page.component.html',
  styleUrl: './product-page.component.css'
})
export class ProductPageComponent {
  product$ = this.store.select(selectProductById);
  loading$ = this.store.select(selectProductsLoading);
  errorMessage$ = this.store.select(selectProductsErrorMessage);

  constructor(private store: Store) {}

  addProduct(product: Product) {
    this.store.dispatch(ProductsPageActions.addProduct({ product }));
  }

  updateProduct(product: Product) {
    this.store.dispatch(ProductsPageActions.updateProduct({ product }));
  }

  deleteProduct(id: number) {
    this.store.dispatch(ProductsPageActions.deleteProduct({ id }));
  }
}

