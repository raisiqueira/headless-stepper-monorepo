import React from 'react';
import { IS_DEV } from '../utils';

/**
 * Context for the stepper.
 */
export const StepperContext = React.createContext<unknown | null>(null);

if (IS_DEV) {
  StepperContext.displayName = 'StepperContext';
}
