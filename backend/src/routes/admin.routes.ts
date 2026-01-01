import { Router } from "express";
import { adminPanel, blockUser, unblockUser, updateRole } from "../controllers/admin.controller.ts";
import { register } from "../controllers/auth.controller.ts";

const router = Router();

router.get('/dashboard', adminPanel);
router.post('/adduser', register)
router.patch('/changerole', updateRole); 
router.patch('/block/:id', blockUser);
router.patch('/unblock/:id', unblockUser);

export default router;