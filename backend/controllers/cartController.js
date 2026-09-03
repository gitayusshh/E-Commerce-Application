import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
export const getCart = async (req, res, next) => {
  try {
    const c = await Cart.findOne({ user: req.user._id }).populate(
      "items.product",
    );
    res.json(c || { user: req.user._id, items: [] });
  } catch (e) {
    next(e);
  }
};
export const updateCart = async (req, res, next) => {
  try {
    let c = await Cart.findOne({ user: req.user._id });
    if (!c) c = await Cart.create({ user: req.user._id, items: [] });
    const { productId, quantity } = req.body;
    const p = await Product.findById(productId);
    if (!p) return res.status(404).json({ message: "Product not found" });
    const i = c.items.find((x) => x.product.toString() === productId);
    if (quantity <= 0) {
      c.items = c.items.filter((x) => x.product.toString() !== productId);
    } else if (i) i.quantity = Math.min(quantity, p.stock);
    else
      c.items.push({
        product: productId,
        quantity: Math.min(quantity, p.stock),
      });
    await c.save();
    res.json(await c.populate("items.product"));
  } catch (e) {
    next(e);
  }
};
export const clearCart = async (req, res, next) => {
  try {
    await Cart.findOneAndUpdate({ user: req.user._id }, { items: [] });
    res.json({ message: "Cart cleared" });
  } catch (e) {
    next(e);
  }
};
