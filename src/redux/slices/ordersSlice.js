import { createSlice } from '@reduxjs/toolkit';

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        activeOrders: [],
        completedOrders: [],
    },
    reducers: {
        addOrder: (state, action) => {
            state.activeOrders.push(action.payload);
        },
        updateOrder: (state, action) => {
            const index = state.activeOrders.findIndex(order => order.invoice_no === action.payload.invoice_no);
            if (index !== -1) {
                state.activeOrders[index] = action.payload;
            }
        },
        completeOrder: (state, action) => {
            const index = state.activeOrders.findIndex(order => order.invoice_no === action.payload.invoice_no);
            if (index !== -1) {
                const [completedOrder] = state.activeOrders.splice(index, 1);
                state.completedOrders.push(completedOrder);
            }
        },
    },
});

export const { addOrder, updateOrder, completeOrder } = ordersSlice.actions;
export default ordersSlice.reducer;
