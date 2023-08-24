import React from 'react'
import ReactStars from "react-rating-stars-component";
const Product = ({product}) => {
    let options={
        edit:false,
    color:"black",
    activeColor:"tomato",
    size:30,
    value:2.5,
    isHalf:true
    }
  return (
    <div class="card m-3" style={{width: "18rem"}} key={product._id}>
    <img src={product.image[0].url} class="card-img-top" alt="..."/>
    <div class="card-body">
      <h5 class="card-title">{product.name}</h5>
      <p class="card-text">{product.description} Price: {product.Price}</p>
      <ReactStars {...options} />,

      <a href="#" class="btn btn-primary">Buy</a>
    </div>
  </div>
  )
}

export default Product