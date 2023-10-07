import React from 'react'
import CustomStepper from '../Componets/CustomStepper'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cartItems)
  const total = useSelector((state) => state.cart.total);
  const shippingInfo = useSelector(state => state.cart.ShippingInfo)
  const handleNext = () => {
    let shippingCharges = 100; 
    let tax = 20;

    const orderInfo = {
      total,
      shippingCharges,
      tax
    };

    localStorage.setItem('orderInfo', JSON.stringify(orderInfo));

    navigate('/order/confirm/payment');
  }

  return (
    <>
      <CustomStepper active={1} />
      <div className="bg-gray-100 min-h-screen flex flex-col items-center py-8">
        <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
          <h2 className="text-2xl font-bold mb-4">Order Confirmation</h2>

          {/* Shipping Details */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Shipping Address:</h3>
            <p>{shippingInfo.city}, {shippingInfo.state.label} {shippingInfo.pincode}</p>
          </div>

          {/* Order Items */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Order Items:</h3>
            {cartItems.map((item) => (
              <div key={item.product} className="flex items-center mb-2">
                <img
                  src={"https://images.unsplash.com/photo-1525547719571-a2d4ac8945e2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1964&q=80"}
                  alt={item.name}
                  className="w-16 h-16 object-cover mr-4"
                />
                <div>
                  <p className='font-bold'>{item.name}</p>
                  <p>Quantity: {item.quantity}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Total */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold">Order Total:</h3>
            <p>${total}</p>
          </div>
          <div className='flex justify-center'>
            <div>
              <button
                className="btn btn-danger"
                onClick={handleNext}
              >
                Continue Shopping
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  )
}

export default ConfirmOrder