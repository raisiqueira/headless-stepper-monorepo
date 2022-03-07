import React from 'react';
import { IS_DEV, randomId } from '../utils';
import { useIsomorphicEffect } from './useIsomorphicEffect';
import { useServerHandoff } from './useServerHandoff';

/**
 * Hook to generate a unique id. It's my own implementation of `useId` instead of
 * use the useId hook from @react-aria/utils.
 * @param id An optional ID to use.
 * @param generatorFn An optional function to generate the ID.
 * @returns {string | null} random string. or a null if the id is provided.
 */
const useId = (
  id?: string,
  generatorFn: () => string = randomId
): string | null => {
  // Check if server is complete.
  const isReady = useServerHandoff();

  // If the server is complete, use the id.
  const [_id, setId] = React.useState(isReady ? generatorFn : null);

  useIsomorphicEffect(() => {
    if (_id === null) {
      setId(generatorFn());
    }
  }, [_id]);

  return id || _id;
};

if (IS_DEV) {
  useId.displayName = 'useId';
}

export { useId };
