import { Router } from "express";
import { adminPanel, updateUser, findUser } from "../controllers/admin.controller.ts";
import { register } from "../controllers/auth.controller.ts";

const router = Router();

router.get('/dashboard', adminPanel);
router.get('/user/:id', findUser);
router.post('/adduser', register);
router.put('/updateuser/:id', updateUser); 

export default router;