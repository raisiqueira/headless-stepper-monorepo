import { Story, Meta } from '@storybook/react';
import { Stepper, StepperProps } from './Stepper';

export default {
  component: Stepper,
  title: 'HeadlessStepper/Stepper',
} as Meta;

const Template: Story<StepperProps> = (args) => (
  <Stepper {...args}>lol</Stepper>
);

export const StepperComponent = Template.bind({});
StepperComponent.args = {};
