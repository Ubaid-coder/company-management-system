import { Router } from "express";
import { profile } from "../controllers/user.controller.ts";

const router = Router();

router.get('/profile', profile);

export default router;