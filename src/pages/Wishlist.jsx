import { useContext } from "react";
import { WishlistContext } from "../context/WishlistContext";
import ProductCard from "../components/ProductCard";

function Wishlist() {
  const { wishlistItems } = useContext(WishlistContext);

  return (
    <div className="products-container">
      <h1>My Wishlist ❤️</h1>

      <div className="products-grid">
        {wishlistItems.length === 0 ? (
          <h2>No items in wishlist</h2>
        ) : (
          wishlistItems.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default Wishlist;