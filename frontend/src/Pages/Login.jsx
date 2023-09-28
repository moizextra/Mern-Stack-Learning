import React, { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { adduser } from '../UserSlices/User';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import axios from "axios";
const Login = () => {
const location = useLocation();
const isAutheticated=useSelector((state)=>state.User.isAutheticated) || false ;
const token=useSelector((state)=>state.User.token);
console.log("You are"+ isAutheticated)
  const dispatch=useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const redirect = location.search ? location.search.split("=")[1] : "/account";
  useEffect(() => {
    if (isAutheticated) {
      navigate(redirect);
    }
    
  }, [isAutheticated,token,redirect]);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    dispatch(adduser(formData))
    if(isAutheticated){
      navigate("/account")
    }

  };

  const handleForgotPassword = () => {
    // Add logic to handle forgotten password, e.g., show a modal or navigate to a password reset page
    console.log('Forgot Password clicked');
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="Your Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between mb-4">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Log In
          </button>
          <a
            className="text-blue-500 hover:underline cursor-pointer"
            onClick={handleForgotPassword}
          >
            Forgot Password?
          </a>
        </div>
      </form>
    </div>
  );
};

export default Login;
