import React,{useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { myOrders } from '../OrderSlices/myOrders';
const MyOrders = () => {
  const dispatch = useDispatch();
useEffect(() => {
  dispatch(myOrders());
},[dispatch])
  return (
    <>
      <h1 className="text-2xl font-semibold mb-4">Orders</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-lg font-semibold mb-2">Order #1</h2>
          <p className="text-gray-600">Date: 2023-10-18</p>
          <p className="text-gray-600">Status: In Progress</p>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Details</button>
        </div>
      </div>
    </>
  )
}

export default MyOrders;
