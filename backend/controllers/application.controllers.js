import {Application} from "../models/application.model.js";
import { Role } from "../models/role.model.js";
export const applyRole=async(req,res)=>{
    try{
        const userId=req.id;
        const roleId=req.params.id;
        if(!roleId){
            return res.status(400).json({
                message:"role is required to apply",
                success:false
            });
        }
        const existingApplication=await Application.findOne({role:roleId,hackApplicant:userId});
        console.log(existingApplication);
        if(existingApplication){
            return res.status(400).json({
                message:"You have already applied for this role",
                success:false
            });
        }
        const roleApply=await Role.findById(roleId);
        if(!roleApply){
            return res.status(400).json({
                message:"Role not found",
                success:false
            })
        }
        //create a apllication for the role
        const newApplication=await Application.create({
            role:roleId,
            hackApplicant:userId
        });
        roleApply.applications.push(newApplication._id);
         await newApplication.save();
        await roleApply.save();
        return res.status(201).json({
            message:"Role applied successfully",
            success:true
        })


    }
    
    catch(error){
        console.log(error);
    }
};




export const getAppliedRole=async(req,res)=>{
    try{
        const userId=req.id;
        const application=await Application.find({hackApplicant:userId}).sort({createdAt:-1}).populate({
            path:"role",
            options:{sort:{createdAt:-1}},
            populate:{
                path:'hackTeam',
                options:{sort:{createdAt:-1}}

            }
        });
        if(!application){
            return res.status(404).json({
                message:"No Application were found",
                success:false

            });
        }
        return res.status(200).json({
            application,
            success:true
        });


    

    }
    catch(error){
        console.log(error);
    }
}
//Team lead to knowt the candidates applied
export const getApplicants=async(req,res)=>{
    try{
        const roleId=req.params.id;
        const role=await Role.findById(roleId).populate({
            path:"applications",
            options:{sort:{createdAt:-1}},
            populate:{
                path:'hackApplicant'
            }
        });
        if(!role){
            return res.status(404).json({
                message:'Role Not Found',
                success:false
            });
        }
        return res.status(200).json({
            role,
            success:true
        });

    }
    catch(error){
        console.log(error);
    }

}
export const updateStatus =async(req,res)=>{
    try{
        const {status}=req.body;
        const applicationId=req.params.id;
        if(!status){
            return res.status(404).json({
                message:'Status is required',
                success:false
            });
            
        }
        const application =await Application.findOne({_id:applicationId});
        if(!application){
            return res.status(404).json({
                message:"Application not found",
                succes:false
            });
        }
        application.status=status.toLowerCase();
        await application.save();
        return res.status(200).json({
            message:"Status updated successfully.",
            succes:true
        });


    }
    catch(error){
        console.log(error);
    }
}