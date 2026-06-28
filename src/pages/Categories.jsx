import { Link } from "react-router-dom";
import "./Categories.css";

function Categories() {
  const categories = [
    {
      name: "Smartphones",
      image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
    },
    {
      name: "Laptops",
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853",
    },
    {
      name: "Fashion",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8",
    },
    {
      name: "Sports",
      image: "https://images.unsplash.com/photo-1517649763962-0c623066013b",
    },
    {
      name: "Beauty",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9",
    },
    {
      name: "Accessories",
      image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49",
    },
  ];

  return (
    <div className="categories-page">
      <h1>Shop by Categories</h1>

      <div className="categories-grid">
        {categories.map((category) => (
          <Link
            key={category.name}
            className="category-card"
            to="/products"
          >
            <img src={category.image} alt={category.name} />
            <h3>{category.name}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Categories;