/** Step orientation for ARIA. */
export type StepperOrientation = 'horizontal' | 'vertical';

/** Type for steps. */
export type Steps = {
  /** Label to display. Ex.: Step 04 */
  label: string;
  /** Enable/disable step. */
  disabled?: boolean;
  /** check if a step is valid. */
  isValid?: boolean;
};

/**
 * Props for build stepper.
 */
export type Stepper = {
  /** List of steps. */
  steps: Steps[];
  /** Current step selected. */
  currentStep?: number;
  /** Orientation. Default is horizontal. */
  orientation?: StepperOrientation;
};

/**
 * Types for the stepper state.
 */
export type StepperState = {
  /** returns the current step. */
  currentStep: number;
  /** Unique ID to the progress bar. */
  progressId: string;
  /** These ID you can use with a span element to represent the progress bar label. */
  labelId: string;
  /** Check if has previous step. */
  hasPreviousStep?: boolean;
  /** Check if has next step. */
  hasNextStep?: boolean;
  /** returns the total steps. */
  totalSteps: number;
};

/**
 * Return type for the Stepper. It contains all the props to use into the stepper.
 *
 * @template Attr - HTMLAttributes to use into the stepper.
 *
 * @example
 *
 * ```ts
 * import type { HTMLAttributes } from 'react';
 *   const useStepper: UseStepper<HTMLAttributes<HTMLElement>> = ...;
 * ```
 */
export type StepperReturnType<Attr> = {
  /** Props to use into any React element to represent the stepper. */
  stepperProps: Attr;
  /** Props to use into any React Element to represent the steps. */
  stepsProps: Attr[];
  /** props to use into a HTMLElement to represents a progress bar. */
  progressProps: Attr;
  /** the stepper state with current step, disabled steps and other props. */
  state: StepperState;
  /** Next step */
  nextStep: () => void;
  /** Previous step */
  prevStep: () => void;
  /** Choose a step to go to. */
  setStep: (step: number) => void;
};
