import cookieParser from "cookie-parser";
import express, { urlencoded } from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
import userRoute from "./routes/user.route.js";
import teamRoute from "./routes/hackteam.route.js"; 
import roleRoute from "./routes/role.route.js";
import applicationRoute from "./routes/application.route.js";
import hacakathonRoute from "./routes/hackathon.route.js";



dotenv.config({});

const app=express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());

const corsOptions={
    origin:'http://localhost:5173',
    credentials:true
}
//middlewares
app.use(cors(corsOptions));

const port=process.env.port || 3000;

// api's
app.use("/api/v1/user",userRoute);
app.use("/api/v1/hackteam",teamRoute);
app.use("/api/v1/role",roleRoute);
app.use("/api/v1/application",applicationRoute);
app.use("/api/v1/hackathon",hacakathonRoute);


app.listen(port,()=>{
    connectDB();
    console.log("App is running successfully...");
    
})
