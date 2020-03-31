import { AsyncStorage } from 'react-native';
import { configureStore, combineReducers, getDefaultMiddleware } from '@reduxjs/toolkit';
import { Middleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import reduxLogger from 'redux-logger';

import { productsSlice } from './products';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
};

const rootReducer = combineReducers({ products: productsSlice.reducer });

const persistedReducer = persistReducer(persistConfig, rootReducer);

const customizedMiddleware = getDefaultMiddleware({
  serializableCheck: false,
});

const store = configureStore({
  reducer: persistedReducer,
  middleware: [...customizedMiddleware, reduxLogger as Middleware],
});

const persistor = persistStore(store);

// insert test data
// INITIAL_STATE.forEach((p) => store.dispatch(productsSlice.actions.addProduct(p)));

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

export { store, persistor };
