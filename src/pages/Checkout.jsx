import { useContext, useState } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Checkout.css";

function Checkout() {
  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    pincode: "",
  });

  const totalPrice = cartItems.reduce(
    (total, item) =>
      total + item.price * (item.quantity || 1),
    0
  );

  const shipping = totalPrice > 1000 ? 0 : 99;

  const finalTotal = totalPrice + shipping;

  function handleChange(e) {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  function placeOrder() {
   navigate("/order-success");
  }

  return (
    <div className="checkout-container">

      <div className="checkout-form">

        <h2>Delivery Address</h2>

        <input
          type="text"
          name="name"
          placeholder="Full Name"
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />

        <textarea
          name="address"
          placeholder="Address"
          onChange={handleChange}
        />

        <input
          type="text"
          name="city"
          placeholder="City"
          onChange={handleChange}
        />

        <input
          type="text"
          name="pincode"
          placeholder="Pincode"
          onChange={handleChange}
        />

      </div>

      <div className="order-summary">

        <h2>Order Summary</h2>

        {cartItems.map((item, index) => (
          <div key={index} className="summary-item">

            <div>
              <h4>{item.title}</h4>

              <p>Color: {item.color || "Default"}</p>

              <p>Size: {item.size || "M"}</p>

              <p>Qty: {item.quantity || 1}</p>
            </div>

            <h4>
              ₹{item.price * (item.quantity || 1)}
            </h4>

          </div>
        ))}

        <hr />

        <p className="price-row">
          <span>Subtotal</span>
          <span>₹{totalPrice}</span>
        </p>

        <p className="price-row">
          <span>Shipping</span>
          <span>₹{shipping}</span>
        </p>

        <div className="total-row">
          <span>Total</span>
          <span>₹{finalTotal}</span>
        </div>

        <select className="payment-select">
          <option>Cash on Delivery</option>
          <option>UPI</option>
          <option>Credit Card</option>
        </select>

        <button
          className="place-order-btn"
          onClick={placeOrder}
        >
          Place Order
        </button>

      </div>

    </div>
  );
}

export default Checkout;