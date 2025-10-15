import { createSlice } from "@reduxjs/toolkit";
import { setSearchTeamByText } from "./teamSlice";

const roleSlice = createSlice({
    name:'role',
    initialState:{
       allRoles:[],
       singleRole:null,

       allAdminRoles:[],
       searchRoleByText:"",
       allAppliedRoles:[],

    },
    reducers:{
        //actions
        setAllRoles:(state,action)=>{
            state.allRoles = action.payload;
        },
        setSingleRole:(state,action)=>{
            state.singleRole=action.payload;
        },
        setAllAdminRoles:(state,action)=>{
            state.allAdminRoles=action.payload;
        },
        setSearchRoleByText:(state,action)=>{
            state.searchRoleByText=action.payload;
        },
        setAllAppliedRoles:(state,action)=>{
            state.allAppliedRoles=action.payload;
        }
    }
});

export const {
     setAllRoles,
     setSingleRole,
     setAllAdminRoles,
     setSearchRoleByText,
     setAllAppliedRoles} = roleSlice.actions;
export default roleSlice.reducer;