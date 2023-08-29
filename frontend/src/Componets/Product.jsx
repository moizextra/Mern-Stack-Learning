import React from 'react'
import ReactStars from "react-rating-stars-component";
import { Link } from 'react-router-dom';
const Product = ({product}) => {
    let options={
        edit:false,
    color:"black",
    activeColor:"tomato",
    size:30,
    value:product.rating,
    isHalf:true
    }
  return (
    <div class="card m-3"  style={{width: "18rem"}} key={product._id}>
    <img src={product.images[0].url} class="card-img-top" alt="..."/>
    <div class="card-body">
      <h5 class="card-title"><Link to={`/product/${product._id}`}>{product.name}</Link></h5>
      <p class="card-text">{product.description} <br/>{product.Price}/-</p>
      <ReactStars {...options} /> <p> {product.reviews.length} reviews</p>

      <a href="#" class="btn btn-primary">Buy</a>
    </div>
  </div>
  )
}

export default Product