import React from 'react';
import Stepper from '@mui/material/Stepper'; // Import the Stepper component
import Step from '@mui/material/Step'; // Import the Step component
import StepLabel from '@mui/material/StepLabel'; // Import the StepLabel component


// Assuming you have a 'steps' array defined somewhere in your component.
const steps = ['Shipping Details', 'Order Confirm', 'Payment'];

const CustomStepper = ({active}) => {
  return (
    <>
      <Stepper alternativeLabel activeStep={active} >
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel><span className="font-bold">{label}</span></StepLabel>
          </Step>
        ))}
      </Stepper>
    </>
  );
};

export default CustomStepper;
