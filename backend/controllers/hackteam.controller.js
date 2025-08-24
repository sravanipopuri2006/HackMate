import { HackTeam } from "../models/hackteam.model.js";
export const registerTeam=async(req,res)=>{
    try{
        const{teamName}=req.body;
        if(!teamName){
            return res.status(400).json({
                message:"Team name is required",
                success:false
            });


        }
        let hackTeam=await HackTeam.findOne({name:teamName});
        if(hackTeam){
            return res.status(400).json({
                message:"Team is already registered",
                success:false
            });
        }
        hackTeam=await HackTeam.create({
            name:teamName,
            userId:req.id
            
        });
        return res.status(201).json({
            message:"Team registed successfully",
            hackTeam,
            success:true
        })


    }
    catch(error){
        console.log(error);

    }
}
export const getTeam=async(req,res)=>{
    try{
        const userId=req.id;
        const teams=await HackTeam.find({userId});
        if(!teams){
            return res.status(404).json({
                message:"Teams not found",
                success:false

            });

        }
        return res.status(200).json({
            
            teams,
            success:true
        })

    }
    catch(error){
        console.log(error);
    }
}
export const getTeamById=async(req,res)=>{
    try{
        const teamId=req.params.id;
        const team=await HackTeam.findById(teamId);
        if(!team){
            return res.status(404).json({
                message:"Team not found",
                success:false

            });
            

        }
        return res.status(200).json({
            team,
            success:true
        });
    }
    catch(error){
        console.log(error);
    }
}
export const updateProfile=async(req,res)=>{
    try{
        const {name,description,website,hackathonlevel}=req.body;
        const file=req.file;
        const updateData={name,description,website,hackathonlevel};
        const team=await HackTeam.findByIdAndUpdate(req.params.id,updateData,{new:true});
        if(!team){
            return res.status(404).json({
                message:"Team not found",
                success:false
            });
        }
        return res.status(200).json({
            message:"Profile Updated..",
            success:true
        })


    }
    catch(error){
        console.log(error);
    }

}

