import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { LogoutUser } from '../UserSlices/User';

const UserProfile = ({ user }) => {
  const dispatch=useDispatch();
  if (!user) {
    return <div>Loading...</div>;
  }
  const handleLogout=()=>{
    dispatch(LogoutUser())
  }

  return (
    <div class="dropdown-center">
      <button class="btn btn-danger flex  bg-red-600 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        {user.name} <img src={""} className='w-10 h-10 rounded-full' alt="" />
      </button>
      <ul class="dropdown-menu ">
        <li><Link class="dropdown-item" to="/account">Account</Link></li>
        <li><Link class="dropdown-item" href="#">Order</Link></li>
        <li><button onClick={handleLogout} class="dropdown-item" href="#">Logout</button></li>
        {user.role =="admin"  &&   <li><Link class="dropdown-item" href="#">Dashboard</Link></li> }
      </ul>
    </div>
  );
};

export default UserProfile;
