import mongoose from "mongoose";    

const applicationSchema = new mongoose.Schema({
    role: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Role',
        required: true
    },
    hackApplicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true 
    },
    status:{
        type: String,
        enum: ['pending', 'accepted', 'rejected'],
        default: 'pending',
        required:true
     
    }
},{timestamps: true});

export const Application = mongoose.model('Application', applicationSchema);