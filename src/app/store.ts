import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import photosReducer from "../features/photos/photosSlice";

export const store = configureStore({
  reducer: {
    photos: photosReducer
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
