import { Link } from "react-router-dom";
import { useState, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { FaHeart, FaShoppingCart } from "react-icons/fa";
import { FaBagShopping } from "react-icons/fa6";
import { CartContext } from "../context/CartContext";
import { WishlistContext } from "../context/WishlistContext";
import "./Navbar.css";

function Navbar(){

  const { cartItems } = useContext(CartContext);
  const { wishlistItems } = useContext(WishlistContext);
  const [menuOpen, setMenuOpen] = useState(false);
  const totalQuantity = cartItems.reduce(
    (sum, item) => sum + (item.quantity || 1),
    0
  );


  return(
    <nav className="navbar">
      <div className="logo">
        <FaBagShopping />
        <Link to="/">Hidden Shop</Link>
      </div>

      <div
        className="menu-icon"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        {menuOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className={`nav-links ${menuOpen ? "active" : ""}`}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
        </li>
        <li>
          <Link to="/products" onClick={() => setMenuOpen(false)}>Products</Link>
        </li>
        <li><Link to="/categories" onClick={() => setMenuOpen(false)}>Categories</Link></li>
        <li><Link to="/deals" onClick={() => setMenuOpen(false)}>Deals</Link></li>
      </ul>

        <div className="nav-icons">
          <Link to="/wishlist" className="icon-link">
           <FaHeart />
            <span> Wishlist </span>
            <div className="count"> ({wishlistItems.length}) </div>
          </Link>
          <Link to="/cart" className="icon-link">
           <FaShoppingCart />
           <span> Cart </span>
           <div className="count">({totalQuantity})</div>
          </Link>
          <button className="login-btn">
            Login
          </button>
        </div>
    </nav>
  );
}

export default Navbar;