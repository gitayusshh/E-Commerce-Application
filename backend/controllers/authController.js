import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
const token = (u) =>
  jwt.sign({ id: u._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
export const register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });
    if (await User.findOne({ email }))
      return res.status(409).json({ message: "Email already registered" });
    const user = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 12),
    });
    res
      .status(201)
      .json({
        token: token(user),
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      });
  } catch (e) {
    next(e);
  }
};
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await bcrypt.compare(password, user.password)))
      return res.status(401).json({ message: "Invalid email or password" });
    res.json({
      token: token(user),
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (e) {
    next(e);
  }
};
export const me = async (req, res) => res.json({ user: req.user });
