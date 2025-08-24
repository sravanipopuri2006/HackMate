import express from 'express';
import isAuthenticated from '../middlewares/isAuthenticated.js';
import { getAdminRole, getRoleById, postRole ,getAllRoles} from '../controllers/role.controller.js';

const router=express.Router();

router.route("/post").post(isAuthenticated,postRole);
router.route("/get").get(isAuthenticated,getAllRoles);
router.route("/getadminroles").get(isAuthenticated,getAdminRole);
router.route("/get/:id").get(isAuthenticated,getRoleById);

export default router;