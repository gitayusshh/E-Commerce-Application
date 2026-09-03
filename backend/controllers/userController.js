import User from "../models/User.js";
export const users = async (req, res, next) => {
  try {
    res.json(await User.find().select("-password").sort("-createdAt"));
  } catch (e) {
    next(e);
  }
};
export const updateUser = async (req, res, next) => {
  try {
    res.json(
      await User.findByIdAndUpdate(
        req.params.id,
        { role: req.body.role },
        { new: true },
      ).select("-password"),
    );
  } catch (e) {
    next(e);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: "User deleted" });
  } catch (e) {
    next(e);
  }
};
