import express from "express";
import { getTeamById, registerTeam,getTeam,updateProfile } from "../controllers/hackteam.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import {singleUpload} from "../middlewares/multer.js"


const router = express.Router();

router.route("/register").post(isAuthenticated,registerTeam);
router.route("/get").get(isAuthenticated,getTeam);
router.route("/get/:id").get(isAuthenticated,getTeamById);
router.route("/update/:id").put(isAuthenticated,singleUpload,updateProfile);
export default router;