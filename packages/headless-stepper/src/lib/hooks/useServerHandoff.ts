import React from 'react';

const state = { handoffComplete: false };

/**
 * Little helper to make sure that the server has finished rendering.
 * @returns boolean to check if the server has completed the handoff.
 */
const useServerHandoff = () => {
  const [complete, setComplete] = React.useState(state.handoffComplete);

  React.useEffect(() => {
    if (complete === true) return; // already complete
    setComplete(true);
  }, [complete]);

  React.useEffect(() => {
    if (state.handoffComplete === false) {
      state.handoffComplete = true;
    }
  }, []);

  return complete;
};

export { useServerHandoff };
