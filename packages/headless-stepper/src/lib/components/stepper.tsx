import React from "react";
import { StepperProvider } from "../context";
import { useId } from "../hooks/useId";
import type { Steps } from "../types";
import { IS_DEV } from "../utils";

type StepperProps = {
  steps: Steps[];
};

const Stepper = React.forwardRef<HTMLDivElement, StepperProps>(
  ({ steps }, ref) => {
    const id = useId();
    return (
      <StepperProvider steps={steps}>
        <nav ref={ref} id={id}>
          <ol className="stepper">
            {steps.map((step) => {
              const Component = step.component;
              return (
                <React.Fragment key={step?.label}>
                  <li>{step?.label}</li>
                </React.Fragment>
              );
            })}
          </ol>
        </nav>
      </StepperProvider>
    );
  }
);

if (IS_DEV) {
  Stepper.displayName = "Stepper.Root";
}

export { Stepper };
