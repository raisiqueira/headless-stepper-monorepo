import { StoryFn, Meta } from '@storybook/react';
import StepperComponent from './StepperComponent';

export default {
  component: StepperComponent,
  title: 'HeadlessStepper/StepperComponent',
} as Meta;

const Template: StoryFn = (args) => <StepperComponent {...args} />;

export const StepperComponentStory = Template.bind({});
StepperComponentStory.args = {};
