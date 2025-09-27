import {createSlice} from '@reduxjs/toolkit'


const teamSlice=createSlice({
    name:'hackteam',
    initialState:{
        singleTeam:null,
        teams:[],
    },
    reducers:{
        setSingleTeam:(state,action)=>{
            state.singleTeam=action.payload;
        },
        setGroups:(state,action)=>{
            state.hackteam=action.payload;
        }
    }
});

export const {setSingleTeam,setGroups}=teamSlice.actions;
export default teamSlice.reducer;