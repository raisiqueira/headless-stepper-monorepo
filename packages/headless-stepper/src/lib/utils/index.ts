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

/**
 * Check if dev mode.
 */
const IS_DEV = process.env['NODE_ENV'] !== 'production';

export { randomId, isClient, IS_DEV };
