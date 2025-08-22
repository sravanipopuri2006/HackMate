import express from "express";
import { getTeamById, registerTeam } from "../controllers/hackteam.controller";
import isAuthenticated from "../middlewares/isAuthenticated.js";


const router = express.Router();

router.route("/register").post(isAuthenticated,registerTeam);
router.route("/get").post(isAuthenticated,getTeam);
router.route("/get/:id").get(isAuthenticated,getTeamById);
router.route("/update/:id").post(isAuthenticated,updateProfile);

export default router;