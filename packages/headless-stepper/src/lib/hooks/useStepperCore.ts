import { StepperCore, StepperOrientation } from 'headless-stepper-core';
import type { Stepper } from 'headless-stepper-core';
import { useSyncExternalStore, useCallback, useRef } from 'react';

export const unstable_useStepper = (props: Stepper) => {
  const stepper = useRef(new StepperCore(props));

  const subscribe = useCallback((listener: () => void) => {
    return stepper.current.subscribe(listener);
  }, []);

  const setStep = (step: number) => {
    stepper.current.setStep(step);
  };

  const nextStep = () => {
    stepper.current.nextStep();
  };

  const prevStep = () => {
    stepper.current.prevStep();
  };

  const setOrientation = (orientation: StepperOrientation) => {
    stepper.current.setOrientation(orientation);
  };

  const state = useSyncExternalStore(
    subscribe,
    () => stepper.current.getState(),
    () => stepper.current.getState()
  );

  return {
    /** return the snapshot of the steps. */
    steppers: state,
    setStep,
    nextStep,
    prevStep,
    setOrientation,
  };
};

export type UseStepperCore = ReturnType<typeof unstable_useStepper>;
