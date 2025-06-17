import { createSlice } from '@reduxjs/toolkit';

// بررسی اینکه آیا در مرورگر هستیم
const isBrowser = typeof window !== 'undefined';

// تابع برای بارگیری از localStorage
export const loadFromLocalStorage = () => {
    if (!isBrowser) return undefined;
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
    if (!isBrowser) return;
    try {
        const serializedState = JSON.stringify(state);
        localStorage.setItem('cart', serializedState);
    } catch (e) {
        console.warn('خطا در ذخیره در localStorage:', e);
    }
};

// initial state پیش‌فرض
const defaultState = {
    items: [],
    totalAmount: 0,
    discountCode: null,
    discountAmount: 0,
    selectedPayment: null,
};

// مقداردهی اولیه: اگر در مرورگر هستیم، از localStorage بخونه، وگرنه پیش‌فرض
const initialState = isBrowser ? loadFromLocalStorage() || defaultState : defaultState;

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
            saveToLocalStorage(state);
        },
        removeFromCart: (state, action) => {
            state.items = state.items.filter(item => item.id !== action.payload);
            state.totalAmount = state.items.reduce(
                (sum, item) => sum + item.price,
                0
            );
            saveToLocalStorage(state);
        },
        applyDiscount: (state, action) => {
            // منطق تخفیف رو اینجا پیاده کن
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
            state.selectedPayment = null;
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
