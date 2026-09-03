import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";
export function Orders() {
  const [o, setO] = useState([]);
  useEffect(() => {
    api.get("/orders/mine").then((r) => setO(r.data));
  }, []);
  return (
    <section className="section">
      <h1>Order History</h1>
      {o.map((x) => (
        <div className="order" key={x._id}>
          <div>
            <b>#{x._id.slice(-8)}</b>
            <p>{new Date(x.createdAt).toLocaleString()}</p>
          </div>
          <strong>₹{x.totalAmount}</strong>
          <span>{x.status}</span>
          <Link to={"/orders/" + x._id}>View</Link>
        </div>
      ))}
    </section>
  );
}
export function OrderDetails() {
  const { id } = useParams();
  const [o, setO] = useState(null);
  useEffect(() => {
    api.get("/orders/" + id).then((r) => setO(r.data));
  }, [id]);
  if (!o) return <section className="section">Loading...</section>;
  return (
    <section className="section">
      <h1>Order #{o._id.slice(-8)}</h1>
      <div className="tracking">
        <b>{o.status}</b>
        <span>
          Placed → Processing → Shipped → Out for Delivery → Delivered
        </span>
      </div>
      <h2>Items</h2>
      {o.items.map((i, n) => (
        <p key={n}>
          {i.name} × {i.quantity} — ₹{i.price * i.quantity}
        </p>
      ))}
      <h2>Total ₹{o.totalAmount}</h2>
      <h3>Delivery</h3>
      <p>
        {o.shippingAddress.fullName}, {o.shippingAddress.address},{" "}
        {o.shippingAddress.city}, {o.shippingAddress.state} -{" "}
        {o.shippingAddress.pincode}
      </p>
    </section>
  );
}
