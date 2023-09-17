import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const UserProfile = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div class="dropdown-center">
      <button class="btn btn-danger bg-red-600 dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
        {user.name}
      </button>
      <ul class="dropdown-menu ">
        <li><Link class="dropdown-item" to="/account">Account</Link></li>
        <li><Link class="dropdown-item" href="#">Order</Link></li>
        <li><Link class="dropdown-item" href="#">Logout</Link></li>
      </ul>
    </div>
  );
};

export default UserProfile;
