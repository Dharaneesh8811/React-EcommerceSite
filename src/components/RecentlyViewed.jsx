import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

import './RecentlyViewed.css'

function RecentlyViewed() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const viewed =
      JSON.parse(localStorage.getItem("recentlyViewed")) || [];

    setProducts(viewed);
  }, []);

  if (products.length === 0) return null;

  return (
    <div className="recent-section">
      <h2>Recently Viewed</h2>

      <div className="products-grid">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default RecentlyViewed;