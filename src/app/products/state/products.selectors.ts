import { createFeatureSelector, createSelector } from "@ngrx/store";
import { ProductsState } from "./products.reducer";
import { getRouterSelectors } from "@ngrx/router-store";
import { sumProducts } from "../../utils/sum-products";
import * as fromProducts from './products.reducer';

export const selectProductsState = 
    createFeatureSelector<fromProducts.ProductsState>('products')

export const selectProducts = createSelector(
    selectProductsState,
    fromProducts.selectProducts
)

export const selectProductsEntities = createSelector(
    selectProductsState,
    fromProducts.selectProductEntities
)

export const selectProductsLoading = createSelector(
    selectProductsState,
    (productsState) => productsState.loading
)

export const selectProductsShowProductCode = createSelector(
    selectProductsState,
    (productsState) => productsState.showProductCode
)

export const selectProductsErrorMessage = createSelector(
    selectProductsState,
    (productsState) => productsState.errorMessage
)

export const selectProductsTotal = createSelector(selectProducts, sumProducts);

export const { selectRouteParams } = getRouterSelectors();

export const selectProductById = createSelector(
    selectProductsEntities,
    selectRouteParams,
    (productsEntities, { id }) =>
      productsEntities[id]
  );