import React from 'react';
import { useStepper } from '../hooks/useStepper';

/* eslint-disable-next-line */
export interface HeadlessStepperProps {}

export function HeadlessStepper(props: HeadlessStepperProps) {
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
      <h1>Welcome to HeadlessStepper!</h1>
      <div>
        <nav style={{ display: 'flex' }} {...stepperProps}>
          {stepsProps?.map((step, index) => (
            <ol
              key={index}
              style={{
                opacity: steps[index].disabled ? 0.6 : 1,
                fontWeight: state.currentStep === index ? 'bold' : 'unset',
              }}
            >
              <a {...step}>{steps[index].label}</a>
            </ol>
          ))}
        </nav>
      </div>
      <p>Current step: {state.currentStep}</p>
      <button
        className="py-4 px-3 bg-blue-300"
        onClick={prevStep}
        disabled={!state.hasPreviousStep}
      >
        Prev
      </button>
      <button
        className="py-4 px-3 bg-blue-300"
        onClick={nextStep}
        disabled={!state?.hasNextStep}
      >
        Next
      </button>
      <div className="bg-gray-400 w-100% h-1/2" {...progressProps} />
      <pre>
        <code>{JSON.stringify(state, null, 2)}</code>
      </pre>
    </div>
  );
}

export default HeadlessStepper;
