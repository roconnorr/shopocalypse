import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { RootState } from '../index';

const productsAdapter = createEntityAdapter<ProductType>({ selectId: (product) => product.name });

const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState(),
  reducers: {
    addProduct: productsAdapter.addOne,
    updateProduct: productsAdapter.updateOne,
    removeProduct: productsAdapter.removeOne,
  },
});

const productsSelectors = productsAdapter.getSelectors((state: RootState) => state.products);

export const { addProduct, updateProduct, removeProduct } = productsSlice.actions;
export const { selectAll } = productsSelectors;

export { productsSlice };
