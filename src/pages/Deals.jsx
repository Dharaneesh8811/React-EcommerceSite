import ProductCard from "../components/ProductCard";
import { customProducts } from "../data/allProducts";

function Deals() {

  const dealProducts = customProducts.filter(
    product => product.price < 10000
  );

  return (
    <div className="products-container">
      <h1>🔥 Today's Best Deals</h1>

      <div className="products-grid">
        {dealProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </div>
  );
}

export default Deals;