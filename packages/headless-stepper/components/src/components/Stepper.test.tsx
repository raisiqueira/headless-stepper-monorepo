import React from 'react';
import { act } from 'react-dom/test-utils';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as S from '.';
import StepperContext from '../context';

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

const ChildComponent = () => {
  const context = React.useContext(StepperContext);
  return (
    <div>
      <h3>Step 2 content</h3>
      <p>Current step: {context?.state.currentStep}</p>
      <button onClick={() => context?.prevStep()}> Prev step</button>
      <button onClick={() => context?.nextStep()}>Next step</button>
    </div>
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

  it('should render a step with child component and display context values', async () => {
    render(
      <S.Stepper currentStep={1}>
        <S.Step label="Step 01 with context">Step 01 content</S.Step>

        <S.Step label="Step 2">
          <ChildComponent />
        </S.Step>

        <S.Step label="Step 3">Step 3 content</S.Step>
      </S.Stepper>
    );

    expect(screen.queryByText('Next step')).toBeInTheDocument();
    expect(screen.queryByText('Prev step')).toBeInTheDocument();

    const nextButton = screen.getByText('Next step') as HTMLButtonElement;

    act(() => {
      nextButton.click();
    });

    await waitFor(() => screen.getByText('Step 3 content'));

    const step2 = screen.getByText('Step 2');

    expect(screen.queryByText('Step 3 content')).toBeInTheDocument();

    act(() => {
      step2.click();
    });
    await waitFor(() => screen.getByText('Step 2 content'));

    expect(screen.queryByText('Step 2 content')).toBeInTheDocument();

    const prevButton = screen.getByText('Prev step') as HTMLButtonElement;

    act(() => {
      prevButton.click();
    });

    await waitFor(() => screen.getByText('Step 01 content'));

    expect(screen.queryByText('Step 01 content')).toBeInTheDocument();
  });
});
