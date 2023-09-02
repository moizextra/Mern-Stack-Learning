import React, { useEffect } from 'react'
import Product from './Product'
import Metadata from './layout/metadata'
import {useDispatch,useSelector } from 'react-redux'
import Loading from './Loading'
import { getProducts } from '../Productslices/Products'
import { ToastContainer, toast } from 'react-toastify';
const Home = () => {
  const dispatch=useDispatch();
const products=useSelector((state)=>state.product.Productdata);
const error=useSelector((state)=>state.product.error);
console.log(error);
console.log(products)
useEffect(() => {
  let keyword=""
  let page=1
  let price=[0,300]
  let Category="Laptop"
  let ratings=0
  dispatch(getProducts(keyword,page,price,Category,ratings));
}, [])
useEffect(() => {
  if(error){
    toast.error('Some unknown Error Occured!', {
      position: "bottom-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      })
  }
}, [error])

// Getting the isloading and Product from State

  return (
    <>
    <>
    <Metadata title="Mern Stack Learning 1"/>
    <section className="hero">
    <div className="content">
      <h2>Welcome to Mern Stack Learning Project</h2>
      <p>Explore the Best Practices from this <button type="button" class="btn btn-primary">Explore</button></p>
      </div>
    <div className="waves"></div>
  </section>
  <section className='Productsection'>
  <h1 class="display-2 text-center" >Featured Products</h1>
  <div className='d-flex flex-row m-3 border  flex-wrap'>

{ products?products.map((product)=>{
  return <Product product={product}/>
}):<Loading/>}
  </div>
  </section>
    </>
<ToastContainer/>
</>
  )
}

export default Home