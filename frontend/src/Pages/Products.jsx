import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Metadata from '../Componets/layout/metadata';
import { getFilteredProducts } from '../Productslices/FilteredProducts';
import Product from '../Componets/Product'; // Make sure to import the Product component
import Loading from '../Componets/Loading'; // Make sure to import the Loading component
import { Slider } from '@mui/material';
import Typography from '@mui/material/Typography';
const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.FilteredProducts.Productdata);
  const { keyword } = useParams();
  const error = useSelector((state) => state.FilteredProducts.error);
  const resultPerPage = useSelector((state) => state.FilteredProducts.resultPerPage); // Fix typo
  const productsCount = useSelector((state) => state.FilteredProducts.ProductCount); // Rename to `productsCount`
  const loading = useSelector((state) => state.FilteredProducts.isLoading);
  const [page,setpage]=useState(1)
  const [price,setprice]=useState([0,25000])
  const [Category,setCategory]=useState("Laptop")
  const [ratings,setratings]=useState(0);
const handlefetch=()=>{
  dispatch(getFilteredProducts({ keyword, page }));
}
const categories=[
  "Laptop",
  "Mobile",
  "TV"
]
const handlepage=()=>{
  setpage(page+1)
}
const pricehandler=(e,newprice)=>{
setprice(newprice)
}
const handlePrevPage=()=>{
  setpage(page-1)
}
const handleCategoryChange=(category)=>{
setCategory(category);
}
  useEffect(() => {
    if (error) {
      toast.error('Some unknown Error Occured!', {
        position: "bottom-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  }, [error]);
  useEffect(() => {
    dispatch(getFilteredProducts({keyword,page,price,Category,ratings}))
   console.log(Category)
    }, [keyword,page,price,Category,ratings])

  if (loading) {
    return <Loading />;
  }

  return (
  <>
    <Metadata title="Products Page"/>
  <div class="d-flex flex-nowrap">
   {products?products.map(product => (
        <Product key={product.id} product={product} />
      )):<p>You Have Reached End </p>}
</div>
<div className='filterBox w-56 ml-8 border border-black p-6'>
  <h1 className='font-bold text-xl'>Filter Price</h1>
<Typography>
<Slider
 value={price}
 onChange={pricehandler}
 valueLabelDisplay='auto'
 aria-labelledby='range-slider'
 min={0}
 max={300}
/>
</Typography>

</div>
<div className='filterBox w-56 ml-8 border border-black p-6'>
  <h1 className='font-bold text-xl'>Rating Above</h1>
<Typography>
<Slider
 value={ratings}
 onChange={(e,newRating)=>{setratings(newRating)}}
 valueLabelDisplay='auto'
 aria-labelledby='range-slider'
 min={0}
 max={5}
/>
</Typography>

</div>
<div className='filterBox w-56 ml-8 border border-black p-6'>
<div class="btn-group">
  <button class="btn btn-primary text-dark dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
   Choose Category
  </button>
  <ul class="dropdown-menu">
    {categories.map((category)=>{
    return  <li><a class="dropdown-item"  onClick={()=>{handleCategoryChange(category)}}>{category}</a></li>
    })}
   
  </ul>
</div>
</div>
<button onClick={handlepage}>Next Page</button>
<button onClick={handlePrevPage}>Prev Page</button>
  </>
  );
};

export default Products;
