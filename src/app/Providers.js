"use client"
import { Provider } from "react-redux";
import { store } from "./store/store";
import { useEffect } from "react";
import { loadFromLocalStorage } from "./features/cart/cartSlice";

export function Providers({ children }) {
    useEffect(() => {
        const savedCart = loadFromLocalStorage();
        if (savedCart) {
            store.dispatch({ type: 'cart/loadCart', payload: savedCart });
        }
    }, []);

    return <Provider store={store}>{children}</Provider>;
}