// import { useEffect, useState } from "react";
// import { Link, useParams } from "react-router-dom";
// import api from "../services/api";
// export function Orders() {
//   const [o, setO] = useState([]);
//   useEffect(() => {
//     api.get("/orders/mine").then((r) => setO(r.data));
//   }, []);
//   return (
//     <section className="section">
//       <h1>Order History</h1>
//       {o.map((x) => ( 
//         <div className="order" key={x._id}>
//           <div>
//             <b>#{x._id.slice(-8)}</b>
//             <p>{new Date(x.createdAt).toLocaleString()}</p>
//           </div>
//           <strong>₹{x.totalAmount}</strong>
//           <span>{x.status}</span>
//           <Link to={"/orders/" + x._id}>View</Link>
//         </div>
//       ))}
//     </section>
//   );
// }
// export function OrderDetails() {
//   const { id } = useParams();
//   const [o, setO] = useState(null);
//   useEffect(() => {
//     api.get("/orders/" + id).then((r) => setO(r.data));
//   }, [id]);
//   if (!o) return <section className="section">Loading...</section>;
//   return (
//     <section className="section">
//       <h1>Order #{o._id.slice(-8)}</h1>
//       <div className="tracking">
//         <b>{o.status}</b>
//         <span>
//           Placed → Processing → Shipped → Out for Delivery → Delivered
//         </span>
//       </div>
//       <h2>Items</h2>
//       {o.items.map((i, n) => (
//         <p key={n}>
//           {i.name} × {i.quantity} — ₹{i.price * i.quantity}
//         </p>
//       ))}
//       <h2>Total ₹{o.totalAmount}</h2>
//       <h3>Delivery</h3>
//       <p>
//         {o.shippingAddress.fullName}, {o.shippingAddress.address},{" "}
//         {o.shippingAddress.city}, {o.shippingAddress.state} -{" "}
//         {o.shippingAddress.pincode}
//       </p>
//     </section>
//   );
// }









import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import api from "../services/api";

export function Orders() {
  const [o, setO] = useState([]);

  useEffect(() => {
    api.get("/orders/mine").then((r) => setO(r.data));
  }, []);

  return (
    <section className="section orders-page">
      <div className="orders-header">
        <h1>📦 Order History</h1>
        <p>Track and manage all your orders</p>
      </div>

      {o.length === 0 && (
        <div className="empty-orders">
          <h2>No Orders Yet 📭</h2>
          <p>You haven't placed any orders yet.</p>
        </div>
      )}

      <div className="orders-list">
        {o.map((x) => (
          <div className="order-card" key={x._id}>
            <div className="order-top">
              <div>
                <span className="order-label">ORDER ID</span>
                <h3>#{x._id.slice(-8)}</h3>
                <p className="order-date">
                  📅 {new Date(x.createdAt).toLocaleString()}
                </p>
              </div>

              <span
                className={`status-badge ${x.status
                  .toLowerCase()
                  .replaceAll(" ", "-")}`}
              >
                {x.status}
              </span>
            </div>

            <div className="order-products-preview">
              {x.items.slice(0, 4).map((item, index) => (
                <img
                  key={index}
                  src={item.image}
                  alt={item.name}
                  className="order-preview-image"
                />
              ))}

              {x.items.length > 4 && (
                <div className="more-products">
                  +{x.items.length - 4}
                </div>
              )}
            </div>

            <div className="order-bottom">
              <div>
                <span className="order-label">TOTAL AMOUNT</span>
                <h2>₹{x.totalAmount}</h2>
              </div>

              <Link
                className="view-order-btn"
                to={"/orders/" + x._id}
              >
                View Details →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export function OrderDetails() {
  const { id } = useParams();
  const [o, setO] = useState(null);

  const steps = [
    "Placed",
    "Processing",
    "Shipped",
    "Out for Delivery",
    "Delivered",
  ];

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const r = await api.get("/orders/" + id);
        setO(r.data);
      } catch (error) {
        console.error(error);
      }
    };

    loadOrder();

    const interval = setInterval(loadOrder, 5000);

    return () => clearInterval(interval);
  }, [id]);

  if (!o) {
    return (
      <section className="section loading-order">
        <div>Loading your order... 📦</div>
      </section>
    );
  }

  const currentStep = steps.indexOf(o.status);

  return (
    <section className="section order-details-page">

      <div className="details-header">
        <div>
          <p className="order-label">ORDER DETAILS</p>
          <h1>Order #{o._id.slice(-8)}</h1>
        </div>

        <span
          className={`status-badge ${o.status
            .toLowerCase()
            .replaceAll(" ", "-")}`}
        >
          {o.status}
        </span>
      </div>

      {/* TRACKING */}

      <div className="tracking-card">
        <h2>🚚 Track Your Order</h2>

        <div className="tracking-container">
          {steps.map((step, index) => (
            <div className="tracking-step" key={step}>

              <div
                className={`tracking-circle ${
                  index <= currentStep ? "completed" : ""
                }`}
              >
                {index <= currentStep ? "✓" : index + 1}
              </div>

              <p
                className={
                  index <= currentStep
                    ? "tracking-text active"
                    : "tracking-text"
                }
              >
                {step}
              </p>

              {index < steps.length - 1 && (
                <div
                  className={`tracking-line ${
                    index < currentStep ? "completed-line" : ""
                  }`}
                />
              )}

            </div>
          ))}
        </div>

        <div className="current-status">
          Current Status: <b>{o.status}</b>
        </div>
      </div>

      <div className="details-grid">

        {/* ITEMS */}

        <div className="details-card items-card">
          <h2>🛍️ Ordered Items</h2>

          {o.items.map((i, n) => (
            <div className="order-item" key={n}>

              <img
                src={i.image}
                alt={i.name}
                className="order-item-image"
              />

              <div className="item-info">
                <h3>{i.name}</h3>
                <p>Quantity: {i.quantity}</p>
                <span>₹{i.price} × {i.quantity}</span>
              </div>

              <strong className="item-total">
                ₹{i.price * i.quantity}
              </strong>

            </div>
          ))}

          <div className="total-box">
            <span>Total Amount</span>
            <h2>₹{o.totalAmount}</h2>
          </div>
        </div>

        {/* PAYMENT */}

        <div className="right-details">

          <div className="details-card payment-card">
            <h2>💳 Payment Details</h2>

            <div className="info-row">
              <span>Payment Method</span>
              <b>{o.paymentMethod}</b>
            </div>

            <div className="info-row">
              <span>Payment Status</span>
              <b
                className={
                  o.paymentStatus === "Paid"
                    ? "paid"
                    : "pending"
                }
              >
                {o.paymentStatus}
              </b>
            </div>

            {o.paymentMethod === "ONLINE" && o.paymentId && (
              <div className="info-row">
                <span>Payment ID</span>
                <b>{o.paymentId}</b>
              </div>
            )}
          </div>

          {/* DELIVERY */}

          <div className="details-card address-card">
            <h2>📍 Delivery Address</h2>

            <h3>{o.shippingAddress.fullName}</h3>

            <p>📞 {o.shippingAddress.phone}</p>

            <p>
              {o.shippingAddress.address}
            </p>

            <p>
              {o.shippingAddress.city},{" "}
              {o.shippingAddress.state}
            </p>

            <p>
              PIN: {o.shippingAddress.pincode}
            </p>
          </div>

        </div>
      </div>

    </section>
  );
}