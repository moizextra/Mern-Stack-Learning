import { useState } from 'react'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import './App.css'
import Header from './Componets/Header'
import Footer from './Componets/Footer'
import Home from './Componets/Home'
import ProductDetail from './Componets/ProductDetail';
import Product from './Pages/Products';
import Search from './Pages/Search';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Account from './Componets/Account';
function App() {
  return (
<Router>
<Header/>
<Routes>
<Route exact path="/" element={<Home />} />
<Route exact path="/product/:id" element={<ProductDetail />} />
<Route exact path="/products" element={<Product />} />
<Route exact path="/products/:keyword" element={<Product />} />
<Route exact path="/search" element={<Search />} />
<Route exact path="/login" element={<Login />} />
<Route exact path="/signup" element={<Signup />} />
<Route exact path="/account" element={<Account />} />
</Routes>
<Footer/>
</Router>

  )
}

export default App
