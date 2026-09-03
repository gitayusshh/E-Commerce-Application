import Product from "../models/Product.js";
export const getProducts = async (req, res, next) => {
  try {
    const {
      search,
      category,
      minPrice,
      maxPrice,
      featured,
      trending,
      offer,
      sort = "createdAt",
      order = "desc",
      page = 1,
      limit = 8,
    } = req.query;
    const q = {};
    if (search) q.name = { $regex: search, $options: "i" };
    if (category) q.category = category;
    if (featured === "true") q.featured = true;
    if (trending === "true") q.trending = true;
    if (offer === "true") q.offer = true;
    if (minPrice || maxPrice)
      q.price = {
        ...(minPrice && { $gte: +minPrice }),
        ...(maxPrice && { $lte: +maxPrice }),
      };
    const skip = (+page - 1) * +limit;
    const [items, total] = await Promise.all([
      Product.find(q)
        .populate("category")
        .sort({ [sort]: order === "asc" ? 1 : -1 })
        .skip(skip)
        .limit(+limit),
      Product.countDocuments(q),
    ]);
    res.json({
      items,
      total,
      page: +page,
      pages: Math.max(1, Math.ceil(total / +limit)),
    });
  } catch (e) {
    next(e);
  }
};
export const getProduct = async (req, res, next) => {
  try {
    const p = await Product.findById(req.params.id).populate("category");
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (e) {
    next(e);
  }
};
export const createProduct = async (req, res, next) => {
  try {
    res.status(201).json(await Product.create(req.body));
  } catch (e) {
    next(e);
  }
};
export const updateProduct = async (req, res, next) => {
  try {
    const p = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!p) return res.status(404).json({ message: "Product not found" });
    res.json(p);
  } catch (e) {
    next(e);
  }
};
export const deleteProduct = async (req, res, next) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: "Product deleted" });
  } catch (e) {
    next(e);
  }
};
