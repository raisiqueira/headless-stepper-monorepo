/** Type for steps. */
type Steps = {
  /** Label to display. Ex.: Step 04 */
  label: string;
  /** Enable/disable step. */
  disabled?: boolean;
  /** check if a step is valid. */
  isValid?: boolean;
};

/** Steps Direction for ARIA. */
type StepperDirection = 'ltr' | 'rtl';

/** Step orientation for ARIA. */
type StepperOrientation = 'horizontal' | 'vertical';

type StepperContextType = {
  /** Steps that compound the stepper. Default is a empty list. */
  steps: Steps[];
  /** Current step. Default is 0. */
  currentStep: number;
  /** Stepper orientation (vertical or horizontal). Default is horizontal. */
  orientation?: StepperOrientation;
  /** Stepper direction (ltr or rtl). Default is ltr. */
  direction?: StepperDirection;
  /** Trigger an onChange with the current step. */
  onChange?: (index: number) => void | undefined;
};

export { StepperContextType, StepperOrientation, StepperDirection, Steps };
