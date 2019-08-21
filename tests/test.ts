// test.js
import { greet } from '../dist/showtime';

describe('test', () => {
  it('should pass', () => {
  	expect(greet()).toBe('Hello, world!');
  });
});
