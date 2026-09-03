import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import "./components.css";
export default function Navbar() {
  const { user, logout } = useAuth();
  const { count } = useCart();
  const nav = useNavigate();
  return (
    <nav>
      <Link className="logo" to="/">
        ShopKart
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          nav("/products?search=" + encodeURIComponent(e.target.q.value));
        }}
      >
        <input name="q" placeholder="Search products..." />
      </form>
      <div className="navlinks">
        <Link to="/products">Products</Link>
        <Link to="/cart">Cart ({count})</Link>
        {user ? (
          <>
            <Link to="/orders">Orders</Link>
            {user.role === "admin" && <Link to="/admin">Admin</Link>}
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
}
