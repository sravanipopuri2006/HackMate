import mongoose from "mongoose";
const hackTeamSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    description: { 
        type: String,
    },
    website:
    {
        type: String,
    },
    hackathonlevel: {
        type: String,  
    },
    logo: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true}); 
export const HackTeam=mongoose.model('HackTeam',hackTeamSchema);
