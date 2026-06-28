import { createContext, useState } from "react";

export const WishlistContext = createContext();

function WishlistProvider({ children }) {
  const [wishlistItems, setWishlistItems] = useState([]);

  function addToWishlist(product) {
    const exists = wishlistItems.find(
      (item) => item.id === product.id
    );

    if (!exists) {
      setWishlistItems((prev) => [...prev, product]);
    }

    toast.info("Added to wishlist");
  }

  function removeFromWishlist(id) {
    setWishlistItems((prev) =>
      prev.filter((item) => item.id !== id)
    );

    toast.error("Product removed from wishlist");
  }

  function isInWishlist(id) {
    return wishlistItems.some((item) => item.id === id);
  }

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

export default WishlistProvider;