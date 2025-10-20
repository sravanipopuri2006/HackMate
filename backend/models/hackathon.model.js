import mongoose from "mongoose";
const hackathonSchema = new mongoose.Schema({
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
    date:{
        type:String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},{timestamps: true}); 
export const Hackathon=mongoose.model('Hackathon',hackathonSchema);
