//CRUD ON HACKATHONS Model
import mongoose from "mongoose";
import {Hackathon} from "../models/hackathon.model.js";
export const addHackathon=async(req,res)=>{
    try{
        const {name,description,website,hackathonlevel,date}=req.body;
        const userId=req.id;
        if(!name || !description || !website || !hackathonlevel || !date || !userId){
            return res.status(400).json({
                message:"All Fields are required",
                success:false
            });

        }
        const hackathon=await Hackathon.create({
            name,description,website,hackathonlevel,date,userId
        });
        if(hackathon){
            return res.status(200).json({
            message:"Hackathon created successfully",
            hackathon,
            success:true
        });

        }
        
    }
    catch(error){
        console.log(error);
    }
}
export const updateHackathon=async(req,res)=>{
    try{
        const hackathonId=req.params.id;
        const {name,description,website,hackathonlevel,date}=req.body;
        if(!hackathonId){
            return res.status(400).json({
                message:"Hackathon id is required",
                success:false
            });
        }
        const hackathon=await Hackathon.findByIdAndUpdate(hackathonId,{name,description,website,hackathonlevel,date},{new:true});
        if(!hackathon){
            return res.status(404).json({
                message:"Hackathon not found",
                success:false
            })
        }
        return res.status(200).json({
            message:"Hackathon updated successfully",
            hackathon,
            success:true
        });
        

       
    }
    catch(error){
        console.log(error);
    }
}
export const getHackathons=async(req,res)=>{
    try{
        const hackathons=await Hackathon.find().sort({createdAt:-1});
        if(hackathons){
            return res.status(200).json({
            hackathons,
            success:true
        });

        }
        
    }
    catch(error){
        console.log(error);
    }
}
export const deleteHackathon=async(req,res)=>{
    try{
        const hackathonId=req.params.id;
        if(!hackathonId){
            return res.status(400).json({
                message:"Hackathon id is required",
                success:false
            });
        }
        const hackathon=await Hackathon.findOneAndDelete({_id:hackathonId});
        if(hackathon){
            return res.status(200).json({
                message:"Hackathon deleted successfully",
                success:true
            });

        }
        return res.status(404).json({
            message:"Hackathon not found",
            success:false
        });
    }
    catch(error){
        console.log(error);
    }
}
export const getHackathonById=async(req,res)=>{
    try{
        const hackathonId=req.params.id;
        if(!hackathonId){
            return res.status(400).json({
                message:"Hackathon Id is required",
                success:false
            });
        }
        const hackathon=await Hackathon.findById(hackathonId);
        if(!hackathon){
            return res.status(404).json({
                message:"Hackathon not found",
                success:false
            });
        }
        return res.status(200).json({
            message:"Hackathon fetched successfully",
            hackathon,
            success:true
        });
    }
    catch(error){
        console.log(error);
    }
}