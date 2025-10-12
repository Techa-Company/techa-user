"use client"
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import docsReducer from "../features/main/docs/docsSlice"
import contentsReducer from "../features/main/contents/contentsSlice"
import exercisesReducer from "../features/main/exercises/exercisesSlice"
import userRedcer from "../features/account/user/UserSlice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        user: userRedcer,
        docs: docsReducer,
        contents: contentsReducer,
        exercises: exercisesReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

export default store;