import React, { useEffect } from 'react';
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
import Account from './Componets/Account';
import { useDispatch, useSelector } from 'react-redux';
import { loadUser } from './UserSlices/User';

function App() {
  const user = useSelector((state) => state.User.userData.user);
  const isLoading = useSelector((state) => state.User.isLoading);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(loadUser());
  }, [dispatch]);

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
          <Route exact path="/account" element={<Account />} />
        </Routes>
      )}
      <Footer />
    </Router>
  );
}

export default App;
