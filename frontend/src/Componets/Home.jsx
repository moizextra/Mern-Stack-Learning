import React, { useEffect } from 'react'
import Product from './Product'
import Metadata from './layout/metadata'
import {useDispatch } from 'react-redux'
import { getProducts } from '../Productslices/ProductSlice'
const Home = () => {
  const dispatch=useDispatch()
useEffect(() => {
dispatch(getProducts());
}, [])

  
    const productdemo={
              "_id": "moizsheraz",
            "name": "Product 1",
            "description": "Product 1 description",
            "Price": 500,
            "rating": 0,
            "category": "Laptop",
            "Stock": 1,
            "image": [
                {url:"https://images.unsplash.com/photo-1569060368681-889a62a8f416?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"}
            ],
            "reviews": [],
    }
  return (
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
  <h1 class="display-2 text-center">Featured Products</h1>
  <div className='d-flex flex-row m-3 border border-0 flex-wrap'>
  <Product product={productdemo} />
  <Product product={productdemo} />
  <Product product={productdemo} />
  <Product product={productdemo} />
  <Product product={productdemo} />
  <Product product={productdemo} />
  <Product product={productdemo} />
  <Product product={productdemo} />
  </div>
  </section>
    </>

  )
}

export default Home