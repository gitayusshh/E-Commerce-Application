import { Router } from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { protect, adminOnly } from "../middleware/auth.js";
const r = Router();
r.get("/", getCategories);
r.post("/", protect, adminOnly, createCategory);
r.put("/:id", protect, adminOnly, updateCategory);
r.delete("/:id", protect, adminOnly, deleteCategory);
export default r;
