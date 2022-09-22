import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import * as S from './Stepper';
import StepperContext from '../context';
import { UseStepper } from '../hooks/useStepper';
import { act } from 'react-dom/test-utils';

const StepToBeAsComponent = React.forwardRef((props, ref) => {
  return <button {...props} />;
});

const TestComponent = () => {
  return (
    <S.Stepper currentStep={0} className="example">
      <S.Step as="span" label="Step 1">
        Step 1 content
      </S.Step>

      <S.Step label="Step 2" disabled>
        Step 2 content
      </S.Step>

      <S.Step label="Step 3">Step 3 content</S.Step>
    </S.Stepper>
  );
};

describe('Stepper component', () => {
  it('should render the component', () => {
    render(<TestComponent />);
    expect(screen.getByText('Step 1')).toBeInTheDocument();
    expect(screen.getByText('Step 2')).toBeInTheDocument();
    expect(screen.getByText('Step 3')).toBeInTheDocument();
    expect(screen.getByText('Step 1 content')).toBeInTheDocument();
    expect(screen.getByText('Step 1')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Step 1 content')).toBeInTheDocument();
    expect(screen.getByText('Step 1 content')).toHaveAttribute(
      'aria-expanded',
      'true'
    );
  });

  it('should check if the second step is disabled', () => {
    render(<TestComponent />);
    const step2 = screen.getByText('Step 2');
    expect(step2).toHaveAttribute('aria-disabled', 'true');
    expect(step2).toHaveAttribute('aria-selected', 'false');
  });

  it("should select the third step when it's clicked", async () => {
    render(<TestComponent />);
    const step3 = screen.getByText('Step 3');
    act(() => {
      step3.click();
    });
    await waitFor(() => screen.getByText('Step 3 content'));

    expect(step3).toHaveAttribute('aria-selected', 'true');
  });

  it('should render the step with as prop', () => {
    render(
      <S.Stepper currentStep={0} className="example">
        <S.Step label="Step 01 with context" as={StepToBeAsComponent}>
          Test context
        </S.Step>

        <S.Step label="Step 2" disabled>
          Step 2 content
        </S.Step>

        <S.Step label="Step 3">Step 3 content</S.Step>
      </S.Stepper>
    );

    expect(screen.getByText('Test context')).toBeInTheDocument();
  });

  it('should render a component with a children that access the context', async () => {
    const TestComponentWithChildren = () => {
      return (
        <S.Stepper currentStep={0} className="example">
          <S.Step label="Step 01 with context" as={StepToBeAsComponent}>
            <StepperContext.Consumer>
              {({ state, nextStep }) => {
                return (
                  <div>
                    <p>current step: {state.currentStep}</p>
                    <p>total steps: {state.totalSteps}</p>
                    <button onClick={nextStep}>Next Step</button>
                  </div>
                );
              }}
            </StepperContext.Consumer>
          </S.Step>

          <S.Step label="Step 2">Step 2 content</S.Step>

          <S.Step label="Step 3">Step 3 content</S.Step>
        </S.Stepper>
      );
    };

    render(<TestComponentWithChildren />);

    const nextStepButton = screen.getByText('Next Step') as HTMLButtonElement;
    expect(screen.getByText('current step: 0')).toBeInTheDocument();
    expect(screen.getByText('total steps: 3')).toBeInTheDocument();

    act(() => {
      nextStepButton.click();
    });

    await waitFor(() => screen.getByText('Step 2 content'));

    expect(screen.queryByText('Step 2 content')).toBeInTheDocument();
    expect(screen.queryByText('current step: 1')).not.toBeInTheDocument();
    expect(screen.queryByText('total steps: 3')).not.toBeInTheDocument();
  });
});
