"use client"
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import cartReducer from '../features/cart/cartSlice';
import docsReducer from "../features/main/docs/docsSlice"
import blogsReducer from "../features/main/blog/blogsSlice"
import contentsReducer from "../features/main/contents/contentsSlice"
import exercisesReducer from "../features/main/exercises/exercisesSlice"
import reviewsReducer from "../features/main/reviews/reviewsSlice"
import userRedcer from "../features/account/user/UserSlice"
import newsletterReducer from "../features/main/newsletter/newsletterSlice"
import userCoursesReducer from "../features/account/userCourses/UserCoursesSlice"

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
        user: userRedcer,
        docs: docsReducer,
        blogs: blogsReducer,
        contents: contentsReducer,
        exercises: exercisesReducer,
        reviews: reviewsReducer,
        newsletter: newsletterReducer,
        userCourses: userCoursesReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST'],
            },
        }),
});

export default store;