import React from 'react';
import type { PropsWithChildren as ReactPropsWithChildren } from 'react';
import { StepperContext } from '../context';
import { useId } from '../hooks/useId';
import type { ComponentWithAsProps } from '../types';
import { useStepper } from '../hooks/useStepper';
import { IS_DEV } from '../utils';

export interface StepperProps extends ComponentWithAsProps<'nav'> {
  startIndex?: number;
}

const Stepper = React.forwardRef<
  HTMLDivElement,
  ReactPropsWithChildren<StepperProps>
>(({ as, children, startIndex = 0, ...props }, ref) => {
  const id = useId();
  const Component = as ?? 'nav';
  // const {} = useStepper();

  const contextValue = React.useMemo(() => null, []);

  return (
    <StepperContext.Provider value={contextValue}>
      <Component ref={ref} id={id as string}>
        {children}
      </Component>
    </StepperContext.Provider>
  );
});

if (IS_DEV) {
  Stepper.displayName = 'Stepper.Root';
}

export { Stepper };
