import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { myOrders } from '../OrderSlices/myOrders';

const MyOrders = () => {
  const dispatch = useDispatch();
  const myorders = useSelector((state) => state.myOrders.myOrders);

  useEffect(() => {
    dispatch(myOrders());
  }, [dispatch]);

  return (
    <>
      {myorders.map((order) => (
        <div
          key={order.id} // Make sure to assign a unique key to each order
          className={`bg-gray-100 min-h-screen flex items-center justify-center ${
            order.OrderStatus === 'Completed' ? 'bg-green-100' : ''
          }`}
        >
          <div className="bg-white shadow-md rounded-lg p-4  md:w-1/2 lg:w-1/3">
            <h1 className="text-2xl font-semibold mb-4 text-blue-600">Orders</h1>
            <div className="border-b border-gray-300 mb-4 pb-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="text-gray-600">
                    <strong>Status:</strong> {order.OrderStatus}
                  </p>
                  <p className="text-gray-600">
                    <strong>Price:</strong> ${order.ItemsPrice}
                  </p>
                </div>
                <img
                  src="status_icon.png"
                  alt="Status Icon"
                  className="w-6 h-6"
                />
              </div>
            </div>
            <div className="text-gray-600">
              <p>
                <strong>Payment ID:</strong> {order.paymentInfo.id}
              </p>
              <p>
                <strong>Created At:</strong> {order.createdAt}
              </p>
              <p>
                <strong>Paid At:</strong> {order.paidAt}
              </p>
            </div>
            <div className=" text-gray-600">
              <p>
                <strong>Shipping Address:</strong>
              </p>
              <address>
                {order.shippinginfo.address}
                <br />
                {order.shippinginfo.city}, {order.shippinginfo.state},{' '}
                {order.shippinginfo.country}
              </address>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default MyOrders;
