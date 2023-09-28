import React from 'react'
import {useSelector,useDispatch} from "react-redux"
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
const Cart = () => {
  const navigate=useNavigate();
    const dispatch=useDispatch();
    const cartItems=useSelector((state)=>state.cart.cartItems)
    const total=useSelector((state)=>state.cart.total);
    const handleCheckOut=()=>{
      navigate("/login?redirect=/shipping"); // /login?redirect= [0]  /shipping =[1]
    }

  return (
    <>
    <div class="d-flex flex-nowrap">
      {cartItems.map((item)=>(
         <CartItem item={item} />
      ))}
    </div>
      <hr className='border-4 rounded-md border-black-800 '/>
      <h1>Total:${total}</h1>
      <div className='flex w-screen justify-center'>
        <div>
        <button className='btn btn-success ' onClick={handleCheckOut}>Check Out</button>
        </div>
      </div>
      </>
  )
}

export default Cart