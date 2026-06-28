import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import './Cart.css';

function Cart() {
  const { cartItems, removeFromCard } = useContext(CartContext);

  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>

      {cartItems.length === 0 ? (
        <h2>Your Cart is Empty</h2>
      ) : (
        cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
           <Link
              to={`/product/${item.id}`}
              className="cart-product-link"
            >
            <img
              src={item.thumbnail}
              alt={item.title}
              className="cart-image"
            />
            <h3>{item.title}</h3>
            </Link>
            

            <div className="cart-info">
              <h4>{item.title}</h4>
              <p>Color: {item.color || "Default"}</p>
              <p>Size: {item.size || "M"}</p>
              <p>Quantity: {item.quantity || 1}</p>
              <p>Total: ₹{(item.price * (item.quantity || 1)).toFixed(2)}</p>
            </div>
            <button onClick={() => removeFromCard(item.id)}>
              Remove
            </button>
          </div>
        ))
      )}
      <h2> 
        Total: ₹
        {cartItems.reduce(
          (total, item) =>
            total + item.price * item.quantity,0
        )}
      </h2>

      <Link to="/checkout" className="checkout-btn">
      Proceed to Checkout
      </Link>
      
    </div>
  );
}

export default Cart;