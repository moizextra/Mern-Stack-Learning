import React from 'react'
import ReactStars from "react-rating-stars-component";

const ReviewCard = ({review}) => {
    let options={
        edit:false,
    color:"black",
    activeColor:"tomato",
    size:30,
    isHalf:true
    }
  return (
    <div class="bg-white rounded-lg p-6 shadow-md w-80 border">
    <div class="flex items-center mb-4">
      <div class="ml-auto">
      <ReactStars {...options} value={review.rating} /> 
     
      </div>
    </div>
    <p class="text-gray-700 mb-4">{review.comment}</p>
    <div class="flex items-center">
      <img class="h-10 w-10 rounded-full" src="user-avatar.jpg" alt="User Avatar"/>
      <div class="ml-3">
        <div class="text-sm font-medium text-gray-800">{review.name}</div>
      </div>
    </div>
  </div>
  )
}

export default ReviewCard