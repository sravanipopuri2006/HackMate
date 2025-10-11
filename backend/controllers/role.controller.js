import { Role } from "../models/role.model.js";

export const getAllRoles = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ]
            };
            const roles = await Role.find(query).populate({path:'hackTeam'}).sort({createdAt:-1});
            if (!roles)  {
                return res.status(404).json({
                    message: "No roles found",
                    success: false
                })
            };
            return res.status(200).json({
                roles,
                success: true
            })
    } catch (error) {
        console.log(error);
    }
}    
export const getRoleById = async (req, res) => {
    try {
        const roleId = req.params.id;
        const role = await Role.findById(roleId).populate({
            path:"applications"
        });
        if (!role) {
            return res.status(404).json({
                message: "Role not found",
                success: false
            })
        };
        return res.status(200).json({
            role,
            success: true
        });
    } catch (error) {
        console.log(error);
    }
} 

export const getAdminRole = async (req, res) => {
  try {
    const adminId = req.id;

    const roles = await Role.find({ created_by: adminId })
      .populate("hackTeamId") 
      .sort({ createdAt: -1 }); 

    if (!roles || roles.length === 0) {
      return res.status(404).json({
        message: "No roles found",
        success: false
      });
    }
    console.log(roles);

    return res.status(200).json({
      
      roles,
      success: true
    });
  } catch (error) {
    console.error("Error in getAdminRole:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false
    });
  }
};

export const postRole = async (req, res) => {
    try {
        const { title, description, requirements, hackathonName, hackathonType, position, hackTeamId, experienceLevel } = req.body;
        const userId = req.id;

        if (!title || !description || !requirements || !hackathonName || !position || !hackTeamId || !hackathonType || !experienceLevel) {
            return res.status(400).json({
                message: "All fields are required",
                success: false
            });
        }

        const role = await Role.create({
            title,
            description,
            requirements,
            hackathonName,
            position,
            hackathonType,
            hackTeamId,
            created_by: userId,
            experienceLevel
        });

        return res.status(201).json({
            message: "Role created successfully",
            role,
            success: true
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
};
