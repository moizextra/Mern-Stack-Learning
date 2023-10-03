import React, { useState } from 'react';
import CustomStepper from '../Componets/CustomStepper';
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux"
import axios from 'axios';
const Payment = () => {
  const navigate = useNavigate();
const total=useSelector(state=>state.cart.total)
  // State variables to store form input values
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [pin, setPin] = useState('');

  // Function to handle form submission
  const handlePayment = async (e) => {
    e.preventDefault();

    // Prepare the data to send to the server (you can customize this)
    const paymentData = {
      cardNumber,
      expiryDate,
      pin,
    };

    try {
      // Send the payment data to the server using Axios or your preferred method
      const response = await axios.post('/api/payment', paymentData);

      // Handle the response from the server as needed

      // Navigate to a success page or handle errors
      navigate('/payment-success');
    } catch (error) {
      // Handle errors, e.g., show an error message
      console.error('Payment failed:', error);
    }
  };

  return (
    <>
      <CustomStepper active={2} />
      <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
        <form onSubmit={handlePayment}>
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-bold mb-2">
              Card Number:
            </label>
            <input
              type="text"
              id="cardNumber"
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
              value={cardNumber}
              onChange={(e) => setCardNumber(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="expiryDate" className="block text-gray-700 text-sm font-bold mb-2">
              Expiry Date:
            </label>
            <input
              type="text"
              id="expiryDate"
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="pin" className="block text-gray-700 text-sm font-bold mb-2">
              PIN:
            </label>
            <input
              type="password"
              id="pin"
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              required
            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
            >
              Pay ${total}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default Payment;
