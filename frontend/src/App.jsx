import React, { useEffect,useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from 'react-router-dom';
import './App.css';
import Header from './Componets/Header';
import Footer from './Componets/Footer';
import Home from './Componets/Home';
import ProductDetail from './Componets/ProductDetail';
import Product from './Pages/Products';
import Search from './Pages/Search';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Profile from './Componets/Profile';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './UserSlices/User';
import ProtectedRoute from './Componets/Route/ProtectedRoute';
import Cart from './Componets/Cart';
import Shipping from './Pages/Shipping';
import ConfirmOrder from './Pages/ConfirmOrder';
import Payment from './Pages/Payment';
import axios from 'axios';
function App() {
  const {isLoading,isAutheticated,userData}=useSelector(state=>state.User)
const [stripekey,setstripekey]=useState()
  const user = useSelector((state) => state.User.userData.user);
  const dispatch = useDispatch();
 const getStripeKey=async()=>{
  const {data}= await axios.get(`${import.meta.env.VITE_BASE_URL}/api/v1/stripeapikey`)
  console.log("The data is " +data.stripeApiKey);
 }
  useEffect(() => {
    dispatch(loadUser());
getStripeKey()  ;
  }, []);

  if(!userData){
    return <h1>loading...</h1>
  }
  return (
    <Router>
      <Header user={user} />
      {isLoading ? ( // Show loading indicator while data is loading
        <div className="loading">Loading...</div>
      ) : (
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/product/:id" element={<ProductDetail />} />
          <Route exact path="/products" element={<Product />} />
          <Route exact path="/products/:keyword" element={<Product />} />
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/shipping" element={<Shipping />} />
          <Route
  path="/account"
  element={
    <ProtectedRoute >
      <Profile user={user} />
    </ProtectedRoute>
  }
/>
          <Route
  path="/order/confirm"
  element={
    <ProtectedRoute >
      <ConfirmOrder />
    </ProtectedRoute>
  }
/>
          <Route
  path="/order/confirm/payment"
  element={
    <ProtectedRoute >
      <Payment />
    </ProtectedRoute>
  }
/>
        
        </Routes>
      )}
      <Footer />
    </Router>
  );
}

export default App;