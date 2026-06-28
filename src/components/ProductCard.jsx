import { Link,useNavigate } from "react-router-dom";
import { FaShoppingCart, FaStar, FaHeart, FaRegHeart } from "react-icons/fa";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import "./ProductCard.css";

function ProductCard({ product }) {

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();
  const {
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
  } = useContext(WishlistContext);

  return (
    <div className="product-card">

      <Link
        to={`/product/${product.id}`}
        className="product-link"
      >
        <button
          className="wishlist-btn"
          onClick={(e) => {
            e.preventDefault();

            isInWishlist(product.id)
              ? removeFromWishlist(product.id)
              : addToWishlist(product);
          }}
        >
          {isInWishlist(product.id) ? (
            <FaHeart />
          ) : (
            <FaRegHeart />
          )}
        </button>
        <div className="product-image">
          <img
            src={product.thumbnail}
            alt={product.title}
          />
        </div>

        <div className="product-content">
          <h3>{product.title}</h3>

          <div className="rating">
            <FaStar />
            <span>{product.rating || 4.5}</span>
          </div>

          <h2 className="price">₹{product.price}</h2>
        </div>
      </Link>

      <div className="card-buttons">
        <button
        className="cart-btn"
        onClick={() =>
          addToCart({
            ...product,
            quantity: 1,
            color: "Default",
            size: "M",
          })
        }
      >
        <FaShoppingCart />
        Add To Cart
      </button>
      <button
        className="buy-btn"
        onClick={() => {
          addToCart({
            ...product,
            quantity: 1,
          });

          navigate(`/product/${product.id}`);
        }}
      >
        Buy Now
      </button>
      </div>
    </div>
  );
}

export default ProductCard;