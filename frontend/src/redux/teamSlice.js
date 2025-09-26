import {createSlice} from '@reduxjs/toolkit'

const teamSlice=createSlice({
    name:'team',
    initialState:{
        singleTeam:null,
    },
    reducers:{
        setSingleTeam:(state,action)=>{
            state.singleTeam=action.payload;
        }
    }
});

export const {setSingleTeam}=teamSlice.actions;
export default teamSlice.reducer;