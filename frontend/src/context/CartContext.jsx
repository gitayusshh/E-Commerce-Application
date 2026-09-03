import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";
const C = createContext();
export const CartProvider = ({ children }) => {
  const { user } = useAuth();
  const [cart, setCart] = useState({ items: [] });
  const load = async () => {
    if (user)
      try {
        setCart((await api.get("/cart")).data);
      } catch {}
  };
  useEffect(() => {
    load();
  }, [user]);
  const change = async (productId, quantity) => {
    if (!user) return;
    setCart((await api.put("/cart", { productId, quantity })).data);
  };
  const count = cart.items?.reduce((s, i) => s + i.quantity, 0) || 0;
  const total =
    cart.items?.reduce(
      (s, i) => s + (i.product.discountPrice || i.product.price) * i.quantity,
      0,
    ) || 0;
  return (
    <C.Provider value={{ cart, count, total, change, load }}>
      {children}
    </C.Provider>
  );
};
export const useCart = () => useContext(C);
