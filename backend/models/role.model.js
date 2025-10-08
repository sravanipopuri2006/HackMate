import mongoose from "mongoose";
const roleSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    requirements:[{type:String}],
    hackathonName:{
        type:String,
        required:true

    },
   
    hackathonType:{
        type:String,
        required:true
    },

   
    position:{
        type:String,
        required:true
    },
   
    experienceLevel:{
        type:String,
        required:true
    },
    hackTeamId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'HackTeam',
        required:true
    },
    created_by:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    applications:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Application'
    }]

},{timestamps: true});
export const Role=mongoose.model('Role',roleSchema);