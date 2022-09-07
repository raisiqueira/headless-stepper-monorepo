import React from 'react';
import { Stepper } from '../components/Stepper';

const StepperComponent = () => {
  return (
    <Stepper currentStep={2}>
      <Stepper.Step label="Step 1">Step 1 content</Stepper.Step>

      <Stepper.Step label="Step 2" disabled>
        Step 2 content
      </Stepper.Step>

      <Stepper.Step label="Step 3">Step 3 content</Stepper.Step>
    </Stepper>
  );
};

export default StepperComponent;
