import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
import "./components.css";
export default function ProductCard({ p }) {
  const { change } = useCart();
  const { user } = useAuth();
  return (
    <article className="card">
      <img
        src={p.image || "https://via.placeholder.com/400x300?text=Product"}
      />
      <div>
        <small>{p.category?.name}</small>
        <h3>{p.name}</h3>
        <p>{p.description?.slice(0, 70)}</p>
        <b>₹{p.discountPrice || p.price}</b>
        {p.discountPrice && <del> ₹{p.price}</del>}
        <div className="actions">
          <Link className="btn secondary" to={"/products/" + p._id}>
            Details
          </Link>
          {user && (
            <button
              className="btn"
              disabled={!p.stock}
              onClick={() => change(p._id, 1)}
            >
              {p.stock ? "Add to Cart" : "Out of Stock"}
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
