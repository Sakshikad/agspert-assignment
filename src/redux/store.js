import { configureStore } from '@reduxjs/toolkit';
import customersReducer from './slices/customersSlice';
import productsReducer from './slices/productsSlice';
import ordersReducer from './slices/ordersSlice';

const store = configureStore({
    reducer: {
        customers: customersReducer,
        products: productsReducer,
        orders: ordersReducer,
    },
});

export default store;
