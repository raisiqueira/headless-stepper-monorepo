import React from "react";
import type { ReactNode } from "react";
import { useId } from "../hooks/useId";
import { useStepperContext } from "../hooks/useStepperContext";
import { Steps } from "../types";
import { StepperContext, StepperProvider } from "../context";

type StepperPropgressProps = {
  children?: ReactNode;
  steps: Steps[];
};

const StepperProgress = React.forwardRef<HTMLDivElement, StepperPropgressProps>(
  ({ children, steps }, ref) => {
    const stepperContext = useStepperContext();
    const cx = React.useContext(StepperContext);
    const id = useId();
    console.log({ stepperContext, cx });
    const values = stepperContext?.steps;
    const currentStep = stepperContext?.currentStep;
    return (
      <StepperProvider steps={steps}>
        {children ? (
          <div
            id={id}
            ref={ref}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={values.length}
            aria-valuenow={currentStep}
            aria-disabled={false}
            tabIndex={-1}
          >
            {children}
          </div>
        ) : (
          <div
            id={id}
            ref={ref}
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={values.length}
            aria-valuenow={currentStep}
            aria-disabled={false}
            tabIndex={-1}
          />
        )}
      </StepperProvider>
    );
  }
);

StepperProgress.displayName = "StepperProgress";

export { StepperProgress };
