import React from 'react';
import type { HTMLAttributes, KeyboardEvent } from 'react';
import { useId } from './useId';
import type { Steps } from '../types';

/**
 * Props for build stepper.
 */
type StepperProps = {
  /** List of steps. */
  steps: Steps[];
  /** Current step selected. */
  currentStep?: number;
};

/**
 * Types for the stepper state.
 */
type StepperState = {
  currentStep: number;
  /** Unique ID to the progress bar. */
  progressId: string;
  /** These ID you can use with a span element to represent the progress bar label. */
  labelId: string;
  /** check if has previuos step */
  hasPreviousStep?: boolean;
};

/**
 * Hook to use stepper.
 */
type UseStepper = {
  /** Props to use into any React Element to represent the steps. */
  stepsProps: HTMLAttributes<HTMLElement>[];
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
  const stepElementsRef = React.useRef<HTMLElement[]>([]);
  const currentStepFocused = React.useRef<number | null>(null);

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

  // handle keydown
  const handleKeydown = React.useCallback(
    (event: KeyboardEvent<HTMLElement>, index: number) => {
      const kbLeftRightArrowsKeys = [37, 39];
      const kbEnterSpaceKeys = [13, 32];
      if (kbLeftRightArrowsKeys.includes(event?.keyCode)) {
        event?.preventDefault();
        // Focus prev or next step when user press left or right arrow
        if (event?.keyCode === 39) {
          stepElementsRef.current[index + 1]?.focus();
          currentStepFocused.current = index + 1;
        }
        if (event?.keyCode === 37) {
          stepElementsRef.current[index - 1]?.focus();
          currentStepFocused.current = index - 1;
        }
      }
      if (kbEnterSpaceKeys.includes(event?.keyCode)) {
        // If user press enter or space, go to next step
        setCurrentStep(currentStepFocused.current as number);
      }
    },
    []
  );

  // Build the steps props.
  const stepsProps = React.useMemo(() => {
    return steps?.map((step, index) => {
      return {
        tabIndex: index === _currentStep ? 0 : -1,
        onKeyDown: (event) => handleKeydown(event, index),
        'aria-current': index === _currentStep ? 'step' : undefined,
        'aria-disabled': step?.disabled,
        ref: (element: HTMLElement) =>
          (stepElementsRef.current[index] = element),
      } as HTMLAttributes<HTMLElement>;
    });
  }, [_currentStep, handleKeydown, steps]);

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
  StepperProps,
  StepperState,
  UseStepper,
  // Reexport internal types
  Steps,
};
