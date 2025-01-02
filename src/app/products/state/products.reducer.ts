import { createFeature, createReducer, on } from "@ngrx/store";
import { Product } from "../product.model";
import { ProductsAPIActions, ProductsPageActions } from "./products.actions";
import { EntityAdapter, EntityState, createEntityAdapter } from "@ngrx/entity";

export interface ProductsState extends EntityState<Product> {
    showProductCode: boolean;
    loading: boolean;
    errorMessage: string;
}

const adapter: EntityAdapter<Product> = createEntityAdapter<Product>({});

const initialState: ProductsState = adapter.getInitialState({
  showProductCode: true,
  loading: false,
  errorMessage: '',
})

export const productsReducer = createReducer(
    initialState,
    on(ProductsPageActions.toggleShowProductCode, (state) => ({
        ...state,
        showProductCode: !state.showProductCode,
    })),
    on(ProductsAPIActions.loadProducts, (state) => 
      adapter.setAll([], {
        ...state,
        loading: true,
        errorMessage: ''
      })
    ),
    on(ProductsAPIActions.productsLoadedSuccess, (state, { products }) => 
      adapter.setAll(products, {
        ...state,
        products: products,
        loading: false,
        errorMessage: ''
      })
    ),
    on(ProductsAPIActions.productsLoadedFail, (state, { message }) => 
        adapter.setAll([], {
        ...state,
        loading: false,
        errorMessage: message
    })),
    on(ProductsPageActions.addProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: '',
      })),
      on(ProductsAPIActions.productAddedSuccess, (state, { product }) => 
        adapter.addOne(product, {
        ...state,
        loading: false,
      })),
      on(ProductsAPIActions.productAddedFail, (state, { message }) => ({
        ...state,
        loading: false,
        errorMessage: message,
      })),
      on(ProductsPageActions.updateProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: '',
      })),
      on(ProductsAPIActions.productUpdatedSuccess, (state, { update }) => 
        adapter.updateOne(update, {
        ...state,
        loading: false,
      })),
      on(ProductsAPIActions.productUpdatedFail, (state, { message }) => ({
        ...state,
        loading: false,
        errorMessage: message,
      })),
      on(ProductsPageActions.deleteProduct, (state) => ({
        ...state,
        loading: true,
        errorMessage: '',
      })),
      on(ProductsAPIActions.productDeletedSuccess, (state, { id }) => 
        adapter.removeOne(id, {
        ...state,
        loading: false,
      })),
      on(ProductsAPIActions.productDeletedFail, (state, { message }) => ({
        ...state,
        loading: false,
        errorMessage: message,
      }))
)

export const productsFeature = createFeature({
    name: 'products',
    reducer: productsReducer
})

const { selectAll, selectEntities } = adapter.getSelectors();

export const selectProductEntities = selectEntities;
export const selectProducts = selectAll;