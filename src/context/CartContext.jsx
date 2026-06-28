import { createContext, useState } from "react";

export const CartContext = createContext();

function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  function addToCart(product) {
    setCartItems((prev) => {
      const existingItem = prev.find(
        (item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor &&
          item.selectedSize === product.selectedSize
      );

      // If the same product + color + size already exists
      if (existingItem) {
        return prev.map((item) =>
          item.id === product.id &&
          item.selectedColor === product.selectedColor &&
          item.selectedSize === product.selectedSize
            ? {
                ...item,
                quantity: item.quantity + product.quantity,
              }
            : item
        );
      }

      // Add new product with selected quantity
      return [...prev, product];

      toast.success(`${product.title} added to cart`);
    });
  }

  function removeFromCard(id) {
    setCartItems((prev) =>
      prev.filter((item) => item.id !== id)
    );
    toast.error("Product removed from cart");
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCard,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export default CartProvider;