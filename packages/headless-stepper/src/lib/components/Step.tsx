import React from 'react';
import type { PolymorphicComponentType, Steps } from '../types';

export type StepComponentProps = React.PropsWithChildren<
  React.HTMLAttributes<HTMLElement> &
    Steps & {
      as?: PolymorphicComponentType;
    }
>;

export const Step = React.forwardRef<HTMLDivElement, StepComponentProps>(
  (props, ref) => {
    const { label, disabled, style, as, ...rest } = props;
    const AsComponent = as || 'button';

    return (
      <AsComponent
        ref={ref}
        style={{
          pointerEvents: disabled ? 'none' : 'auto',
          opacity: disabled ? 0.5 : 1,
          ...style,
        }}
        {...rest}
      >
        {label}
      </AsComponent>
    );
  }
);

Step.displayName = 'Stepper.Step';
