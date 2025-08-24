import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import {applyRole, getApplicants, getAppliedRole, updateStatus } from '../controllers/application.controllers.js';


const router=express.Router();
router.route("/apply/:id").get(isAuthenticated,applyRole);
router.route("/get").get(isAuthenticated,getAppliedRole);
router.route("/:id/applicants").get(isAuthenticated,getApplicants);
router.route("/status/:id/update").post(isAuthenticated,updateStatus);



export default router;