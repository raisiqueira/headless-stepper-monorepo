import React from 'react';
import type { UseStepper } from '../hooks/useStepper';
import { IS_DEV } from '../utils';

/**
 * Context for the stepper.
 */
const StepperContext = React.createContext<UseStepper | null>(null);

if (IS_DEV) {
  StepperContext.displayName = 'StepperContext';
}

export default StepperContext;
