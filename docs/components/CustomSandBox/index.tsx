import {
  SandpackProvider,
  SandpackLayout,
  SandpackPreview,
  SandpackCodeEditor,
  SandpackFileExplorer,
} from '@codesandbox/sandpack-react';

import { type SandpackProviderProps } from '@codesandbox/sandpack-react';

export const CustomSandBox = ({
  files,
  options,
  customSetup,
  ...rest
}: SandpackProviderProps) => {
  return (
    <SandpackProvider
      template="react-ts"
      files={files}
      options={options}
      customSetup={customSetup}
      {...rest}
    >
      <SandpackLayout>
        <SandpackFileExplorer />
        <SandpackCodeEditor showTabs showLineNumbers />
      </SandpackLayout>
      <SandpackPreview style={{ height: 400 }} showNavigator />
    </SandpackProvider>
  );
};
