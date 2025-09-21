import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';
import roleSlice from './roleSlice';

const store = configureStore({
    reducer: {
        auth:authSlice,
        role:roleSlice
    }
});
export default store;