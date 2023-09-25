import React,{useEffect, useState} from 'react'
import {useDispatch,useSelector } from 'react-redux'
import { getProductsDetails } from '../Productslices/ProductDetail';
const CartItem = ({ item }) => {
  const dispatch=useDispatch();
  const ProductDetailData=useSelector((state)=>state.productDetail.ProductDetailData);
  const [quantity,setquantity]=useState(item.quantity);
const [price,setprice]=useState(item.quantity*item.Price)
const updatePrice=()=>{
  setprice(quantity*item.Price);
}
useEffect(() => {
  updatePrice();
}, [quantity])
  const increment = (id) => {
    dispatch(getProductsDetails(id))
    if (ProductDetailData.Stock > quantity) {
      setquantity(quantity + 1);
    } // Dont need to show alert When 
  }
  
  const deincrement=(id)=>{
    dispatch(getProductsDetails(id))
    if(quantity>1){
      setquantity(quantity-1)
    }
  }
  return (
    <div class="card m-3" style={{ width: "18rem" }} key={item.product}>
      <img src="https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80" class="card-img-top w-48" alt="..." />
      <div class="card-body">
        <h5 class="card-title">{item.name}</h5>
        <div class="btn-group" role="group" aria-label="Basic mixed styles example">
          <p className='m-2'><span className='font-bold'>Quantity : </span>{quantity}</p>
          <p className='m-2'><span className='font-bold'>Total Price : </span>{price}</p>
          <button type="button" onClick={()=>{deincrement(item.product)}} class="btn btn-danger text-black">-</button>
          <button type="button" onClick={()=>{increment(item.product)}} class="btn btn-success text-black">+</button>
        </div>
        <a href="#" class=" m-1 btn btn-primary">Remove</a>
      </div>
    </div>
  )
}

export default CartItem