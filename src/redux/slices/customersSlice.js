import { createSlice } from '@reduxjs/toolkit';
import customersData from '../../api/customersData';

const customersSlice = createSlice({
    name: 'customers',
    initialState: {
        customers: customersData,
    },
    reducers: {},
});

export default customersSlice.reducer;
