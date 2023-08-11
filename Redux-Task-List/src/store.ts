import { configureStore } from '@reduxjs/toolkit';
import allNotesSlice from './reducer';
const store = configureStore({
  reducer: {
    allNotes: allNotesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;
