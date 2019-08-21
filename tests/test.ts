// test.js
import { greet } from '../dist/showtime';

describe('test', () => {
  it('greet', () => {
  	expect(greet()).toBe('Hello, world!');
  });
});
