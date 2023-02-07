import {configureStore, ThunkAction, Action} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {scoresApi} from '../api/scores.api';
import simonSaysSlice from '../features/simonSaysGame/state/simonSaysSlice';

const store = configureStore({
  reducer: {
    simonSays: simonSaysSlice,
    [scoresApi.reducerPath]: scoresApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(scoresApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
export default store;
