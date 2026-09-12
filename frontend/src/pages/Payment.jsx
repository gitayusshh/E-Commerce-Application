
// import { QRCodeSVG } from "qrcode.react";
// import { useLocation, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import api from "../services/api";
// import { useCart } from "../context/CartContext";
// import { QRCodeSVG } from "qrcode.react";

// export default function Payment() {
//   const location = useLocation();
//   const nav = useNavigate();

//   const { load } = useCart();

//   const [loading, setLoading] = useState(false);
//   const [success, setSuccess] = useState(false);
//   const [paymentId] = useState(
//     "PAY" + Date.now() + Math.floor(Math.random() * 1000)
//   );

//   const data = location.state;

//   if (!data) {
//     return (
//       <section className="auth">
//         <h2>Invalid Payment Request</h2>
//       </section>
//     );
//   }

//   const {
//     shippingAddress,
//     paymentMethod,
//     total,
//   } = data;

//   const confirmPayment = async () => {
//     setLoading(true);

//     try {
//       const paymentDetails =
//         paymentMethod === "ONLINE"
//           ? {
//               paymentId,
//               paymentStatus: "PAID",
//               paidAt: new Date().toISOString(),
//             }
//           : {
//               paymentStatus: "PENDING",
//             };

//       const r = await api.post("/orders", {
//         shippingAddress,
//         paymentMethod,
//         paymentDetails,
//       });

//       setSuccess(true);

//       await load();

//       setTimeout(() => {
//         nav("/orders/" + r.data._id);
//       }, 1500);

//     } catch (error) {
//       alert(
//         error.response?.data?.message ||
//         "Could not place order"
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   if (success) {
//     return (
//       <section className="payment-page">
//         <div className="payment-card">
//           <h1>✅ Payment Successful!</h1>

//           <p>
//             Payment ID: <b>{paymentId}</b>
//           </p>

//           <p>Your order is being placed...</p>
//         </div>
//       </section>
//     );
//   }

//   if (paymentMethod === "COD") {
//     return (
//       <section className="payment-page">
//         <div className="payment-card">
//           <h1>Cash on Delivery</h1>

//           <h2>Amount: ₹{total}</h2>

//           <p>
//             You will pay when your order is delivered.
//           </p>

//           <button
//             className="btn"
//             onClick={confirmPayment}
//             disabled={loading}
//           >
//             {loading
//               ? "Placing Order..."
//               : "Confirm Order"}
//           </button>
//         </div>
//       </section>
//     );
//   }

//   const upiData =
//     `upi://pay?pa=ecommerce@upi&pn=E-Commerce Store&am=${total}&cu=INR`;

//   return (
//     <section className="payment-page">
//       <div className="payment-card">

//         <h1>Scan & Pay</h1>

//         <QRCodeSVG
//           value={upiData}
//           size={220}
//         />

//         <h2>₹{total}</h2>

//         <div className="payment-details">
//           <p>
//             <b>Store:</b> E-Commerce Store
//           </p>

//           <p>
//             <b>UPI ID:</b> ecommerce@upi
//           </p>

//           <p>
//             <b>Customer:</b> {shippingAddress.fullName}
//           </p>

//           <p>
//             <b>Payment ID:</b> {paymentId}
//           </p>
//         </div>

//         <p className="demo-text">
//           This is a demo payment system.
//         </p>

//         <button
//           className="btn"
//           onClick={confirmPayment}
//           disabled={loading}
//         >
//           {loading
//             ? "Confirming Payment..."
//             : "I Have Completed Payment"}
//         </button>

//       </div>
//     </section>
//   );

// }





import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../services/api";
import { useCart } from "../context/CartContext";

export default function Payment() {
  const location = useLocation();
  const nav = useNavigate();
  const { load } = useCart();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const [paymentId] = useState(
    "PAY" + Date.now() + Math.floor(Math.random() * 1000)
  );

  const data = location.state;

  if (!data) {
    return (
      <section className="payment-page">
        <div className="payment-card">
          <h2>Invalid Payment Request</h2>
        </div>
      </section>
    );
  }

  const { shippingAddress, paymentMethod, total } = data;

  const confirmPayment = async () => {
    setLoading(true);

    try {
      const r = await api.post("/orders", {
        shippingAddress,
        paymentMethod,

        paymentId:
          paymentMethod === "ONLINE"
            ? paymentId
            : null,
      });

      setSuccess(true);

      await load();

      setTimeout(() => {
        nav("/orders/" + r.data._id);
      }, 1500);

    } catch (error) {
      alert(
        error.response?.data?.message ||
        "Could not place order"
      );
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <section className="payment-page">
        <div className="payment-card">
          <h1>✅ Payment Successful!</h1>

          <p>
            Payment ID: <b>{paymentId}</b>
          </p>

          <p>Your order is being placed...</p>
        </div>
      </section>
    );
  }

  if (paymentMethod === "COD") {
    return (
      <section className="payment-page">
        <div className="payment-card">
          <h1>Cash on Delivery</h1>

          <h2>Amount: ₹{total}</h2>

          <p>You will pay when your order is delivered.</p>

          <button
            className="btn"
            onClick={confirmPayment}
            disabled={loading}
          >
            {loading ? "Placing Order..." : "Confirm Order"}
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="payment-page">
      <div className="payment-card">

        <h1>Scan & Pay</h1>

        <img
          src="/payment-qr.jpeg"
          alt="UPI Payment QR Code"
          className="payment-qr"
        />

        <h2>Amount: ₹{total}</h2>

        <div className="payment-details">
          <p>
            <b>Customer:</b> {shippingAddress.fullName}
          </p>

          <p>
            <b>Payment ID:</b> {paymentId}
          </p>
        </div>

        <p className="demo-text">
          Scan the QR code and complete your payment.
        </p>

        <button
          className="btn"
          onClick={confirmPayment}
          disabled={loading}
        >
          {loading
            ? "Confirming Payment..."
            : "I Have Completed Payment"}
        </button>

      </div>
    </section>
  );
}