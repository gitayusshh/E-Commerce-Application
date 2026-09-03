import { Router } from "express";
import {
  getCart,
  updateCart,
  clearCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/auth.js";
const r = Router();
r.use(protect);
r.get("/", getCart);
r.put("/", updateCart);
r.delete("/", clearCart);
export default r;
