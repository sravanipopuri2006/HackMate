import {createSlice} from '@reduxjs/toolkit'


const teamSlice=createSlice({
    name:'hackteam',
    initialState:{
        singleTeam:null,
        teams:[],
    },
    reducers:{
        setSingleGroup:(state,action)=>{
            state.singleTeam=action.payload;
        },
        setGroups:(state,action)=>{
            state.teams=action.payload;
        }
    }
});

export const {setSingleGroup,setGroups}=teamSlice.actions;
export default teamSlice.reducer;