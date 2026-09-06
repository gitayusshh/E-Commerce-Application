import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import morgan from "morgan";
import { connectDB } from "./config/db.js";
import auth from "./routes/auth.js";
import products from "./routes/products.js";
import categories from "./routes/categories.js";
import cart from "./routes/cart.js";
import orders from "./routes/orders.js";
import users from "./routes/users.js";
import { notFound, errorHandler } from "./middleware/error.js";
dotenv.config();
await connectDB();
const app = express();
// app.use(cors({ origin: process.env.CLIENT_URL || "http://localhost:5173" }));
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://e-commerce-application-nine-theta.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());
app.use(morgan("dev"));
app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/auth", auth);
app.use("/api/products", products);
app.use("/api/categories", categories);
app.use("/api/cart", cart);
app.use("/api/orders", orders);
app.use("/api/users", users);
app.use(notFound);
app.use(errorHandler);
app.listen(process.env.PORT || 5000, () =>
  console.log(`API running on ${process.env.PORT || 5000}`),
);
