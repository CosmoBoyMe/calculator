import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { appReducer } from './slices/app/slice';
import { calculatorReducer } from './slices/calculator/slice';

const rootReducer = combineReducers({
  app: appReducer,
  calculator: calculatorReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export { rootReducer, store };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
