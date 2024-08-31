import { Router } from "express";
import authenticateUser, { authorizeRole } from "../middlewares/auth";
import {
  createProduct,
  getProducts,
  singleProduct,
} from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.get("/:productId", singleProduct);
router.post("/", [authenticateUser, authorizeRole("admin")], createProduct);

export default router;
