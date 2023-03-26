import React from 'react';
import { Sandpack } from '@codesandbox/sandpack-react';
import '@codesandbox/sandpack-react/dist/index.css';

const Sandbox = () => {
  const code = `
  import { Stepper, Step } from 'headless-stepper/components';
  import { MantineProvider, Button, Group, Container, Box } from "@mantine/core";

  const MyAwesomeStepper = () => {
    return (
      <MantineProvider withGlobalStyles withNormalizeCSS>
      <Container mt="lg">
        <Stepper as={Group} currentStep={0} className="example">
          <Step as={Button} label="Step 1">
            <Box>
            Step 1 content
            </Box>
          </Step>

          <Step as={Button} label="Step 2" disabled>
            Step 2 content
          </Step>

          <Step as={Button} label="Step 3">
            Step 3 content
          </Step>
        </Stepper>
      </Container>
    </MantineProvider>
    );
  };

  export default MyAwesomeStepper;
`;

  return (
    <Sandpack
      template="react-ts"
      customSetup={{
        dependencies: {
          'headless-stepper': 'next',
          '@mantine/core': '5',
          '@emotion/react': '11',
          '@mantine/hooks': '5',
        },
      }}
      files={{
        '/App.tsx': code,
      }}
      options={{
        showNavigator: true,
        showTabs: true,
        showLineNumbers: true,
      }}
    />
  );
};

export default Sandbox;
