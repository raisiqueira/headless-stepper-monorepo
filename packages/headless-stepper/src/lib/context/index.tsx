import React from 'react';
import type { UseStepper } from '../hooks/useStepper';

/**
 * Context for the stepper.
 */
const StepperContext = React.createContext<UseStepper | null>(null);

StepperContext.displayName = 'StepperContext';

export default StepperContext;
