import {createSlice} from '@reduxjs/toolkit'

const teamSlice=createSlice({
    name:'hackteam',
    initialState:{
        singleTeam:null,
        teams:[],
        searchTeamByText:"",
    },
    reducers:{
        setSingleTeam:(state,action)=>{
            state.singleTeam=action.payload;
        },
        setTeams:(state,action)=>{
            state.teams=action.payload;
            console.log(state.teams);
        },
        setSearchTeamByText:(state,action)=>{
            state.searchTeamByText=action.payload;
        }
    }
});

export const {setSingleTeam,setTeams,setSearchTeamByText}=teamSlice.actions;
export default teamSlice.reducer;