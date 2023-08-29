import {React,useEffect,useState} from 'react'
import { getProducts } from '../Productslices/Products'
import { ToastContainer, toast } from 'react-toastify';
import Product from '../Componets/Product';
import Loading from '../Componets/Loading';
import {useDispatch,useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
const Products = () => {
  const dispatch=useDispatch()
  const products=useSelector((state)=>state.product.Productdata);
  const {keyword}=useParams();
  const [current,setCurrentPage]=useState(6)
  const error=useSelector((state)=>state.product.error);
  const resultperpage=useSelector((state)=>state.product.resultperpage);
  const ProductsCount=useSelector((state)=>state.product.ProductCount);

  useEffect(() => {
    dispatch(getProducts(keyword,current))
    }, [keyword,current])
   
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
    const handlePageChange = (e) => {
      setCurrentPage(e);
      console.log(current);
    };
  if(!products){
    return <Loading/>
  }
  return (
    <>
     <h1 class="display-2 text-center" >Products</h1>
     <p>Searched for {keyword}</p>
  <div className='d-flex flex-row m-3 border  flex-wrap'>

  {
  products && products.length > 0 ? (
    products.map((product) => {
      return <Product product={product} />;
    })
  ) : products && products.length === 0 ? (
    <p className='font-bold text-justify text-xl'>No Results Found</p>
  ) : (
    <p className='font-bold text-justify text-xl'>No Searched Results</p>
  )
}
  </div>
<ToastContainer/>
<Pagination
        activePage={current}
        itemsCountPerPage={resultperpage}
        totalItemsCount={ProductsCount}
        nextPageText={"next"}
        prevPageText={"prev"}
        firstPageText={"first"}
        lastPageText={"last"}
        itemClass='page-item'
        linkClass='page-link'
        onChange={handlePageChange}
      />
    </>
  )
}

export default Products