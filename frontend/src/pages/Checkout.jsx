import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
export default function Checkout() {
  const { total, load } = useCart();
  const nav = useNavigate();
  const [err, setErr] = useState("");
  const submit = async (e) => {
    e.preventDefault();
    try {
      const d = Object.fromEntries(new FormData(e.target));
      const shippingAddress = {
        fullName: d.fullName,
        phone: d.phone,
        address: d.address,
        city: d.city,
        state: d.state,
        pincode: d.pincode,
      };
      const r = await api.post("/orders", {
        shippingAddress,
        paymentMethod: d.paymentMethod,
      });
      await load();
      nav("/orders/" + r.data._id);
    } catch (x) {
      setErr(x.response?.data?.message || "Could not place order");
    }
  };
  return (
    <section className="auth">
      <form onSubmit={submit}>
        <h1>Checkout</h1>
        {err && <p className="error">{err}</p>}
        <input name="fullName" placeholder="Full name" required />
        <input name="phone" placeholder="Phone" required />
        <textarea name="address" placeholder="Address" required />
        <input name="city" placeholder="City" required />
        <input name="state" placeholder="State" required />
        <input
          name="pincode"
          placeholder="Pincode"
          pattern="[0-9]{6}"
          required
        />
        <select name="paymentMethod">
          <option value="COD">Cash on Delivery</option>
          <option value="ONLINE">Online Payment (gateway integration)</option>
        </select>
        <h3>Order Total: ₹{total}</h3>
        <button className="btn">Place Order</button>
      </form>
    </section>
  );
}
