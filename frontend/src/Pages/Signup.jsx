import React, { useState,useEffect } from 'react';
import { RegisterUser } from '../UserSlices/RegisterUser';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

const Signup = () => {
  const dispatch = useDispatch();
const isAutheticated=useSelector((state)=>state.UserSignup.isAutheticated);
const navigate = useNavigate();
useEffect(() => {
  if (isAutheticated) {
    toast.success('Signup Successfully', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
    });
    navigate("/account");

  }
}, [isAutheticated]);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [avatar, setAvatar] = useState('');
  const [password, setPassword] = useState('');
const [avatarPreview, setAvatarPreview] = useState('/images/default_avatar.jpg');
  const handleChange = (e) => {
 if(e.target.name == "name"){
   setName(e.target.value);
 }else if(e.target.name == "email"){
  setEmail(e.target.value);
 }else if(e.target.name == "password"){
  setPassword(e.target.value);
 }
  
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const Userdata={
      name:name,
      email:email,
      password:password,
      avatar:avatar
    }
dispatch(RegisterUser(Userdata));
  };

  return (
    <>
    <div className="w-full max-w-sm mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            placeholder="Your Name"
            value={name}
            onChange={handleChange}
            required
          />
        </div>
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
            value={email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password"
            type="password"
            name="password"
            placeholder="Your Password"
            value={password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="avatar">
            Avatar
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="avatar"
            type="file"
            name="avatar"
            onChange={handleChange}
            accept="image/*" // Allow only image files
          />
        </div>
        <div className="mb-4">
          <img
            id="avatar-preview"
            src={avatarPreview}
            alt="Avatar Preview"
            className="max-w-xs max-h-xs mx-auto"
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Sign Up
          </button>
        </div>
      </form>
    </div>
    <ToastContainer/>
    </>
  );
};

export default Signup;
