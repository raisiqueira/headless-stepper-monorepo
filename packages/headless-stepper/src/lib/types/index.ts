import type {
  HTMLAttributes as ReactHTMLAttributes,
  ElementType as ReactElementType,
} from 'react';

/** Type for steps. */
export type Steps = {
  /** Label to display. Ex.: Step 04 */
  label: string;
  /** Enable/disable step. */
  disabled?: boolean;
  /** check if a step is valid. */
  isValid?: boolean;
};

/** Steps Direction for ARIA. */
export type StepperDirection = 'ltr' | 'rtl';

/** Step orientation for ARIA. */
export type StepperOrientation = 'horizontal' | 'vertical';

/**
 * Props for build stepper.
 */
export type StepperProps = {
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
  /** Check if has previuos step. */
  hasPreviousStep?: boolean;
  /** Check if has next step. */
  hasNextStep?: boolean;
  /** returns the total steps. */
  totalSteps: number;
};

/**
 * Hook to use stepper.
 */
export type UseStepper = {
  /** Props to use into any React element to represent the stepper. */
  stepperProps: ReactHTMLAttributes<HTMLElement>;
  /** Props to use into any React Element to represent the steps. */
  stepsProps: ReactHTMLAttributes<HTMLElement>[];
  /** props to use into a HTMLElement to represents a progress bar. */
  progressProps: ReactHTMLAttributes<HTMLElement>;
  /** the stepper state with current step, disabled steps and other props. */
  state: StepperState;
  /** Next step */
  nextStep: () => void;
  /** Previous step */
  prevStep: () => void;
};

/**
 * Type for a component with as Props.
 */
export type ComponentWithAsProps<
  As extends ReactElementType = ReactElementType
> = {
  as?: As;
};
