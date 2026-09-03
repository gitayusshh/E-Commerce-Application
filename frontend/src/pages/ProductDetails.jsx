import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useCart } from "../context/CartContext";
export default function ProductDetails() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const { change } = useCart();
  useEffect(() => {
    api.get("/products/" + id).then((r) => setP(r.data));
  }, [id]);
  if (!p) return <section className="section">Loading...</section>;
  return (
    <section className="detail">
      <img
        src={p.image || "https://via.placeholder.com/600x450?text=Product"}
      />
      <div>
        <small>{p.category?.name}</small>
        <h1>{p.name}</h1>
        <p>{p.description}</p>
        <h2>
          ₹{p.discountPrice || p.price}{" "}
          {p.discountPrice && <del>₹{p.price}</del>}
        </h2>
        <p>Stock: {p.stock}</p>
        <button
          className="btn"
          disabled={!p.stock}
          onClick={() => change(p._id, 1)}
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
}
