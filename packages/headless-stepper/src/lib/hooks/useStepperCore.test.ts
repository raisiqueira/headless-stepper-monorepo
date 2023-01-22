import { renderHook, act } from '@testing-library/react';
import type { RenderHookOptions } from '@testing-library/react';
import { unstable_useStepper } from './useStepperCore';
import type { Stepper } from 'headless-stepper-core';

type InitialProps = Pick<
  RenderHookOptions<Stepper>,
  'initialProps'
>['initialProps'];

describe('useStepperCore.ts', () => {
  const baseSteps = [
    {
      label: 'Step 1',
    },
    {
      label: 'Step 2',
      disabled: true,
    },
    {
      label: 'Step 3',
    },
  ];
  const initialProps: InitialProps = {
    steps: baseSteps,
    currentStep: 0,
    orientation: 'horizontal',
  };

  const { result } = renderHook((props) => unstable_useStepper(props), {
    initialProps: initialProps,
  });

  describe('getters', () => {
    it('get the initial state', () => {
      expect(result.current.steppers).toEqual({
        currentStep: 0,
        orientation: 'horizontal',
        steps: baseSteps,
      });
    });
  });

  describe('mutations', () => {
    const { result } = renderHook(() =>
      unstable_useStepper({ steps: baseSteps })
    );

    it('update the current step using the setState fn', () => {
      act(() => {
        result.current.setStep(1);
      });

      expect(result.current.steppers).toEqual({
        currentStep: 1,
        orientation: 'horizontal',
        steps: baseSteps,
      });
    });

    it('should call the nextStep fn', () => {
      act(() => {
        result.current.setStep(0);
      });
      expect(result.current.steppers.currentStep).toBe(0);

      act(() => {
        result.current.nextStep();
      });

      expect(result.current.steppers).toEqual({
        currentStep: 1,
        orientation: 'horizontal',
        steps: baseSteps,
      });
    });

    it('should call the prevStep fn', () => {
      act(() => {
        result.current.setStep(1);
      });
      expect(result.current.steppers.currentStep).toBe(1);

      act(() => {
        result.current.prevStep();
      });

      expect(result.current.steppers).toEqual({
        currentStep: 0,
        orientation: 'horizontal',
        steps: baseSteps,
      });
    });

    it('should set the orientation', () => {
      act(() => {
        result.current.setStep(0);
      });
      expect(result.current.steppers.currentStep).toBe(0);

      act(() => {
        result.current.setOrientation('vertical');
      });

      expect(result.current.steppers).toEqual({
        currentStep: 0,
        orientation: 'vertical',
        steps: baseSteps,
      });
    });
  });
});
