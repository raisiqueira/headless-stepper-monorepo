import { Stepper, Step } from '../components/Stepper';

const StepperComponent = () => {
  return (
    <Stepper currentStep={0} className="example">
      <Step label="Step 1">Step 1 content</Step>

      <Step label="Step 2" disabled>
        Step 2 content
      </Step>

      <Step label="Step 3">Step 3 content</Step>
    </Stepper>
  );
};

export default StepperComponent;
