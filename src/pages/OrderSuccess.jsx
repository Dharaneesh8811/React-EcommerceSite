import { Link } from "react-router-dom";
import { FaCheckCircle } from "react-icons/fa";
import "./OrderSuccess.css";

function OrderSuccess() {
  return (
    <div className="success-container">

      <div className="success-card">

        <FaCheckCircle className="success-icon" />

        <h1>Order Placed Successfully!</h1>

        <p>
          Thank you for shopping with us.
          Your order has been placed successfully.
        </p>

        <p className="order-id">
          Order ID: #{Math.floor(Math.random() * 1000000)}
        </p>

        <div className="success-buttons">

          <Link to="/" className="home-btn">
            Continue Shopping
          </Link>

          <Link to="/cart" className="cart-btn-success">
            View Cart
          </Link>

        </div>

      </div>

    </div>
  );
}

export default OrderSuccess;