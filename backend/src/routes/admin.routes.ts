import { Router } from "express";
import { authenticated } from "../middleware/auth.middleware.ts";
import { authorizeRole } from "../middleware/role.middleware.ts";
import { adminPanel } from "../controllers/admin.controller.ts";

const router = Router();

router.get('/dashboard', authenticated, authorizeRole, adminPanel);

export default router;