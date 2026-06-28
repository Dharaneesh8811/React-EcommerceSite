import { useMemo } from "react";
import ProductCard from "./ProductCard";
import techProducts from "../data/techProducts";
import sportsProducts from "../data/sportsProducts";

function RecommendedProducts({ currentProduct, products }) {

  const recommended = useMemo(() => {
    return products
      .filter(
        (item) =>
          item.category === currentProduct.category &&
          item.id !== currentProduct.id
      )
      .slice(0, 4);
  }, [currentProduct, products]);

  if (recommended.length === 0) return null;

  return (
    <div className="recommended-section">
      <h2>You May Also Like</h2>

      <div className="products-grid">
        {recommended.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default RecommendedProducts;