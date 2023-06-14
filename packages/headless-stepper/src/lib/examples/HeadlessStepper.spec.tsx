import { fireEvent, render } from '@testing-library/react';

import HeadlessStepper from './HeadlessStepper';

describe('HeadlessStepper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeadlessStepper />);
    expect(baseElement).toBeTruthy();
  });

  it('should navigate by clicking on the menu unless it is disabled', () => {
    const { queryByText, getByText } = render(<HeadlessStepper />);
    expect(queryByText('Current step: 0')).toBeTruthy();

    const secondStep = getByText('Step 2');
    const thirdStep = getByText('Step 3');
    const fourthStep = getByText('Step 4'); // step disabled

    fireEvent.click(secondStep);
    expect(queryByText('Current step: 1')).toBeTruthy();

    fireEvent.click(thirdStep);
    expect(queryByText('Current step: 2')).toBeTruthy();

    fireEvent.click(fourthStep);
    expect(queryByText('Current step: 3')).toBeFalsy();
  });
});
