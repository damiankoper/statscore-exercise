import { NameUtils } from './name-utils';

describe('Name utils', () => {
  it('should format dash name', () => {
    const name = NameUtils.getDashName('a', 'b');
    expect(name).toEqual('a - b');
  });

  it('should format vs name', () => {
    const name = NameUtils.getVsName('a', 'b');
    expect(name).toEqual('a vs b');
  });
});
