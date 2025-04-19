// features/cart/cartSlice.js
import { createSlice } from '@reduxjs/toolkit';

// تابع برای بارگیری از localStorage
export const loadFromLocalStorage = () => {
    try {
        const serializedState = localStorage.getItem('cart');
        if (serializedState === null) return undefined;
        return JSON.parse(serializedState);
    } catch (e) {
        console.warn('خطا در خواندن از localStorage:', e);
        return undefined;
    }
};

// تابع برای ذخیره در localStorage
const saveToLocalStorage = (state) => {
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cart', serializedState);
    } catch (e) {
        console.warn('خطا در ذخیره در localStorage:', e);
    }
};

const initialState = loadFromLocalStorage() || {
    items: [],
    totalAmount: 0,
    discountCode: null,
    discountAmount: 0,
    selectedPayment: null,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            const existingItem = state.items.find(
                item => item.title === action.payload.title
            );
            if (!existingItem) {
                state.items.push({ ...action.payload, quantity: 1 });
            }
            state.totalAmount = state.items.reduce(
                (sum, item) => sum + item.price,
                0
            );
            saveToLocalStorage(state); // ذخیره پس از تغییر
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.totalAmount = state.items.reduce(
                (sum, item) => sum + item.price,
                0
            );
            saveToLocalStorage(state); // ذخیره پس از تغییر
        },
        applyDiscount: (state, action) => {
            // ... منطق تخفیف
            saveToLocalStorage(state);
        },
        selectPayment: (state, action) => {
            state.selectedPayment = action.payload;
            saveToLocalStorage(state);
        },
        clearCart: (state) => {
            state.items = [];
            state.totalAmount = 0;
            state.discountCode = null;
            state.discountAmount = 0;
            saveToLocalStorage(state);
        },
    },
});

export const {
    addToCart,
    removeFromCart,
    applyDiscount,
    selectPayment,
    clearCart
} = cartSlice.actions;
export default cartSlice.reducer;