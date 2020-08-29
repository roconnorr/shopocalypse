import { createSlice, createEntityAdapter, Update } from '@reduxjs/toolkit';
import { RootState } from '../index';
import { generateColour } from '../../util/colours';

const productsAdapter = createEntityAdapter<ProductType>({ selectId: (product) => product.name });

const productsSlice = createSlice({
  name: 'products',
  initialState: productsAdapter.getInitialState(),
  reducers: {
    addProduct: {
      reducer: productsAdapter.addOne,
      prepare: (product: ProductType): { payload: ProductType } => {
        return { payload: { ...product, colour: generateColour(product.list) } };
      },
    },
    updateProduct: {
      reducer: productsAdapter.updateOne,
      prepare: (payload: Update<ProductType>): { payload: Update<ProductType> } => {
        const updatedList = payload.changes?.list;
        if (updatedList) {
          return {
            payload: {
              ...payload,
              changes: { ...payload.changes, colour: generateColour(updatedList) },
            },
          };
        } else {
          return { payload };
        }
      },
    },
    removeProduct: productsAdapter.removeOne,
  },
});

const productsSelectors = productsAdapter.getSelectors((state: RootState) => state.products);

export const { addProduct, updateProduct, removeProduct } = productsSlice.actions;
export const { selectAll } = productsSelectors;

export { productsSlice };
