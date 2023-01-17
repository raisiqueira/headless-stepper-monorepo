import { vi } from 'vitest';
import { StepperCore } from './Stepper';
import { queuedMicrotasks } from './utils/testUtils';

describe('Stepper.ts', () => {
  // !Note: Disabled because the TypeScript won't allow to spy on a private method.

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const hasNextStepSpy = vi.spyOn(StepperCore.prototype, '_hasNextStep');
  const hasPreviousStepSpy = vi.spyOn(
    StepperCore.prototype,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    '_hasPreviousStep'
  );

  const nextStepSpy = vi.spyOn(StepperCore.prototype, 'nextStep');
  const prevStepSpy = vi.spyOn(StepperCore.prototype, 'prevStep');

  const subscribeMock = vi.fn();

  beforeEach(() => {
    // reset the spies before each test.
    hasNextStepSpy.mockClear();
    hasPreviousStepSpy.mockClear();
    nextStepSpy.mockClear();
    prevStepSpy.mockClear();
    subscribeMock.mockClear();
  });

  describe('Stepper.ts - Getters', () => {
    it("Should check the initial setup of the stepper's state", () => {
      const steps = [{ label: 'Step 1' }, { label: 'Step 2' }];
      const stepper = new StepperCore({ steps });

      expect(stepper.currentStep).toBe(0);
      expect(stepper.totalSteps).toBe(2);
      expect(stepper.orientation).toBe('horizontal');
      expect(stepper.steps).toEqual(steps);
      expect(stepper.hasPreviousStep).toBe(false);
      expect(stepper.hasNextStep).toBe(true);
      expect(stepper.orientation).toBe('horizontal');
    });

    it('Should check if have a next step', () => {
      const steps = [{ label: 'Step 1' }, { label: 'Step 2' }];
      const stepper = new StepperCore({ steps });
      expect(stepper.hasNextStep).toBe(true);
      expect(stepper.totalSteps).toBe(2);
      expect(hasNextStepSpy).toHaveBeenCalled();
      expect(hasPreviousStepSpy).not.toHaveBeenCalled();
    });

    it('Should check if not have a next step', () => {
      const steps = [{ label: 'Step 1' }, { label: 'Step 2' }];
      const stepper = new StepperCore({ steps, currentStep: 1 });

      expect(stepper.hasNextStep).toBe(false);
      expect(stepper.hasPreviousStep).toBe(true);
      expect(stepper.currentStep).toBe(1);

      // assertion for the spy
      expect(hasPreviousStepSpy).toHaveBeenCalled();
      expect(hasNextStepSpy).toHaveBeenCalled();
    });
  });

  describe('Stepper.ts - Methods', () => {
    it('should update the current step', () => {
      const steps = [{ label: 'Step 1' }, { label: 'Step 2' }];
      const stepper = new StepperCore({ steps });

      expect(stepper.currentStep).toBe(0);
      stepper.setStep(1);
      expect(stepper.currentStep).toBe(1);
    });

    it('should navigate to the next step through the nexStep function', () => {
      const steps = [{ label: 'Step 1' }, { label: 'Step 2' }];
      const stepper = new StepperCore({ steps });

      expect(stepper.currentStep).toBe(0);
      stepper.nextStep();
      expect(stepper.currentStep).toBe(1);
      expect(nextStepSpy).toHaveBeenCalled();
    });

    it('should navigate to the previous step through the prevStep function', () => {
      const steps = [{ label: 'Step 1' }, { label: 'Step 2' }];
      const stepper = new StepperCore({ steps, currentStep: 1 });

      expect(stepper.currentStep).toBe(1);
      stepper.prevStep();
      expect(stepper.currentStep).toBe(0);
      expect(prevStepSpy).toHaveBeenCalled();
    });

    it('should update the stepper orientation', () => {
      const steps = [{ label: 'Step 1' }, { label: 'Step 2' }];
      const stepper = new StepperCore({ steps });

      expect(stepper.orientation).toBe('horizontal');

      stepper.setOrientation('vertical');

      expect(stepper.orientation).toBe('vertical');
    });
  });

  describe('Stepper.ts - subscribe', () => {
    it('should subscribe to the stepper', async () => {
      const steps = [{ label: 'Step 1' }, { label: 'Step 2' }];
      const stepper = new StepperCore({ steps });

      stepper.subscribe(subscribeMock);

      // updates in batch mode should not trigger the subscription twice.
      stepper.nextStep();
      stepper.setOrientation('vertical');

      // wait for the microtasks to be executed.
      await queuedMicrotasks();

      expect(subscribeMock).toHaveBeenCalledTimes(1);
    });
  });
});
