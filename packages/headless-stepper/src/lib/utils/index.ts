/**
 * Generates a unique id.
 * @returns {string} random string.
 */
const randomId = () => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Check if client.
 */
const isClient = typeof window !== 'undefined';

export { randomId, isClient };
