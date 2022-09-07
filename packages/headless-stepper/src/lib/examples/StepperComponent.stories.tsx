import { Story, Meta } from '@storybook/react';
import StepperComponent from './StepperComponent';

export default {
  component: StepperComponent,
  title: 'HeadlessStepper/StepperComponent',
} as Meta;

const Template: Story<any> = (args) => <StepperComponent {...args} />;

export const StepperComponentStory = Template.bind({});
StepperComponentStory.args = {};
