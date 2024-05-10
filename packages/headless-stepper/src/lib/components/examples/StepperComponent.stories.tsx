import { type StoryFn, Meta } from '@storybook/react';
import StepperComponent, { StepComponentProps } from './StepperComponent';

export default {
  component: StepperComponent,
  title: 'HeadlessStepper/StepperComponent',
  id: 'StepperComponent',
} as Meta;

const Template: StoryFn<StepComponentProps> = (args) => (
  <StepperComponent {...args} />
);

export const StepperComponentStory = Template.bind({});
StepperComponentStory.args = {};
