import { toChar, toMorse } from './translationMap';

describe('Util: translationMap.toChar()', () => {
  it('should translate a morse string into a char', () => {
    const actual = toChar('.-');
    const expected = 'a';

    expect(actual).toEqual(expected);
  })

  it('should return null if not match found', () => {
    const actual = toChar('---------');
    const expected = '😢';

    expect(actual).toEqual(expected);
  })
});

describe('Util: translationMap.toMorse()', () => {
  it('should translate a char into morse code', () => {
    const actual = toMorse('a');
    const expected = '.-';

    expect(actual).toEqual(expected);
  })

  it('should return null if not match found', () => {
    const actual = toMorse('ö');
    const expected = '😢';

    expect(actual).toEqual(expected);
  })
});
