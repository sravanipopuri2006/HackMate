import { createSlice } from "@reduxjs/toolkit";

const roleSlice = createSlice({
    name:'role',
    initialState:{
       allRoles:[],
       singleRole:null,
    },
    reducers:{
        //actions
        setAllRoles:(state,action)=>{
            state.allRoles = action.payload;
        },
        setSingleRole:(state,action)=>{
            state.singleRole=action.payload;
        }
    }
});

export const { setAllRoles ,setSingleRole} = roleSlice.actions;
export default roleSlice.reducer;