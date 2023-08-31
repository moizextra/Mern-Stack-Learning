import React, { useEffect, useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import { getProducts } from '../Productslices/Products'; // Make sure to import the action
import Product from '../Componets/Product'; // Make sure to import the Product component
import Loading from '../Componets/Loading'; // Make sure to import the Loading component

const Products = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.product.Productdata);
  const { keyword } = useParams();
  const [currentPage, setCurrentPage] = useState(1); // Rename `current` to `currentPage`
  const error = useSelector((state) => state.product.error);
  const resultPerPage = useSelector((state) => state.product.resultPerPage); // Fix typo
  const productsCount = useSelector((state) => state.product.ProductCount); // Rename to `productsCount`
  const loading = useSelector((state) => state.product.isLoading);
const handlefetch=()=>{
  const page=3
  dispatch(getProducts(keyword,page));
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

  // const handlePageChange = (pageNumber) => {
  //   setCurrentPage(pageNumber); // Update current page when pagination is clicked
  // };

  if (loading) {
    return <Loading />;
  }

  return (
    <>
      {products && products.map(product => (
        <Product key={product.id} product={product} />
      ))}
  <button className="btn border" onClick={handlefetch}>Fetch</button>
    </>
  
    
  
  );
};

export default Products;
