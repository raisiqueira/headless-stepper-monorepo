import { StoryFn, Meta } from '@storybook/react';
import { HeadlessStepper, HeadlessStepperProps } from './HeadlessStepper';

export default {
  component: HeadlessStepper,
  title: 'HeadlessStepper/useStepper',
} as Meta;

const Template: StoryFn<HeadlessStepperProps> = (args) => (
  <HeadlessStepper {...args} />
);

export const UseStepper = Template.bind({});
UseStepper.args = {};
