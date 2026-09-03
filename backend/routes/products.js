import { Router } from "express";
import {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/productController.js";
import { protect, adminOnly } from "../middleware/auth.js";
const r = Router();
r.get("/", getProducts);
r.get("/:id", getProduct);
r.post("/", protect, adminOnly, createProduct);
r.put("/:id", protect, adminOnly, updateProduct);
r.delete("/:id", protect, adminOnly, deleteProduct);
export default r;
