import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import deskReducer from './desks/desks.slice'
import markersReducer from './markers/markers.slice'

export const store = configureStore({
  reducer: {
    desks: deskReducer,
    markers: markersReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
