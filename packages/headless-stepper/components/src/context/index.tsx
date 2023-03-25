import React from 'react';
import type { UseStepper } from 'headless-stepper';

/**
 * Context for the stepper.
 */
const StepperContext = React.createContext<UseStepper | null>(null);

StepperContext.displayName = 'StepperContext';

export default StepperContext;
