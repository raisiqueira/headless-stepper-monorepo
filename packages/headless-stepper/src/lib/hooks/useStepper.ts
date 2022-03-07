import React from 'react';
import type { HTMLAttributes } from 'react';
import { useId } from './useId';
import type { Steps, StepperOrientation, StepperDirection } from '../types';

type StepperProps = {
  steps: Steps[];
  currentStep?: number;
};

type StepperState = {
  currentStep: number;
  /** Unique ID to the progress bar. */
  progressId: string;
  /** These ID you can use with a span element to represent the progress bar label. */
  labelId: string;
  /** check if has previuos step */
  hasPreviousStep?: boolean;
};

type UseStepper = {
  /** Props to use into any React Element to represent the steps. */
  stepsProps: unknown;
  /** props to use into a HTMLElement to represents a progress bar. */
  progressProps: HTMLAttributes<HTMLElement>;
  /** the stepper state with current step, disabled steps and other props. */
  state: StepperState;
  /** Next step */
  nextStep: () => void;
  /** Previous step */
  prevStep: () => void;
};

const useStepper = (props: StepperProps): UseStepper => {
  const { steps, currentStep } = props;
  // IDs
  const progressId = useId();
  const labelId = `${useId()}-label`;
  // States & Ref's
  const [_currentStep, setCurrentStep] = React.useState(currentStep ?? 0);
  const hasPreviousStep = React.useRef(false);

  // Check previous step
  hasPreviousStep.current = _currentStep < steps.length - 1;
  hasPreviousStep.current = _currentStep > 0;

  // Handlers
  const nextStep = React.useCallback(() => {
    if (_currentStep === steps?.length - 1) return;

    setCurrentStep((currentStep) => currentStep + 1);
  }, [_currentStep, steps]);

  const prevStep = React.useCallback(() => {
    if (_currentStep === 0) return;
    setCurrentStep((currentStep) => currentStep - 1);
  }, [_currentStep]);

  const stepsProps = React.useMemo(() => ({}), []);

  // build the progress bar props.
  const progressProps = React.useMemo<HTMLAttributes<HTMLElement>>(
    () => ({
      'aria-valuenow': _currentStep,
      'aria-valuemin': 0,
      'aria-valuemax': steps.length - 1,
      role: 'progressbar',
      'aria-labelledby': labelId,
      tabIndex: -1, // prevent focus
    }),
    [_currentStep, labelId, steps]
  );

  // build the stepper state.
  const state = React.useMemo(
    () => ({
      labelId,
      progressId: progressId as string,
      currentStep: _currentStep,
      hasPreviousStep: hasPreviousStep.current,
    }),
    [progressId, labelId, _currentStep]
  );

  return {
    stepsProps,
    progressProps,
    state,
    nextStep,
    prevStep,
  };
};

export {
  useStepper,
  // Reexport internal types
  Steps,
  StepperDirection,
  StepperOrientation,
};
