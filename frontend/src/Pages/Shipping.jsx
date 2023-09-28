import React,{useState} from 'react'
import Select from "react-select";
import CustomStepper from '../Componets/CustomStepper'
import {useNavigate} from 'react-router-dom'
import {SaveCartInfo } from "../CartSlices/index"
import { useDispatch, useSelector } from 'react-redux';
const Shipping = () => {
  const dispatch=useDispatch();
  const shippingInfo=useSelector(state=>state.cart.ShippingInfo)
  const navigate = useNavigate();
  const [city, setCity] = useState(shippingInfo.city || "");
  const [state, setState] = useState( "");
  const [country, setCountry] = useState(   "");
  const [pincode, setPincode] = useState(shippingInfo.pincode || "");
  const [phone, setPhone] = useState(shippingInfo.phone || "");
  const countryOptions = [
    { value: "us", label: "United States" },
    { value: "ca", label: "Canada" },
    // Add more country options as needed
  ];

  const stateOptions = [
    { value: "ny", label: "New York" },
    { value: "ca", label: "California" },
    // Add more state options as needed
  ];

  const handleCountryChange = (selectedOption) => {
    setCountry(selectedOption);
  };

  const handleStateChange = (selectedOption) => {
    setState(selectedOption);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  
  };
const handleNext = ()=>{
  navigate('/order/confirm')
const ShippingInfo={
  city:city,
  state:state,
  country:country,
  pincode:pincode,
  phone:phone
}
dispatch(SaveCartInfo(ShippingInfo) )
}
  return (
    <>
<CustomStepper active={0} />
<div className="w-full max-w-md mx-auto">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
            City
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="city"
            type="text"
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="state">
            State
          </label>
          <Select
            options={stateOptions}
            onChange={handleStateChange}
            value={state}
            placeholder="Select State"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
            Country
          </label>
          <Select
            options={countryOptions}
            onChange={handleCountryChange}
            value={country}
            placeholder="Select Country"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pincode">
            Pincode
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="pincode"
            type="text"
            placeholder="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
            Phone Number
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="phone"
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>
        <div className="flex items-center justify-between">
          
        </div>
      </form>
    </div>
  <div className='flex justify-center'>
    <div>
    <button className='btn btn-danger' onClick={handleNext}>Next</button>
    </div>
  </div>
     
      </>
  )
}

export default Shipping