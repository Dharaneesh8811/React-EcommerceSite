import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getProducts } from "../services/api";
import techProducts from "../data/techProducts";
import sportsProducts from "../data/sportsProducts";
import "./Products.css";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortOption , setSortOption] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 20;

  const categories = [
    "all",
    "smartphones",
    "laptops",
    "tablets",
    "mobile-accessories",
    "beauty",
    "fragrances",
    "furniture",
    "groceries",
    "mens-shirts",
    "mens-shoes",
    "womens-dresses",
    "womens-shoes",
    "sports",
    ];

   useEffect(() => {
    async function fetchData() {
      try {
        const apiProducts = await getProducts();

        // Combine API products + custom tech products
        const allProducts = [
          ...apiProducts, 
          ...techProducts,
          ...sportsProducts,
        ];

        setProducts(allProducts);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <h1>Loading Products...</h1>;

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.title
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" ||
      product.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts];

  if (sortOption === "low-high") {
    sortedProducts.sort((a, b) => a.price - b.price);
  }

  if (sortOption === "high-low") {
    sortedProducts.sort((a, b) => b.price - a.price);
  }

  if (sortOption === "a-z") {
    sortedProducts.sort((a, b) =>
      a.title.localeCompare(b.title)
    );
  }

  if (sortOption === "z-a") {
    sortedProducts.sort((a, b) =>
      b.title.localeCompare(a.title)
    );
  }

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct =
    indexOfLastProduct - productsPerPage;

  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const totalPages = Math.ceil(
    sortedProducts.length / productsPerPage
  );
  

  return (
    <div className="products-container">
      <h1>Our Products</h1>

      <div className="top-controls">

        {/* search box */}

        <div className="search-box">
          <input
            type="text"
            placeholder="Search products..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* sort box */}

        <div className="sort-box">
          <select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="">Sort By</option>
            <option value="low-high">Price: Low to High</option>
            <option value="high-low">Price: High to Low</option>
            <option value="a-z">Name: A-Z</option>
            <option value="z-a">Name: Z-A</option>
          </select>
        </div>

      </div>
    {/* Categorys */}

    <div className="category-filter">
      {categories.map((category) => (
        <button
          key={category}
          className={selectedCategory === category ? "active" : ""}
          onClick={() => setSelectedCategory(category)}
        >
          {category}
        </button>
      ))}
    </div>

      <div className="products-grid">
        {currentProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>

      <div className="pagination">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Prev
        </button>

        <span>
          Page {currentPage} of {totalPages}
        </span>

        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;