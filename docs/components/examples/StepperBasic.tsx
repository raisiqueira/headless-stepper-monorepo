import React from 'react';
import { CustomSandBox } from '../CustomSandBox';

const Sandbox = () => {
  const code = `
  import { Stepper, Step } from 'headless-stepper/components';

const MyAwesomeStepper = () => {
  return (
    <Stepper currentStep={0}>
      <Step label="Step 1">Step 1 content</Step>

      <Step label="Step 2" disabled>
        Step 2 content
      </Step>

      <Step label="Step 3">Step 3 content</Step>
    </Stepper>
  );
};

export default MyAwesomeStepper;
`;

  return (
    <CustomSandBox
      customSetup={{ dependencies: { 'headless-stepper': 'next' } }}
      files={{
        '/App.tsx': code,
      }}
    />
  );
};

export default Sandbox;
