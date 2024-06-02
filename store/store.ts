import { Tuple, combineReducers, configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query/react'
import logger from 'redux-logger'
import authReducer from './slices/auth-slices'
import configReducer from './slices/config-slices'
import ExpoFileSystemStorage from 'redux-persist-expo-filesystem'
import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist'
import { rtkQueryErrorLogger } from './middleware/error-catcher'
import { apiSlice } from '@/services/base-api/api'
import devToolsEnhancer from 'redux-devtools-expo-dev-plugin'
// import { apiSlice } from '@/services/base-api/api'

const persistConfig = {
  key: 'config',
  storage: ExpoFileSystemStorage,
  whitelist: ['config'], // only auth will be persisted
}

const rootReducer = combineReducers({
  auth: authReducer,
  config: configReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }).concat(
      logger,
      rtkQueryErrorLogger,

      apiSlice.middleware
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const persistor = persistStore(store)

setupListeners(store.dispatch)
export default store
