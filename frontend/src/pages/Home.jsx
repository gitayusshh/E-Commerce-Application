import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import ProductCard from "../components/ProductCard";
export default function Home() {
  const [featured, setFeatured] = useState([]),
    [trending, setTrending] = useState([]),
    [cats, setCats] = useState([]);
  useEffect(() => {
    Promise.all([
      api.get("/products?featured=true&limit=8"),
      api.get("/products?trending=true&limit=8"),
      api.get("/categories"),
    ]).then(([f, t, c]) => {
      setFeatured(f.data.items);
      setTrending(t.data.items);
      setCats(c.data);
    });
  }, []);
  return (
    <>
      <section className="hero">
        <div>
          <span className="eyebrow">MEGA SALE • UP TO 30% OFF</span>
          <h1>Everything you need, in one place.</h1>
          <p>
            Shop electronics, fashion, footwear, accessories and more with great
            deals.
          </p>
          <Link className="btn" to="/products">
            Shop Now
          </Link>
        </div>
      </section>
      <section className="section">
        <div className="titleRow">
          <h2>Shop by Category</h2>
          <Link to="/products">View all →</Link>
        </div>
        <div className="categoryGrid">
          {cats.map((x) => (
            <Link
              className="categoryCard"
              key={x._id}
              to={"/products?category=" + x._id}
            >
              <img src={x.image} alt={x.name} />
              <strong>{x.name}</strong>
            </Link>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="titleRow">
          <h2>Featured Products</h2>
          <Link to="/products?featured=true">View all →</Link>
        </div>
        <div className="grid">
          {featured.map((x) => (
            <ProductCard p={x} key={x._id} />
          ))}
        </div>
      </section>
      <section className="offer">
        <span>LIMITED TIME OFFER</span>
        <h2>Big savings on your favourite products</h2>
        <p>Explore special prices across popular categories.</p>
        <Link className="btn" to="/products?offer=true">
          Explore Offers
        </Link>
      </section>
      <section className="section">
        <div className="titleRow">
          <h2>Trending Now 🔥</h2>
          <Link to="/products?trending=true">View all →</Link>
        </div>
        <div className="grid">
          {trending.map((x) => (
            <ProductCard p={x} key={x._id} />
          ))}
        </div>
      </section>
    </>
  );
}
  