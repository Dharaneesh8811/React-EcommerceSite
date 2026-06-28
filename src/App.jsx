import { BrowserRouter,Routes,Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import './App.css';

import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetails from "./pages/ProductDetails";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Checkout from "./pages/Checkout";
import Wishlist from "./pages/Wishlist";
import OrderSuccess from "./pages/OrderSuccess";
import Categories from "./pages/Categories";
import Deals from "./pages/Deals";  

function App(){
  return(
    <BrowserRouter>
    <Navbar/>

    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/product/:id" element={<ProductDetails/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/checkout" element={<Checkout/>}/>
      <Route path="/wishlist" element={<Wishlist />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/order-success" element={<OrderSuccess />} />
      <Route path="/categories" element={<Categories />} />
      <Route path="/deals" element={<Deals />} />
    </Routes>
    </BrowserRouter>
  );
}

export default App;