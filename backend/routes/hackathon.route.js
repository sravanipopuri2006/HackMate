import express from "express";
import {addHackathon,updateHackathon,getHackathons,deleteHackathon, getHackathonById} from "../controllers/hackathon.controllers.js"
import isAuthenticated from "../middlewares/isAuthenticated.js";
const router=express.Router();

router.route("/add").post(isAuthenticated,addHackathon);
router.route("/update/:id").put(isAuthenticated,updateHackathon);
router.route("/get").get(isAuthenticated,getHackathons);
router.route("/delete/:id").delete(isAuthenticated,deleteHackathon);
router.route("/get/:id").get(isAuthenticated,getHackathonById);
export default router;