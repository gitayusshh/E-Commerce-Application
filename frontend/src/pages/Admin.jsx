import { useEffect, useState } from "react";
import api from "../services/api";
export default function Admin() {
  const [products, setProducts] = useState([]),
    [orders, setOrders] = useState([]),
    [users, setUsers] = useState([]),
    [cats, setCats] = useState([]);
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    image: "",
  });
  const load = async () => {
    const [p, o, u, c] = await Promise.all([
      api.get("/products?limit=100"),
      api.get("/orders"),
      api.get("/users"),
      api.get("/categories"),
    ]);
    setProducts(p.data.items);
    setOrders(o.data);
    setUsers(u.data);
    setCats(c.data);
  };
  useEffect(() => {
    load();
  }, []);
  const add = async (e) => {
    e.preventDefault();
    await api.post("/products", {
      ...form,
      price: +form.price,
      stock: +form.stock,
    });
    setForm({
      name: "",
      price: "",
      stock: "",
      category: "",
      description: "",
      image: "",
    });
    load();
  };
  const del = async (id) => {
    if (confirm("Delete product?")) {
      await api.delete("/products/" + id);
      load();
    }
  };
  const status = async (id, s) => {
    await api.patch("/orders/" + id, { status: s });
    load();
  };
  return (
    <section className="section admin">
      <h1>Admin Panel</h1>
      <h2>Add Product</h2>
      <form className="adminform" onSubmit={add}>
        {["name", "price", "stock", "image", "description"].map((k) => (
          <input
            key={k}
            placeholder={k}
            value={form[k]}
            onChange={(e) => setForm({ ...form, [k]: e.target.value })}
            required={["name", "price", "stock"].includes(k)}
          />
        ))}
        <select
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        >
          <option value="">Category</option>
          {cats.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <button className="btn">Add Product</button>
      </form>
      <h2>Inventory</h2>
      {products.map((p) => (
        <div className="adminrow" key={p._id}>
          {p.name} — ₹{p.price} — Stock {p.stock}
          <button onClick={() => del(p._id)}>Delete</button>
        </div>
      ))}

      <h2>Order Management</h2>

      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map((o) => (
        <div className="adminrow order-admin" key={o._id}>
          <div>
            <b>Order #{o._id.slice(-8)}</b>

            <p>Name: {o.shippingAddress?.fullName}</p>

            <p>Customer Name: {o.user?.name}</p>

            <p>Amount: ₹{o.totalAmount}</p>

            <p>Payment: {o.paymentMethod}</p>

            <p>Payment Status: {o.paymentStatus}</p>

            <p>
              Current Status: <b>{o.status}</b>
            </p>
          </div>

          <div className="order-actions">
            {o.status === "Placed" && (
              <button
                className="btn"
                onClick={() => status(o._id, "Processing")}
              >
                Start Processing
              </button>
            )}

            {o.status === "Processing" && (
              <button className="btn" onClick={() => status(o._id, "Shipped")}>
                Mark as Shipped
              </button>
            )}

            {o.status === "Shipped" && (
              <button
                className="btn"
                onClick={() => status(o._id, "Out for Delivery")}
              >
                Out for Delivery
              </button>
            )}

            {o.status === "Out for Delivery" && (
              <button
                className="btn"
                onClick={() => status(o._id, "Delivered")}
              >
                Mark as Delivered
              </button>
            )}

            {o.status === "Delivered" && (
              <button className="btn" disabled>
                ✓ Delivered
              </button>
            )}
          </div>
        </div>
      ))}

      <h2>All Orders</h2>

      {orders.map((o) => (
        <div className="adminrow" key={o._id}>
          <div>
            <b>Order #{o._id.slice(-8)}</b>

            <p>Customer: {o.user?.name}</p>

            <p>Amount: ₹{o.totalAmount}</p>

            <p>
              Current Status: <b>{o.status}</b>
            </p>
          </div>

          <select
            value={o.status}
            onChange={(e) => status(o._id, e.target.value)}
          >
            <option value="Placed">Placed</option>
            <option value="Processing">Processing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out for Delivery">Out for Delivery</option>
            <option value="Delivered">Delivered</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
      ))}

      <h2>Users</h2>
      {users.map((u) => (
        <div className="adminrow" key={u._id}>
          {u.name} — {u.email} — {u.role}
        </div>
      ))}
    </section>
  );
}
