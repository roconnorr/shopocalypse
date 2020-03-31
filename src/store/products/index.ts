import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState } from '../index';

const productsAdapter = createEntityAdapter<ProductType>({ selectId: (product) => product.name });

const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState(),
  reducers: {
    addProduct: productsAdapter.addOne,
    updateProduct: productsAdapter.updateOne,
  },
});

const productsSelectors = productsAdapter.getSelectors((state: RootState) => state.products);

export const { addProduct, updateProduct } = productsSlice.actions;
export const { selectAll } = productsSelectors;

export { productsSlice };
