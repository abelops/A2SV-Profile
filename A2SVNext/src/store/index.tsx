"use client";
import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './features/posts-slice';
import { postsApi } from './features/posts-api';

export const store = configureStore({
    reducer: {
        posts: postsReducer,
        [postsApi.reducerPath]: postsApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(postsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;