import { proxy, subscribe, snapshot } from 'valtio/vanilla';
import type { INTERNAL_Snapshot as Snapshot } from 'valtio';
import type { Stepper, StepperOrientation, Steps } from './types';

export class StepperCore {
  /** Steps to the stepper. */
  protected _steps: Steps[];

  /** Orientation of the stepper. Used only for the ARIA property. */
  protected _orientation: StepperOrientation;

  /** Current step of the stepper. */
  protected _currentStep;

  /** Config store. */
  private _proxy: Stepper;

  constructor(config: Stepper) {
    this._proxy = proxy({
      ...config,
      currentStep: config.currentStep || 0,
      orientation: config.orientation || 'horizontal',
    });
    this._steps = config.steps;
    this._orientation = config.orientation || 'horizontal';
    this._currentStep = config.currentStep || 0;
  }

  get state(): Snapshot<Stepper> {
    return snapshot(this._proxy);
  }

  get steps(): Readonly<Steps[]> {
    return this.state.steps;
  }

  /**
   * Get the current step.
   */
  get currentStep(): Readonly<number> {
    return this.state.currentStep || 0;
  }

  /**
   * Get the total steps.
   */
  get totalSteps(): Readonly<number> {
    return this.state.steps.length;
  }

  /**
   * Get the orientation of the stepper. Used only for the ARIA property.
   */
  get orientation(): Readonly<StepperOrientation> {
    return this.state.orientation || 'horizontal';
  }

  /**
   * Check if has previous step.
   * @returns boolean - true if has previous step.
   */
  get hasPreviousStep(): boolean {
    return this._hasPreviousStep();
  }

  /**
   * Check if has next step.
   * @returns boolean - true if has next step.
   */
  get hasNextStep(): boolean {
    return this._hasNextStep();
  }

  /**
   * Return the disabled steps.
   */
  get disabledSteps(): Steps[] {
    return this._steps.filter((step) => step.disabled);
  }

  /**
   * Subscribe to the state changes.
   * @param callback function to be called when the state changes.
   */
  public subscribe(callback: () => void): void {
    subscribe(this._proxy, callback);
  }

  /**
   * Update the current step.
   * @param step Step to navigate to.
   * @returns void
   */
  public setStep(step: number): void {
    if (step < 0 || step > this._steps.length - 1) {
      return;
    }
    this._proxy.currentStep = step;
  }

  /**
   * Navigate to the next step.
   */
  public nextStep(): void {
    if (this._hasNextStep()) {
      this._proxy.currentStep = (this.state.currentStep as number) + 1;
    }
  }

  /**
   * Navigate to the previous step.
   */
  public prevStep(): void {
    if (this._hasPreviousStep()) {
      this._proxy.currentStep = (this.state.currentStep as number) - 1;
    }
  }

  /**
   * Set the orientation of the stepper.
   * @param orientation Orientation of the stepper. Used only for the ARIA property.
   * @returns void.
   */
  public setOrientation(orientation: StepperOrientation): void {
    this._proxy.orientation = orientation;
  }

  /**
   * Check if the step is disabled.
   * @param step the step to check if is disabled.
   * @returns boolean - true if the step is disabled.
   */
  public isStepDisabled(step: number): boolean {
    if ('disabled' in this._steps[step]) {
      return this._steps[step].disabled!;
    }
    return false;
  }

  /**
   * Check if has next step.
   * @internal
   * @returns boolean - true if has next step.
   */
  private _hasNextStep(): boolean {
    return this._currentStep < this._steps.length - 1;
  }

  /**
   * Check if has previous step.
   * @internal
   * @returns boolean - true if has previous step.
   */
  private _hasPreviousStep(): boolean {
    return this._currentStep > 0;
  }

  private _getNextStepElement(element: HTMLElement): HTMLElement | null {
    throw new Error('Method not implemented.');
  }

  private _getPreviousStepElement(element: HTMLElement): HTMLElement | null {
    throw new Error('Method not implemented.');
  }
}
