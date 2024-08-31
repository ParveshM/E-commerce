import { Router } from "express";
import { adminLogin } from "../controllers/adminController";
import { userLoginValidator } from "../validators/authValidator";

const router = Router();

router.post("/login", userLoginValidator, adminLogin);

export default router;
