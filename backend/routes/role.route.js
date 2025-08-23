import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getAdminRole, postRole } from '../controllers/role.controller.js';

const router=express.Router();

router.route("/post").post(isAuthenticated,postRole);
router.route("/get").get(isAuthenticated,getAllRoles);
router.route("/getadminroles").post(isAuthenticated,getAdminRole);
router.route("/:id").post(isAuthenticated,postRole);

export default router;