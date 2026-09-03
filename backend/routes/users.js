import { Router } from "express";
import {
  users,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";
import { protect, adminOnly } from "../middleware/auth.js";
const r = Router();
r.use(protect, adminOnly);
r.get("/", users);
r.patch("/:id", updateUser);
r.delete("/:id", deleteUser);
export default r;
