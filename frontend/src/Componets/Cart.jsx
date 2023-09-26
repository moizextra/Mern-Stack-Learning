import React from 'react'
import {useSelector,useDispatch} from "react-redux"
import CartItem from './CartItem';

const Cart = () => {
    const dispatch=useDispatch();
    const cartItems=useSelector((state)=>state.cart.cartItems)
  return (
    <div class="d-flex flex-nowrap">
      {cartItems.map((item)=>(
         <CartItem item={item} />
      ))}
    </div>
  )
}

export default Cart