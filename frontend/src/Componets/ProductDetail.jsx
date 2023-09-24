import {React,useEffect,useState} from 'react'
import { getProductsDetails } from '../Productslices/ProductDetail';
import {useDispatch,useSelector } from 'react-redux'
import ReactStars from "react-rating-stars-component";
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import ReviewCard from './ReviewCard';
import {addtoCart} from "../CartSlices/index"
const ProductDetail = ({}) => {
let {id}=useParams();
  const dispatch=useDispatch();
  useEffect(() => {
dispatch(getProductsDetails(id))
  }, [dispatch,id])

    const ProductDetailData=useSelector((state)=>state.productDetail.ProductDetailData);
    const [quantity,setquantity]=useState(1);
    const[type,setType]=useState("Description")
    const increment = () => {
      if (ProductDetailData.Stock > quantity) {
        setquantity(quantity + 1);
      } // Dont need to show alert When 
    }
    
    const deincrement=()=>{
      if(quantity>1){
        setquantity(quantity-1)
      }
    }
    let options={
      edit:false,
  color:"black",
  activeColor:"tomato",
  size:30,
  isHalf:true
  }
  const handleSelect=(type)=>{
setType(type)
  }
    if (!ProductDetailData) {
      return <Loading/>;
    }
    const handleCartChange=()=>{
      let product={
        name:ProductDetailData.name,
        Price:ProductDetailData.Price,
        quantity:quantity,
        image:ProductDetailData.image,
        product:ProductDetailData._id
      }
      dispatch(addtoCart(product));
      console.log("Producttobesend:",product);
    }
  return (
    <section className="text-gray-600 body-font overflow-hidden">
  <div className="container px-5 py-24 mx-auto">
    <div className="lg:w-4/5 mx-auto flex flex-wrap">
      <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">{ProductDetailData.name}</h1>
        <ReactStars {...options} value={ProductDetailData.rating} /> <p> ({ProductDetailData.noOfReviews} reviews)</p>
        <div className="flex mb-4">
          <a className={`flex-grow py-2 text-lg px-1 text-center cursor-pointer ${type === "Description" ? "border-b-2 border-blue-500 " : ""}`} onClick={()=>{handleSelect("Description")}}>Description</a>
          <a className={`flex-grow py-2 text-lg px-1  text-center cursor-pointer ${type === "Review" ? "border-b-2 border-blue-500 " : ""}`} onClick={()=>{handleSelect("Review")}}>Reviews</a>
          <a className={`flex-grow py-2 text-lg px-1 text-center cursor-pointer ${type === "Detail" ? "border-b-2 border-blue-500 " : ""}`} onClick={()=>{handleSelect("Detail")}}>Detail</a>
        </div>
        {/* description container */}
{type === "Description"? <div className='description'>
       <p className="leading-relaxed mb-4">{ProductDetailData.description}</p>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Stock</span>
          <span className="ml-auto text-gray-900">{ProductDetailData.Stock>0?<p className='text-green-500'>Available</p>:<p className='text-red-500'>Out of Stock</p>}</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Size</span>
          <span className="ml-auto text-gray-900">Medium</span>
        </div>
        <div className="flex border-t border-gray-200 py-2">
          <span className="text-gray-500">Size</span>
          <span className="ml-auto text-gray-900">Medium</span>
        </div> 
        </div>:"" }
        {/* Reviews Container */}
    {type=="Review"?     <div className="reviews">

{ProductDetailData.reviews ? ProductDetailData.reviews.map((review)=>{
  return <ReviewCard review={review}/>
}) :<p className='font-bold text-justify text-xl'>No Reviews Yet:(</p>}




        </div>:""}
        <div className="flex border-t border-b mb-6 border-gray-200 py-2">
          <span className="text-gray-500 mr-8 flex justify-between items-center font-bold">Quantity : {quantity}</span>
          <div class="btn-group" role="group" aria-label="Basic mixed styles example">
  <button type="button" onClick={deincrement} class="btn btn-danger text-black">-</button>
  <button type="button" onClick={increment} class="btn btn-success text-black">+</button>
</div>

        </div>
        <div className="flex">
          <span className="title-font font-medium text-2xl text-gray-900">${ProductDetailData.Price}</span>
          <button className="flex ml-auto text-white bg-blue-500 border-0 py-2 px-6 focus:outline-none hover:bg-blue-600 rounded" onClick={handleCartChange}>Add to Cart</button>
          <button className="rounded-full w-10 h-10 bg-gray-200 p-0 border-0 inline-flex items-center justify-center text-gray-500 ml-4">
            <svg fill="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" className="w-5 h-5" viewBox="0 0 24 24">
              <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"></path>
            </svg>
          </button>
        </div>
      </div>
      <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400"/>
    </div>
  </div>
</section>
  )
}

export default ProductDetail