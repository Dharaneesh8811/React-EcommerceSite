import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CartProvider from './context/CartContext.jsx'
import WishlistProvider from "./context/WishlistContext.jsx";

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CartProvider>
      <WishlistProvider>
        <App />
         <ToastContainer position="top-right"
          autoClose={2000}
          theme="dark" />
      </WishlistProvider>
    </CartProvider>
  </StrictMode>
)
