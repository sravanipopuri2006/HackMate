import {createSlice} from "@reduxjs/toolkit";
const hackathonSlice=createSlice({
    name:'hackathon',
    initialState:{
        hackathons:[],

    },
    reducers:{
        setHackathons:(state,action)=>{
            state.hackathons=action.payload;
        }
    }
});
export const {setHackathons}=hackathonSlice.actions;
export default hackathonSlice.reducer;