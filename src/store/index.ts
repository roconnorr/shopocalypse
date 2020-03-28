import { createSlice, configureStore } from '@reduxjs/toolkit';
import { INITIAL_STATE } from './state';
import { ProductItem } from '../../global';

const productSlice = createSlice({
  name: 'product',
  initialState: INITIAL_STATE,
  reducers: {
    add: (state, action): ProductItem[] => {
      console.log(state);
      console.log(action);
      return [...state, { id: 'test-id', list: 'now', title: action.payload }];
    },
    remove: (state, action): ProductItem[] => {
      return state.map((item) => {
        if (item.id !== action.payload.id) {
          return item;
        }

        return {
          ...item,
          added: false,
        };
      });
    },
  },
});

const store = configureStore({ reducer: productSlice.reducer });

export const { add, remove } = productSlice.actions;

export { productSlice, store };
