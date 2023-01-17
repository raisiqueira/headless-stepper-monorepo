import React from 'react';
import type { HTMLAttributes, KeyboardEvent } from 'react';
import { useIsomorphicId } from './useId';
import type { Steps } from '../types';
import type {
  Stepper,
  StepperReturnType,
  StepperState,
} from 'headless-stepper-core';

/** Props that the hook receives. */
type StepperProps = Stepper;

/**
 * Hook to use stepper.
 */
type UseStepper = StepperReturnType<HTMLAttributes<HTMLElement>>;

const useStepper = ({
  orientation = 'horizontal',
  ...rest
}: StepperProps): UseStepper => {
  const { steps, currentStep } = rest;
  // IDs
  const stepperId = useIsomorphicId();
  const progressId = useIsomorphicId();
  const labelId = `${useIsomorphicId()}-label`;
  // States & Ref's
  const [_currentStep, setCurrentStep] = React.useState(currentStep ?? 0);
  const hasPreviousStep = React.useRef(false);
  const hasNextStep = React.useRef(false);
  const stepElementsRef = React.useRef<HTMLElement[]>([]);
  const currentStepFocused = React.useRef<number | null>(null);
  const totalSteps = React.useRef(steps.length);

  // Check previous step
  hasPreviousStep.current = _currentStep < steps.length - 1;
  hasPreviousStep.current = _currentStep > 0;

  // Check next step
  hasNextStep.current = _currentStep < steps.length - 1;

  // Handlers
  const nextStep = React.useCallback(() => {
    if (_currentStep === steps?.length - 1) return;

    setCurrentStep((currentStep) => currentStep + 1);
  }, [_currentStep, steps]);

  const prevStep = React.useCallback(() => {
    if (_currentStep === 0) return;
    setCurrentStep((currentStep) => currentStep - 1);
  }, [_currentStep]);

  const _getNextArrayItem = (el: HTMLElement) => {
    const currentIndex = stepElementsRef.current.indexOf(el);
    const nextItem = (currentIndex + 1) % stepElementsRef.current.length;
    return stepElementsRef.current[nextItem];
  };

  const _getPreviousArrayItem = (el: HTMLElement) => {
    const currentIndex = stepElementsRef.current.indexOf(el);
    const previousItem =
      (currentIndex - 1 + stepElementsRef.current.length) %
      stepElementsRef.current.length;
    return stepElementsRef.current[previousItem];
  };

  // handle keydown
  const handleKeydown = React.useCallback(
    (event: KeyboardEvent<HTMLElement>, index: number) => {
      const kbLeftRightArrowsKeys = [37, 39];
      const kbEnterSpaceKeys = [13, 32];
      const previousElement = stepElementsRef.current[index - 1];
      const nextElement = stepElementsRef.current[index + 1];
      const nextElToFocus = _getNextArrayItem(nextElement);
      const prevElToFocus = _getPreviousArrayItem(previousElement);
      // Only focus if the next element is not disabled
      const isNextElementDisabled = nextElement?.getAttribute('aria-disabled');
      const isNextElementDisabledBoolean = isNextElementDisabled === 'true';
      const isPreviousElementDisabled =
        previousElement?.getAttribute('aria-disabled');
      const isPreviousElementDisabledBoolean =
        isPreviousElementDisabled === 'true';

      if (kbLeftRightArrowsKeys.includes(event?.keyCode)) {
        event?.preventDefault();
        // Focus prev or next step when user press left or right arrow
        if (event?.keyCode === 39) {
          if (isNextElementDisabledBoolean) {
            nextElToFocus?.focus();
            currentStepFocused.current = stepElementsRef.current.findIndex(
              (el) => el.id === nextElToFocus.id
            );
            return;
          }
          stepElementsRef.current[index + 1]?.focus();
          currentStepFocused.current = index + 1;
        }
        if (event?.keyCode === 37) {
          if (isPreviousElementDisabledBoolean) {
            prevElToFocus?.focus();
            currentStepFocused.current = stepElementsRef.current.findIndex(
              (el) => el.id === prevElToFocus.id
            );
            return;
          }
          stepElementsRef.current[index - 1]?.focus();
          currentStepFocused.current = index - 1;
        }
      }
      if (kbEnterSpaceKeys.includes(event?.keyCode)) {
        // If user press enter or space, go to next step
        setCurrentStep(currentStepFocused.current as number);
      }
    },
    []
  );

  // build the stepper props.
  const stepperProps: HTMLAttributes<HTMLElement> = React.useMemo(
    () => ({
      role: 'tablist',
      'aria-orientation': orientation,
    }),
    [orientation]
  );

  // Build the steps props.
  const stepsProps = React.useMemo(() => {
    // TODO: Maybe return aria-controls?
    return steps?.map((step, index) => {
      return {
        role: 'tab',
        tabIndex: index === _currentStep ? 0 : -1,
        id: `${stepperId}-${index}`,
        'aria-posinset': index + 1,
        'aria-setsize': steps.length,
        'aria-disabled': step?.disabled,
        'aria-current': index === _currentStep ? 'step' : undefined,
        'aria-selected': index === _currentStep,
        onKeyDown: (event) => handleKeydown(event, index),
        onClick: () => setCurrentStep(index),
        ref: (element: HTMLElement) =>
          (stepElementsRef.current[index] = element),
      } as HTMLAttributes<HTMLElement>;
    });
  }, [_currentStep, handleKeydown, stepperId, steps]);

  // build the progress bar props.
  const progressProps = React.useMemo<HTMLAttributes<HTMLElement>>(
    () => ({
      'aria-valuenow': _currentStep,
      'aria-valuemin': 0,
      'aria-valuemax': steps.length - 1,
      role: 'progressbar',
      'aria-labelledby': labelId,
      tabIndex: -1, // prevent focus
    }),
    [_currentStep, labelId, steps]
  );

  // build the stepper state.
  const state = React.useMemo(
    () => ({
      labelId,
      progressId: progressId as string,
      currentStep: _currentStep,
      hasPreviousStep: hasPreviousStep.current,
      hasNextStep: hasNextStep.current,
      totalSteps: totalSteps.current,
    }),
    [progressId, labelId, _currentStep]
  );

  return {
    stepperProps,
    stepsProps,
    progressProps,
    state,
    nextStep,
    prevStep,
    setStep: setCurrentStep,
  };
};

export {
  useStepper,
  StepperProps,
  StepperState,
  UseStepper,
  // Reexport internal types
  Steps,
};
