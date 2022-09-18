import React from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import '@codesandbox/sandpack-react/dist/index.css';

const Sandbox = () => {
  const code = `
  import { Stepper, Step } from 'headless-stepper';

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
    <Sandpack
      template="react-ts"
      customSetup={{ dependencies: { 'headless-stepper': 'next', clsx: '*' } }}
      files={{
        '/App.tsx': code,
      }}
      options={{
        showNavigator: true,
        showTabs: true,
      }}
    />
  );
};

export default Sandbox;
