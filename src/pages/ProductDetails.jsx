import { useEffect, useState, useContext, } from "react";
import { useParams, useNavigate  } from "react-router-dom";
import { getProduct } from "../services/api";
import { CartContext } from "../context/CartContext";
import { customProducts } from "../data/allProducts";
import techProducts from "../data/techproducts";
import sportsProducts from "../data/sportsProducts";
import RecommendedProducts from "../components/RecommendedProducts";
import "./ProductDetails.css";

function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");

  const [selectedColor, setSelectedColor] = useState("Black");
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);

  const [name, setName] = useState("");
  const [comment, setComment] = useState("");

  const [reviews, setReviews] = useState([
    {
      name: "John",
      rating: 5,
      comment: "Amazing product!"
    },
    {
      name: "Sarah",
      rating: 4,
      comment: "Good quality and fast delivery."
    }
  ]);

  function addReview() {
    if (!name || !comment) return;

    setReviews([
      ...reviews,
      {
        name,
        rating: 5,
        comment
      }
    ]);

    setName("");
    setComment("");
  }

  const colors = [
    { name: "Black", code: "#000000" },
    { name: "White", code: "#ffffff" },
    { name: "Blue", code: "#2563eb" },
    { name: "Red", code: "#ef4444" },
    { name: "Green", code: "#22c55e" },
  ];
  const sizes = ["S", "M", "L", "XL"];

  useEffect(() => {
    async function fetchProduct() {
      const customProduct = customProducts.find(
        (item) => item.id === Number(id)
      );

      let currentProduct;

      if (customProduct) {
        currentProduct = customProduct;
      } else {
        currentProduct = await getProduct(id);
      }

      setProduct(currentProduct);
      setMainImage(currentProduct.thumbnail);

      // Save to localStorage
      let viewed =
        JSON.parse(localStorage.getItem("recentlyViewed")) || [];

      // Remove duplicate product
      viewed = viewed.filter(
        (item) => item.id !== currentProduct.id
      );

      // Add current product at first
      viewed.unshift(currentProduct);

      // Keep only last 6 products
      viewed = viewed.slice(0, 6);

      localStorage.setItem(
        "recentlyViewed",
        JSON.stringify(viewed)
      );
    }

    fetchProduct();
  }, [id]);

  const allProducts = [
    ...customProducts,
    ...techProducts,
    ...sportsProducts,
  ];

  if (!product) return <h2>Loading...</h2>;

  return (
    <>
    <div className="product-details">

      <div className="gallery">

        <div className="thumbnail-container">
          {(product.images || [product.thumbnail]).map((img, index) => (
            <img
              key={index}
              src={img}
              alt=""
              className="thumbnail"
              onClick={() => setMainImage(img)}
            />
          ))}
        </div>

        <div className="main-image">
          <img src={mainImage} alt={product.title} />
        </div>

      </div>

      <div className="details-info">

        <h1>{product.title}</h1>

        <h2>₹ {product.price}</h2>

        <p>{product.description}</p>

        <p>
          <strong>Brand:</strong> {product.brand}
        </p>

        <p>
          <strong>Category:</strong> {product.category}
        </p>

        <p>
          <strong>Stock:</strong> {product.stock}
        </p>

        <h3>Select Color</h3>

        <div className="color-container">
          {colors.map((color) => (
            <div
              key={color.name}
              className={`color-circle ${
                selectedColor === color.name ? "active-color" : ""
              }`}
              style={{ backgroundColor: color.code }}
              onClick={() => setSelectedColor(color.name)}
              title={color.name}
            ></div>
          ))}
        </div>

        <p>
          Selected Color: <strong>{selectedColor}</strong>
        </p>

        <h3>Select Size</h3>

        <div className="size-container">
          {sizes.map((size) => (
            <button
              key={size}
              className={`size-btn ${
                selectedSize === size ? "active-size" : ""
              }`}
              onClick={() => setSelectedSize(size)}
            >
              {size}
            </button>
          ))}
        </div>

        {/* Quantity Selection */}

        <h3>Quantity</h3>

        <div className="quantity-container">
          <button
            onClick={() =>
              quantity > 1 && setQuantity(quantity - 1)
            }
          >
            -
          </button>

          <span>{quantity}</span>

          <button
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>

        <div className="product-action-buttons">

          <button
            className="details-cart-btn"
            onClick={() =>
              addToCart({
                ...product,
                color: selectedColor,
                size: selectedSize,
                quantity,
              })
            }
          >
            Add To Cart
          </button>

          <button
            className="buy-now-btn"
            onClick={() => {
              addToCart({
                ...product,
                color: selectedColor,
                size: selectedSize,
                quantity,
              });

              navigate("/checkout");
            }}
          >
            Buy Now
          </button>
        </div>
      </div>
              <div className="reviews-section">
          <h2>Customer Reviews</h2>

          {reviews.map((review, index) => (
            <div key={index} className="review-card">
              <h4>{review.name}</h4>
              <p>⭐⭐⭐⭐⭐</p>
              <p>{review.comment}</p>
            </div>
          ))}

          <div className="review-form">
            <input
              type="text"
              placeholder="Your Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              placeholder="Write your review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button onClick={addReview}>
              Submit Review
            </button>
          </div>
        </div>
    </div>
    <RecommendedProducts
      currentProduct={product}
      products={allProducts}
    />
    </>
  );
}

export default ProductDetails;