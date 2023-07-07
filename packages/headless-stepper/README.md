# headless-stepper

Production ready React hook to create awesome stepper components. Effortless to use, easy to customize.

![npm bundle size](https://img.shields.io/bundlephobia/minzip/headless-stepper?style=flat-square)

[Documentation](https://headless-stepper.netlify.app/) | [Issues](https://github.com/raisiqueira/headless-stepper-monorepo/issues)

## Quick features

- Headless.
- 100% TypeScript.
- No dependencies.
- 100% customizable.

## Start

Install the `headless-stepper` library using your favorite package manager:

```bash
npm install headless-stepper
# or using yarn
yarn add headless-stepper
# or using pnpm
pnpm install headless-stepper
```

## Using

The headless-stepper library provide two ways to build your stepper component:

- Using the `Stepper` and `Step` components. See the [documentation](https://headless-stepper.netlify.app/getting-started/using-stepper) for more details.
- Using the `useStepper` hook. See the [documentation](https://headless-stepper.netlify.app/getting-started/using) for more details.

### Using the `Stepper` and `Step` components

To use the `Stepper` and `Step` components, you need to import the `Stepper` and `Step` components from the `headless-stepper` library.

```tsx
import { Stepper, Step } from 'headless-stepper/components';

const MyAwesomeStepper = () => {
  return (
    <Stepper currentStep={0}>
      <Step label="Step 1">Step 1 content</Step>

      <Step label="Step 2">Step 2 content</Step>

      <Step label="Step 3">Step 3 content</Step>
    </Stepper>
  );
};

export default MyAwesomeStepper;
```

Under the hood, the `Stepper` component will use the `useStepper` hook to manage the state of the stepper. You can use the `useStepper` hook to build your own stepper component.

### Using the `useStepper` hook

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

You can find more examples on [documentation](https://headless-stepper.netlify.app/).

## Contribute

This project was started with [Nx](https://nx.dev) to manage the monorepo. To learn more about Nx, read the [Nx documentation](https://nx.dev/).

The `headless-stepper` library and the documentation is under _packages_ folder. If you're running on local, execute the following command to start the development server:

```bash
npm run dev
```

The Storybook will be available on the localhost:4400 and refresh when you change the `useStepper` code.

### Running unit tests

Run `nx test headless-stepper` to execute the unit tests via [Vitest](https://vitest.dev).

## Sponsors

[![Sponsors](https://cdn.jsdelivr.net/gh/raisiqueira/static@master/sponsors.svg)](https://github.com/sponsors/raisiqueira)

## License

MIT @ Raí Siqueira.
