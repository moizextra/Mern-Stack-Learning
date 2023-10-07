import React, { useState } from 'react';
import Loading from './Loading';
import Metadata from './layout/metadata';
import { updateUser } from '../UserSlices/User';
import { useDispatch, useSelector } from 'react-redux';
const Profile = ({ user }) => {
  const {isLoading,isAutheticated,userData}=useSelector(state=>state.User)
  const [name, setname] = useState(user.name);
  const [email, setemail] = useState(user.email);
  const [Editable, setEditable] = useState(false);
  const dispatch = useDispatch();
  const handleChange = () => {
    dispatch(updateUser({ name, email }));
  }
  if (!userData) {
    return <h1>LOADING..</h1>
  }
  return (
    <>
      <Metadata title={user.name} />
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src={""}
                alt={user.name}
              />
              <span className="font-weight-bold">{user.name}</span>
              <span className="text-black-50">{user.email}</span>
              {/* Add more user-related data here */}
            </div>
          </div>
          <div className="col-md-5 border-right">
            <div className="p-3 py-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Profile Settings</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    value={name} // Replace with the actual user data
                    onChange={(e) => { Editable && setname(e.target.value) }}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels"> Primary Email</label>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="first name"
                    value={email} // Replace with the actual user data
                    onChange={(e) => { { Editable && setemail(e.target.value) } }}
                  />
                </div>
                <div className="col-md-6">
                  <button className="btn btn-primary m-3">Reset Password</button>
                </div>

              </div>
            </div>
          </div>
          <div>
            <button className='btn btn-warning' onClick={handleChange}>Save Changes</button>
            <button className='btn btn-success m-4' onClick={() => { setEditable(true); alert("Now You can Edit Your content") }}>Edit</button>

          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
