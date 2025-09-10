import {configureStore} from '@reduxjs/toolkit';
import authSlice from './authSlice';

const store = configureStore({
    reducer: {
        auth:authSlice,
        role:roleSlice
    }
});
export default store;