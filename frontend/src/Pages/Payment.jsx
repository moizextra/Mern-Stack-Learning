import React from 'react'
import CustomStepper from '../Componets/CustomStepper'
import {useNavigate} from 'react-router-dom'
const Payment = () => {
  return (
    <>
<CustomStepper active={2} />
    <div>
      Payment Details
      </div>
      
      </>
  )
}

export default Payment