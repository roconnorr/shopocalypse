import { configureStore, combineReducers } from '@reduxjs/toolkit';

import { productsSlice } from './products';

import { INITIAL_STATE } from './state';

const rootReducer = combineReducers({ products: productsSlice.reducer });

const store = configureStore({
  reducer: rootReducer,
});

// insert test data
INITIAL_STATE.forEach((p) => store.dispatch(productsSlice.actions.addProduct(p)));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export { store };
