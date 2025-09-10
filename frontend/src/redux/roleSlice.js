import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
    name:'role',
    initialState:{
       allRoles:[],
    },
    reducers:{
        //actions
        setAllRoles:(state,action)=>{
            state.allRoles = action.payload;
        }
    }
});

export const { setAllRoles } = roleSlice.actions;
export default roleSlice.reducer;