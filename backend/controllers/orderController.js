import Order from "../models/Order.js";
import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
export const createOrder = async (req, res, next) => {
  try {
    const c = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
    );
    if (!c?.items.length)
      return res.status(400).json({ message: "Cart is empty" });
    for (const x of c.items)
      if (x.quantity > x.product.stock)
        return res
          .status(400)
          .json({ message: `Insufficient stock for ${x.product.name}` });
    const items = c.items.map((x) => ({
      product: x.product._id,
      name: x.product.name,
      price: x.product.discountPrice || x.product.price,
      quantity: x.quantity,
      image: x.product.image,
    }));
    const totalAmount = items.reduce((s, x) => s + x.price * x.quantity, 0);
    const order = await Order.create({
      user: req.user._id,
      items,
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      totalAmount,
    });
    for (const x of c.items)
      await Product.findByIdAndUpdate(x.product._id, {
        $inc: { stock: -x.quantity },
      });
    c.items = [];
    await c.save();
    res.status(201).json(order);
  } catch (e) {
    next(e);
  }
};
export const myOrders = async (req, res, next) => {
  try {
    res.json(await Order.find({ user: req.user._id }).sort("-createdAt"));
  } catch (e) {
    next(e);
  }
};
export const getOrder = async (req, res, next) => {
  try {
    const o = await Order.findById(req.params.id).populate(
      "user",
      "name email",
    );
    if (!o) return res.status(404).json({ message: "Order not found" });
    if (
      req.user.role !== "admin" &&
      o.user._id.toString() !== req.user._id.toString()
    )
      return res.status(403).json({ message: "Forbidden" });
    res.json(o);
  } catch (e) {
    next(e);
  }
};
export const allOrders = async (req, res, next) => {
  try {
    res.json(
      await Order.find().populate("user", "name email").sort("-createdAt"),
    );
  } catch (e) {
    next(e);
  }
};
export const updateOrder = async (req, res, next) => {
  try {
    const o = await Order.findByIdAndUpdate(
      req.params.id,
      { status: req.body.status, paymentStatus: req.body.paymentStatus },
      { new: true },
    );
    res.json(o);
  } catch (e) {
    next(e);
  }
};
