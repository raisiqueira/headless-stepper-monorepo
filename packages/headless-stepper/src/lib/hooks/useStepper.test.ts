import { renderHook, act } from '@testing-library/react';
import { Steps } from '../types';
import { useStepper } from './useStepper';

const steps: Steps[] = [
  {
    label: 'step 01',
  },
  {
    label: 'step 02',
  },
];

const disabledSteps = [
  {
    label: 'step 01',
  },
  {
    label: 'step 02',
    disabled: true,
  },
  {
    label: 'step 03',
  },
];

describe('useStepper', () => {
  it('should start with 0 as current step and dont have previous step', () => {
    const { result } = renderHook(({ steps }) => useStepper({ steps }), {
      initialProps: { steps },
    });
    const { state } = result.current;
    expect(state?.currentStep).toBe(0);
    expect(state?.hasPreviousStep).toBeFalsy();
  });

  it('should start with 1 as current step and have previous step', () => {
    const { result } = renderHook(
      ({ steps, currentStep }) => useStepper({ steps, currentStep }),
      {
        initialProps: { steps, currentStep: 1 },
      }
    );
    const { state } = result.current;
    expect(state?.currentStep).toBe(1);
    expect(state?.hasPreviousStep).toBeTruthy();
  });

  it('should update the current state to 1 and back to previous step', () => {
    const { result } = renderHook(() => useStepper({ steps }));
    const { state } = result.current;
    expect(state?.currentStep).toBe(0);
    expect(state?.hasPreviousStep).toBeFalsy();

    act(() => {
      result.current?.nextStep();
    });

    expect(result?.current?.state?.currentStep).toBe(1);
    expect(result?.current?.state?.hasPreviousStep).toBeTruthy();

    act(() => {
      result.current?.prevStep();
    });

    expect(result?.current?.state?.currentStep).toBe(0);
    expect(result?.current?.state?.hasPreviousStep).toBeFalsy();
  });

  it('should check if has not next step', () => {
    const { result } = renderHook(() => useStepper({ steps }));
    const { state } = result.current;
    expect(state?.hasNextStep).toBeTruthy();
    expect(state?.hasPreviousStep).toBeFalsy();

    act(() => {
      result.current?.nextStep();
    });

    expect(result?.current?.state?.hasNextStep).toBeFalsy();
    expect(result?.current?.state?.hasPreviousStep).toBeTruthy();
  });

  it('should return the total of steps', () => {
    const { result } = renderHook(() => useStepper({ steps }));
    const { state } = result.current;
    expect(state?.totalSteps).toBe(steps.length);
  });

  it('should set current step to 3', async () => {
    const { result } = renderHook(() => useStepper({ steps }));
    expect(result?.current?.state?.currentStep).toBe(0);

    act(() => {
      result.current?.setStep(3);
    });

    expect(result?.current?.state?.currentStep).toBe(3);
    expect(result?.current?.state?.hasPreviousStep).toBeTruthy();
  });

  it('should skip the disabled step when use the nextStep fn', async () => {
    const { result } = renderHook(
      ({ steps, currentStep }) =>
        useStepper({
          steps,
          currentStep,
        }),
      { initialProps: { steps: disabledSteps, currentStep: 0 } }
    );

    expect(result?.current?.state?.currentStep).toBe(0);

    act(() => {
      result.current?.nextStep();
    });

    expect(result?.current?.state?.currentStep).toBe(2);
  });

  it('should skip the disabled step and go back to the previous step', async () => {
    const { result } = renderHook(
      ({ steps, currentStep }) =>
        useStepper({
          steps,
          currentStep, // start from the last step.
        }),
      { initialProps: { steps: disabledSteps, currentStep: 2 } }
    );

    expect(result?.current?.state?.currentStep).toBe(2);

    act(() => {
      result.current?.prevStep();
    });

    expect(result?.current?.state?.currentStep).toBe(0);
  });
});
