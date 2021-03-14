import { combineReducers, configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import {
  persistStore, persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import usersReducer from './usersSlice';

const persistConfig = {
  key: 'root',
  storage,
};

const rootReducer = combineReducers({ users: usersReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);

const createStore = () => {
  let store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  });
  let persistor = persistStore(store);
  return { store, persistor };
};

export default createStore;
