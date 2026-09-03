import { Router } from "express";
import {
  createOrder,
  myOrders,
  getOrder,
  allOrders,
  updateOrder,
} from "../controllers/orderController.js";
import { protect, adminOnly } from "../middleware/auth.js";
const r = Router();
r.post("/", protect, createOrder);
r.get("/mine", protect, myOrders);
r.get("/", protect, adminOnly, allOrders);
r.get("/:id", protect, getOrder);
r.patch("/:id", protect, adminOnly, updateOrder);
export default r;

