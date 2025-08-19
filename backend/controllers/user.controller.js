import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullname, email, phoneNumber, password, role } = req.body;
        if (!fullname || !email || !phoneNumber || !password || !role) {
            return res.status(400).json({ 
                message: "All fields are required", 
                success:false

            });
        };
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ 
                message: "User already exists with this email.", 
                success:false,
            })
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({
            fullname,
            email,  
            phoneNumber,
            password: hashedPassword,
            role,

        })
    }
    catch (error) {

    }
}
export const login = async (req, res) => {
    try {
        const { email, password,role } = req.body;
        if (!email || !password || !role) {
            return res.status(400).json({ 
                message: "Email and password are required", 
                success:false
            });
            
        };
        
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({   
                message:"Incorrect email or password", 
                success:false,
            })          
        }
        const isPasswordMatch = await bcrypt.compare(password, user.password);  
        if (!isPasswordMatch) {
            return res.status(400).json({ 
                message: "Incorrect email or password.", 
                success:false,
            })
        };
        // check role is correct or not
        if (user.role !== role) {
            return res.status(400).json({ 
                message: "Account does not exist with current role.", 
                success:false
            })
        };
        const tokenData = {
            userId: user._id,
        }
        
     } catch (error) {
        return res.status(500).json({ 
            message: "Internal server error", 
            success:false
        });
    }
}