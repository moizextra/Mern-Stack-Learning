import React from 'react'
import CustomStepper from '../Componets/CustomStepper'
import {useNavigate} from 'react-router-dom'
const ConfirmOrder = () => {
  const navigate = useNavigate();

  return (
    <>
<CustomStepper active={1} />
    <div>
Confirm Order
    </div>
    <button onClick={()=>{navigate("/order/confirm/payment")}}>Next</button>
    </>
  )
}

export default ConfirmOrder