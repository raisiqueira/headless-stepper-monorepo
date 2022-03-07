import { Story, Meta } from '@storybook/react';
import { HeadlessStepper, HeadlessStepperProps } from './HeadlessStepper';

export default {
  component: HeadlessStepper,
  title: 'HeadlessStepper/useStepper',
} as Meta;

const Template: Story<HeadlessStepperProps> = (args) => (
  <HeadlessStepper {...args} />
);

export const useStepper = Template.bind({});
useStepper.args = {};
