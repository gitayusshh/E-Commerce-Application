import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../context/AuthContext";
export default function Cart() {
  const { cart, total, change } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();
  if (!user)
    return (
      <section className="section">
        <h1>Please login to view cart</h1>
        <Link className="btn" to="/login">
          Login
        </Link>
      </section>
    );
  return (
    <section className="section">
      <h1>Your Cart</h1>
      {!cart.items?.length ? (
        <p>
          Your cart is empty. <Link to="/products">Continue shopping</Link>
        </p>
      ) : (
        <>
          <div className="cart">
            {cart.items.map((i) => (
              <div className="cartrow" key={i.product._id}>
                <img
                  src={i.product.image || "https://via.placeholder.com/100"}
                />
                <div>
                  <h3>{i.product.name}</h3>
                  <p>₹{i.product.discountPrice || i.product.price}</p>
                </div>
                <div>
                  <button onClick={() => change(i.product._id, i.quantity - 1)}>
                    -
                  </button>
                  <b>{i.quantity}</b>
                  <button onClick={() => change(i.product._id, i.quantity + 1)}>
                    +
                  </button>
                  <button onClick={() => change(i.product._id, 0)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="summary">
            <h2>Total: ₹{total}</h2>
            <button
  className="btn"
  onClick={() => {
    if (!user) {
      nav("/login");
    } else {
      nav("/checkout");
    }
  }}
>
  Proceed to Checkout
</button>
          </div>
        </>
      )}
    </section>
  );
}
