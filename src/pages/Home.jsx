import { Link } from "react-router-dom";
import { FaTruck, FaShieldAlt, FaHeadset } from "react-icons/fa";
import heroImage from "../assets/hero-image.png";
import RecentlyViewed from "../components/RecentlyViewed";
import "./Home.css";

function Home() {
  return (
    <>
    <section className="hero">
      <div className="hero-text">

      <div className="hero-left">

        <span className="offer-tag">
          🔥 Best Deals For You
        </span>

        <h1>
          Discover Amazing
          <br />
          Products <span>Everyday</span>
        </h1>

        <p>
          Shop the latest collections with unbeatable prices
          and fast delivery.
        </p>

        <Link to="/products">
          <button className="shop-btn">
            Shop Now →
          </button>
        </Link>

        <div className="hero-features">

          <div className="feature">
            <FaTruck />
            <div>
              <h4>Free Delivery</h4>
              <p>On Orders over ₹499</p>
            </div>
          </div>

          <div className="feature">
            <FaShieldAlt />
            <div>
              <h4>Secure Payment</h4>
              <p>100% Safe Checkout</p>
            </div>
          </div>

          <div className="feature">
            <FaHeadset />
            <div>
              <h4>24/7 Support</h4>
              <p>We're Here to Help</p>
            </div>
          </div>
        </div>
      </div>
      </div>
      <div className="hero-right hero-image">
        <img
          src={heroImage} 
          alt="Shopping Banner"
        />
      </div>
    </section>
    <RecentlyViewed />
    </>
  );
}

export default Home;