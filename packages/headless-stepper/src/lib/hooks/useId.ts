import React from 'react';

export const getRandomId = () => {
  if ('randomUUID' in crypto) {
    return crypto.randomUUID();
  }
  const uint32 = window.crypto.getRandomValues(new Uint32Array(1))[0];
  return uint32.toString(16);
};

const isReact18 = React.version.includes('18');

export const useIsomorphicId = () => {
  if (isReact18) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    return React.useId();
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const localId = React.useRef(getRandomId());
  return localId.current;
};
