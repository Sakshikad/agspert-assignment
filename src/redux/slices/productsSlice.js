import { createSlice } from '@reduxjs/toolkit';
import productsData from '../../api/productsData';

const productsSlice = createSlice({
    name: 'products',
    initialState: {
        products: productsData,
    },
    reducers: {},
});

export default productsSlice.reducer;
