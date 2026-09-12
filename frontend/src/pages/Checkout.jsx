// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import api from "../services/api";
// import { useCart } from "../context/CartContext";

// export default function Checkout() {
//   const { total, load, cart } = useCart();
//   const nav = useNavigate();
//   const [err, setErr] = useState("");
//   const [loading, setLoading] = useState(false);

//   const submit = async (e) => {
//     e.preventDefault();
//     setErr("");

//     if (!cart.items?.length) {
//       setErr("Your cart is empty");
//       return;
//     }

//     const d = Object.fromEntries(new FormData(e.target));

//     // if (!/^[6-9]\d{9}$/.test(d.phone)) {
//     //   setErr("Please enter a valid 10-digit mobile number");
//     //   return;
//     // }

//     <input
//   name="phone"
//   type="tel"
//   placeholder="Enter 10-digit mobile number"
//   maxLength="10"
//   minLength="10"
//   inputMode="numeric"
//   pattern="[6-9][0-9]{9}"
//   onInput={(e) => {
//     e.target.value = e.target.value
//       .replace(/\D/g, "")
//       .slice(0, 10);
//   }}
//   required
// />

//     if (!/^\d{6}$/.test(d.pincode)) {
//       setErr("Please enter a valid 6-digit pincode");
//       return;
//     }

//     setLoading(true);

//     try {
//       const shippingAddress = {
//         fullName: d.fullName.trim(),
//         phone: d.phone,
//         address: d.address.trim(),
//         city: d.city.trim(),
//         state: d.state.trim(),
//         pincode: d.pincode,
//       };

//       const r = await api.post("/orders", {
//         shippingAddress,
//         paymentMethod: d.paymentMethod,
//       });

//       await load();
//       nav("/orders/" + r.data._id);
//     } catch (x) {
//       setErr(x.response?.data?.message || "Could not place order");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="auth">
//       <form onSubmit={submit}>
//         <h1>Checkout</h1>

//         {err && <p className="error">{err}</p>}

//         <input
//           name="fullName"
//           placeholder="Full name"
//           required
//         />

//         <input
//           name="phone"
//           type="tel"
//           placeholder="Enter 10-digit mobile number"
//           maxLength="10"
//           inputMode="numeric"
//           onInput={(e) => {
//             e.target.value = e.target.value
//               .replace(/\D/g, "")
//               .slice(0, 10);
//           }}
//           required
//         />

//         <textarea
//           name="address"
//           placeholder="Complete address"
//           required
//         />

//         <input
//           name="city"
//           placeholder="City"
//           required
//         />

//         <input
//           name="state"
//           placeholder="State"
//           required
//         />

//         <input
//           name="pincode"
//           placeholder="6-digit pincode"
//           maxLength="6"
//           inputMode="numeric"
//           onInput={(e) => {
//             e.target.value = e.target.value
//               .replace(/\D/g, "")
//               .slice(0, 6);
//           }}
//           required
//         />

//         <select name="paymentMethod">
//           <option value="COD">Cash on Delivery</option>
//           <option value="ONLINE">Online Payment</option>
//         </select>

//         <h3>Order Total: ₹{total}</h3>

//         <button className="btn" disabled={loading}>
//           {loading ? "Placing Order..." : "Place Order"}
//         </button>
//       </form>
//     </section>
//   );
// }




import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { total, cart } = useCart();
  const nav = useNavigate();

  const [err, setErr] = useState("");

  const submit = (e) => {
    e.preventDefault();
    setErr("");

    if (!cart.items?.length) {
      setErr("Your cart is empty");
      return;
    }

    const d = Object.fromEntries(new FormData(e.target));

    if (!/^[6-9]\d{9}$/.test(d.phone)) {
      setErr("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!/^\d{6}$/.test(d.pincode)) {
      setErr("Please enter a valid 6-digit pincode");
      return;
    }

    const shippingAddress = {
      fullName: d.fullName.trim(),
      phone: d.phone,
      address: d.address.trim(),
      city: d.city.trim(),
      state: d.state.trim(),
      pincode: d.pincode,
    };

    if (d.paymentMethod === "COD") {
      nav("/payment", {
        state: {
          shippingAddress,
          paymentMethod: "COD",
          total,
        },
      });
    } else {
      nav("/payment", {
        state: {
          shippingAddress,
          paymentMethod: "ONLINE",
          total,
        },
      });
    }
  };

  return (
    <section className="auth">
      <form onSubmit={submit}>
        <h1>Checkout</h1>

        {err && <p className="error">{err}</p>}

        <input
          name="fullName"
          placeholder="Full name"
          required
        />

        <input
          name="phone"
          type="tel"
          placeholder="Enter 10-digit mobile number"
          maxLength="10"
          inputMode="numeric"
          onInput={(e) => {
            e.target.value = e.target.value
              .replace(/\D/g, "")
              .slice(0, 10);
          }}
          required
        />

        <textarea
          name="address"
          placeholder="Complete address"
          required
        />

        <input
          name="city"
          placeholder="City"
          required
        />

        <input
          name="state"
          placeholder="State"
          required
        />

        <input
          name="pincode"
          placeholder="6-digit pincode"
          maxLength="6"
          inputMode="numeric"
          onInput={(e) => {
            e.target.value = e.target.value
              .replace(/\D/g, "")
              .slice(0, 6);
          }}
          required
        />

        <select name="paymentMethod">
          <option value="COD">Cash on Delivery</option>
          <option value="ONLINE">Online Payment</option>
        </select>

        <h3>Order Total: ₹{total}</h3>

        <button className="btn">
          Continue
        </button>
      </form>
    </section>
  );
}
