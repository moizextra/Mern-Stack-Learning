// This is the File Where we are actually placing Order
import React, { useState, useRef, useEffect } from 'react';
import CustomStepper from '../Componets/CustomStepper';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux"
import { PaymentElement } from '@stripe/react-stripe-js';

import axios from 'axios';
import {
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import Loading from '../Componets/Loading';
const Payment = () => {

  useEffect(() => {
    if (!stripe) {
      return;
    }
  })
  const user = useSelector(state => state.User.userData.user);
  const { cartItems, ShippingInfo } = useSelector(state => state.cart);
  const paybtn = useRef(null);
  const navigate = useNavigate();
  const total = useSelector(state => state.cart.total)
  // State variables to store form input values
  const stripe = useStripe();
  const elements = useElements();
  const orderInfo = JSON.parse(localStorage.getItem("orderInfo"))
  // Function to handle form submission
  const handlePayment = async (e) => {
 
    e.preventDefault();
    paybtn.current.disabled = true;
    try {
      const config = {
        headers: {
          "Content-Type": "application/json"
        }
      }
      const paymentData = {
        amount: Math.round(orderInfo.total * 100),
      }
      const { data } = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/payment/process`, paymentData, config)
      const client_secret = data.clientSecret;
      if (!stripe || !elements) {
        return;
      }
      const result = await stripe.confirmCardPayment(client_secret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
          billing_details: {
            name: user.name,
            email: user.email,
            address: {
              line1: ShippingInfo.address,
              city: ShippingInfo.city,
              postal_code: ShippingInfo.pincode,
              country: "US"
            }
          }
        }

      })
     
      if (result.error) {
        paybtn.current.disabled = false;
        alert(result.error.message)
      } else {
        
        alert("Payment Successfull")
        navigate("/success")
      }

    } catch (error) {

    }
  }

  return (
    <>
      <CustomStepper active={2} />
      <div className="max-w-md mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Payment Details</h2>
        <form >
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block text-gray-700 text-sm font-bold mb-2">
              Card Number:
            </label>
            <CardNumberElement
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"

            />
          </div>
          <div className="mb-4">
            <label htmlFor="expiryDate" className="block text-gray-700 text-sm font-bold mb-2">
              PIN:
            </label>
            <CardCvcElement
              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"

            />
          </div>
          <div className="mb-4">
            <label htmlFor="pin" className="block text-gray-700 text-sm font-bold mb-2">
              Expiry Date
            </label>
            <CardExpiryElement

              className="w-full px-3 py-2 rounded border border-gray-300 focus:outline-none focus:border-blue-400"

            />
          </div>
          <div className="text-center">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue"
              onClick={handlePayment} ref={paybtn}>
       {loading ? "Loading..." : `Pay $${total}`}     
            </button>
          </div>
        </form>
      </div>

    </>
  );
};

export default Payment;
