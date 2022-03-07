import React from "react";
import type { ReactNode } from "react";
import type {
  StepperContextType,
  StepperDirection,
  StepperOrientation,
  Steps,
} from "../types";
import { IS_DEV } from "../utils";

const defaultValues: StepperContextType = {
  steps: [],
  orientation: "horizontal",
  direction: "ltr",
  currentStep: 0,
  onChange: undefined,
};

/**
 * Context for the stepper.
 */
const StepperContext = React.createContext<StepperContextType>(defaultValues);

// ---

type StepperProviderProps = {
  children: ReactNode;
  steps: Steps[];
  onChange?: (index: number) => void;
};

const StepperProvider = ({
  children,
  steps,
  onChange,
}: StepperProviderProps) => {
  const [orientation, setOrientation] =
    React.useState<StepperOrientation>("horizontal");
  const [direction, setDirection] = React.useState<StepperDirection>("ltr");
  const [currentStep, setCurrentStep] = React.useState<number>(0);

  const handleOnChange = React.useCallback(() => {
    onChange(currentStep);
  }, []);

  const nextStep = React.useCallback(() => {
    setCurrentStep(currentStep + 1);
  }, []);

  const prevStep = React.useCallback(() => {
    if (currentStep === 0) return;
    setCurrentStep(currentStep - 1);
  }, []);

  const value = React.useMemo(
    () => ({
      orientation,
      currentStep,
      steps,
      direction,
      prevStep,
      nextStep,
      onChange: handleOnChange,
    }),
    [steps]
  );

  throw new Error("Not implemented yet!");

  // return (
  //   <StepperContext.Provider value={value}>{children}</StepperContext.Provider>
  // );
};

if (IS_DEV) {
  StepperContext.displayName = "StepperContext";
  StepperProvider.displayName = "StepperProvider";
}

export { StepperProvider, StepperContext };
