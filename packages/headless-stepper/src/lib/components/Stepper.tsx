import React from 'react';
import StepperContext from '../context';
import { useStepper } from '../hooks/useStepper';
import { useIsomorphicId } from '../hooks/useId';
import type { PolymorphicComponentType, StepperOrientation } from '../types';
import type { StepComponentProps } from './Step';

export type StepperComponentProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLElement> & {
    currentStep?: number;
    orientation?: StepperOrientation;
    as?: PolymorphicComponentType;
  }
>;

const Stepper = React.forwardRef<HTMLDivElement, StepperComponentProps>(
  (
    {
      currentStep = 0,
      orientation = 'horizontal',
      children,
      className,
      as,
      ...rest
    },
    ref
  ) => {
    const AsComponent = as || 'nav';
    const id = useIsomorphicId();
    const stepsAsChildren = React.Children.toArray(
      children
    ) as React.ReactElement<StepComponentProps>[];

    /** Values passed to the context. */
    const stepperHookValues = React.useMemo(() => {
      return {
        currentStep,
        orientation,
        steps: stepsAsChildren.map((step) => step.props),
      };
    }, [currentStep, orientation, stepsAsChildren]);

    /** Use the hook to build the entire logic of navigation. */
    const stepperHook = useStepper(stepperHookValues);

    /** Content props used to make the glue between each step with the content. */
    const contentProps = React.useMemo(
      () => ({
        role: 'tabpanel',
        id: `step-content-${id}-${
          stepperHook.stepsProps[stepperHook?.state?.currentStep]?.id
        }`,
        'aria-labelledby': `step-label-${id}-${
          stepperHook.stepsProps[stepperHook?.state?.currentStep]?.id
        }`,
        'aria-expanded': true,
      }),
      [id, stepperHook.state.currentStep, stepperHook.stepsProps]
    ) as React.HTMLAttributes<HTMLElement>;

    /** Step items to display. */
    const items = stepsAsChildren.reduce<React.ReactElement[]>(
      (acc, step, index) => {
        const isDisabled = step.props.disabled;
        acc.push(
          React.cloneElement(step, {
            disabled: isDisabled,
            'aria-controls': `step-content-${id}-${
              stepperHook?.stepsProps[stepperHook?.state?.currentStep]?.id
            }`,
            ...stepperHook?.stepsProps[index],
          })
        );
        return acc;
      },
      []
    );

    const stepContent =
      stepsAsChildren[stepperHook?.state?.currentStep]?.props?.children;

    /** Return the Context and the steps list. */
    return (
      <StepperContext.Provider value={stepperHook}>
        <AsComponent ref={ref} id={id} {...stepperHook.stepperProps} {...rest}>
          {items}
        </AsComponent>
        <div {...contentProps}>{stepContent}</div>
      </StepperContext.Provider>
    );
  }
);

Stepper.displayName = 'Stepper.Root';

export { Stepper };
