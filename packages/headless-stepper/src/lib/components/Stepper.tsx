import React from 'react';
import cslx from 'clsx';
import StepperContext from '../context';
import { useIsomorphicId } from '../hooks/useId';
import { useStepper } from '../hooks/useStepper';
import type {
  PolymorphicComponentType,
  StepperOrientation,
  Steps,
} from '../types';
import { IS_DEV } from '../utils';

export type StepperProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLElement> & {
    currentStep?: number;
    orientation?: StepperOrientation;
    as?: PolymorphicComponentType;
  }
>;

export type StepProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLElement> &
    Steps & {
      as?: PolymorphicComponentType;
    }
>;

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
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
    ) as React.ReactElement<StepProps>[];

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
        <AsComponent
          ref={ref}
          id={id}
          className={cslx(className)}
          {...stepperHook.stepperProps}
          {...rest}
        >
          {items}
          <div className="content" {...contentProps}>
            {stepContent}
          </div>
        </AsComponent>
      </StepperContext.Provider>
    );
  }
);

const Step = React.forwardRef<HTMLDivElement, StepProps>((props, ref) => {
  const { label, disabled, as, ...rest } = props;
  const AsComponent = as || 'button';

  return (
    <AsComponent ref={ref} {...rest}>
      {label}
    </AsComponent>
  );
});

if (IS_DEV) {
  Stepper.displayName = 'Stepper.Root';
  Step.displayName = 'Stepper.Step';
}

export { Stepper, Step };
