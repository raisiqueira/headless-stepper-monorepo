# headless-stepper

Production ready React hook to create awesome stepper components. Effortless to use, easy to customize.

![npm bundle size](https://img.shields.io/bundlephobia/minzip/headless-stepper?style=flat-square)

| [Documentation](https://headless-stepper.netlify.app/) | [Issues](https://github.com/raisiqueira/headless-stepper-monorepo/issues)

## Quick features

- Headless.
- 100% TypeScript.
- No dependencies.
- 100% customizable.

## Start

Install using NPM or Yarn:

```bash
npm install headless-stepper
# or using yarn
yarn add headless-stepper
```

## Using

**Basic example:**

```tsx
import React from 'react';
import { useStepper } from 'headless-stepper';

export interface HeadlessStepperProps {}

export function HeadlessStepper(props: HeadlessStepperProps) {
  const steps = React.useMemo(
    () => [
      {
        label: 'Step 1',
      },
      { label: 'Step 2' },
      { label: 'Step 3' },
      { label: 'Step 4', disabled: true },
      { label: 'Step 5' },
      { label: 'Step 6' },
    ],
    []
  );
  const { state, nextStep, prevStep, progressProps, stepsProps } = useStepper({
    steps,
  });
  return (
    <div className={styles['container']}>
      <div>
        <nav style={{ display: 'flex' }}>
          {stepsProps?.map((step, index) => (
            <ol key={index}>
              <a {...step}>{steps[index].label}</a>
            </ol>
          ))}
        </nav>
      </div>
      <p>Current step: {state.currentStep}</p>
      <button
        className="py-4 px-3 bg-blue-300"
        onClick={prevStep}
        disabled={!state.hasPreviousStep}
      >
        Prev
      </button>
      <button className="py-4 px-3 bg-blue-300" onClick={nextStep}>
        Next
      </button>
      <div className="bg-gray-400 w-100% h-1/2" {...progressProps} />
    </div>
  );
}

export default HeadlessStepper;
```

More examples on [documentation](https://headless-stepper.netlify.app/).

## Running unit tests

Run `nx test headless-stepper` to execute the unit tests via [Jest](https://jestjs.io).

## Contribute

This project was started with [Nx](https://nx.dev) to manage the monorepo. To learn more about Nx, read the [Nx documentation](https://nx.dev/).

The `headless-stepper` library and the documentation is under _packages_ folder. If you're runing on local, execute the following command to start the development server:

```bash
npm run dev
```

The Storybook will be available on the localhost:4400 and refresh when you change the `useStepper` code.

## Sponsors

[![Sponsors](https://cdn.jsdelivr.net/gh/raisiqueira/static/sponsors.svg)](https://headless-stepper.netlify.app/sponsors)

## License

MIT @ Raí Siqueira.
