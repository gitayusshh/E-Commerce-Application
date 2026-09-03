import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
export default function Products() {
  const [sp, setSp] = useSearchParams();
  const [data, setData] = useState({ items: [], pages: 1 });
  const [cats, setCats] = useState([]);
  const load = () =>
    api.get("/products?" + sp.toString()).then((r) => setData(r.data));
  useEffect(() => {
    api.get("/categories").then((r) => setCats(r.data));
    load();
  }, [sp]);
  const set = (k, v) => {
    const n = new URLSearchParams(sp);
    if (v) n.set(k, v);
    else n.delete(k);
    n.set("page", "1");
    setSp(n);
  };
  return (
    <section className="section">
      <h1>Products</h1>
      <div className="filters">
        <input
          placeholder="Search"
          value={sp.get("search") || ""}
          onChange={(e) => set("search", e.target.value)}
        />
        <select
          value={sp.get("category") || ""}
          onChange={(e) => set("category", e.target.value)}
        >
          <option value="">All categories</option>
          {cats.map((c) => (
            <option key={c._id} value={c._id}>
              {c.name}
            </option>
          ))}
        </select>
        <input
          type="number"
          placeholder="Min ₹"
          onChange={(e) => set("minPrice", e.target.value)}
        />
        <input
          type="number"
          placeholder="Max ₹"
          onChange={(e) => set("maxPrice", e.target.value)}
        />
        <select
          value={sp.get("sort") || "createdAt"}
          onChange={(e) => set("sort", e.target.value)}
        >
          <option value="createdAt">Newest</option>
          <option value="price">Price</option>
          <option value="name">Name</option>
        </select>
        <select
          value={sp.get("order") || "desc"}
          onChange={(e) => set("order", e.target.value)}
        >
          <option value="desc">Desc</option>
          <option value="asc">Asc</option>
        </select>
      </div>
      <div className="grid">
        {data.items.map((p) => (
          <ProductCard p={p} key={p._id} />
        ))}
      </div>
      <div className="pagination">
        {Array.from({ length: data.pages }, (_, i) => (
          <button
            className="btn secondary"
            key={i}
            onClick={() => set("page", i + 1)}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </section>
  );
}
