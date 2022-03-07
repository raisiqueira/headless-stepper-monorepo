import { render } from '@testing-library/react';

import HeadlessStepper from './HeadlessStepper';

describe('HeadlessStepper', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<HeadlessStepper />);
    expect(baseElement).toBeTruthy();
  });
});
