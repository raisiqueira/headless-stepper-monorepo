import React from "react";
import { StepperContext } from "../context";

const useStepperContext = () => {
  const context = React.useContext(StepperContext);
  if (!context) {
    throw new Error("Do not use stepper outside of the StepperContext!");
  }
  return context;
};

export { useStepperContext };
