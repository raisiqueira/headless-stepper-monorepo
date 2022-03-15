import React from 'react';
import { SandpackRunner } from '@codesandbox/sandpack-react';
import '@codesandbox/sandpack-react/dist/index.css';

const Sandbox = () => {
  const code = `
  import React from 'react';
  import { useStepper } from 'headless-stepper';
  interface HeadlessStepperProps {}

  export default function HeadlessStepper(props: HeadlessStepperProps) {
    const steps = React.useMemo(
      () => [
        {
          label: 'Step 1',
        },
        { label: 'Step 2' },
        { label: 'Step 3' },
        { label: 'Step 4', disabled: true },
        { label: 'Step 5' },
        { label: 'Step 6' },
      ],
      []
    );
    const { state, nextStep, prevStep, progressProps, stepsProps, stepperProps } =
      useStepper({
        steps,
      });
    return (
      <div>
        <div>
          <nav style={{ display: 'flex' }} {...stepperProps}>
            {stepsProps?.map((step, index) => (
              <ol key={index}>
                <a {...step}>{steps[index].label}</a>
              </ol>
            ))}
          </nav>
        </div>
        <p>Current step: {state.currentStep}</p>
        <button onClick={prevStep} disabled={!state.hasPreviousStep}>
          Prev
        </button>
        <button onClick={nextStep}>Next</button>
        <div {...progressProps} />
      </div>
    );
  }`;
  return (
    <SandpackRunner
      template="react-ts"
      customSetup={{ dependencies: { 'headless-stepper': 'beta' } }}
      code={code}
    />
  );
};

export default Sandbox;
