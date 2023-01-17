import { getRandomId } from './randomId';

describe('getRandomId', () => {
  it('should return a random string', () => {
    const randomId = getRandomId();
    expect(randomId).toBeTruthy();
    expect(typeof randomId).toBe('string');
  });
});
