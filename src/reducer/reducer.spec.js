import R from 'ramda';
import morse, {
  NEW_LONG,
  NEW_SHORT,
  NEW_CHAR,
  NEW_CHAR_BREAK,
  NEW_WORD_BREAK,
  BACK,
  CLEAR,
} from './morse';

const initialState = [{ id: '0', type: 'char', code: '...' }];

const getEssentials = R.pipe(R.last, R.dissoc('id'));

describe('Reducer: morse', () => {
  it('should add "-" on "NEW_LONG"-action', () => {
    {
      const actual = getEssentials(morse(initialState, { type: NEW_LONG }));
      const expected = { type: 'char', code: '...-' };

      expect(actual).toEqual(expected);
    }

    {
      const actual = getEssentials(
        morse([...initialState, { id: '', type: 'break', long: 'false' }], {
          type: NEW_LONG,
        }),
      );
      const expected = { type: 'char', code: '-' };

      expect(actual).toEqual(expected);
    }

    {
      const actual = getEssentials(morse([], { type: NEW_LONG }));
      const expected = { type: 'char', code: '-' };

      expect(actual).toEqual(expected);
    }
  });

  it('should add "." on "NEW_SHORT"-action', () => {
    {
      const actual = getEssentials(morse(initialState, { type: NEW_SHORT }));
      const expected = { type: 'char', code: '....' };

      expect(actual).toEqual(expected);
    }

    {
      const actual = getEssentials(
        morse([...initialState, { id: '', type: 'break', long: 'false' }], {
          type: NEW_SHORT,
        }),
      );
      const expected = { type: 'char', code: '.' };

      expect(actual).toEqual(expected);
    }
  });

  it('should add a whole new char on "NEW_CHAR"-action', () => {
    {
      const actual = getEssentials(
        morse([{ type: 'char', code: '.' }], { type: NEW_CHAR, payload: 'a' }),
      );
      const expected = { type: 'char', code: '.-' };

      expect(actual).toEqual(expected);
    }

    {
      const actual = getEssentials(
        morse([{ type: 'char', code: '.' }, { type: 'break', long: false }], {
          type: NEW_CHAR,
          payload: 'a',
        }),
      );
      const expected = { type: 'char', code: '.-' };

      expect(actual).toEqual(expected);
    }
  });

  it('should add char break on "NEW_CHAR_BREAK"-action', () => {
    const actual = getEssentials(morse(initialState, { type: NEW_CHAR_BREAK }));
    const expected = { type: 'break', long: false };

    expect(actual).toEqual(expected);
  });

  it('should add word break on two consecutive "NEW_CHAR_BREAK"-actions', () => {
    const firstState = morse(initialState, { type: NEW_CHAR_BREAK });
    const actual = getEssentials(morse(firstState, { type: NEW_CHAR_BREAK }));

    const expected = { type: 'break', long: true };

    expect(actual).toEqual(expected);
  });

  it('should keep word break on 3+ consecutive "NEW_CHAR_BREAK"-actions', () => {
    const firstState = morse(initialState, { type: NEW_CHAR_BREAK });
    const secondState = morse(firstState, { type: NEW_CHAR_BREAK });
    const actual = getEssentials(morse(secondState, { type: NEW_CHAR_BREAK }));

    const expected = { type: 'break', long: true };

    expect(actual).toEqual(expected);
  });

  it('should add long break on "NEW_WORD_BREAK"-action', () => {
    const actual = getEssentials(morse(initialState, { type: NEW_WORD_BREAK }));
    const expected = { type: 'break', long: true };

    expect(actual).toEqual(expected);
  });

  it('should ignore "NEW_CHAR_BREAK/NEW_WORD_BREAK"-action if state is empty', () => {
    const actual = morse([], { type: NEW_CHAR_BREAK });
    const expected = [];

    expect(actual).toEqual(expected);
  });

  it('should clear last on "BACK"-action', () => {
    {
      const actual = getEssentials(morse(initialState, { type: BACK }));
      const expected = { type: 'char', code: '..' };

      expect(actual).toEqual(expected);
    }

    {
      const state = [
        { id: '0', type: 'char', code: '...' },
        { id: '1', type: 'break', long: false },
      ];
      const actual = getEssentials(morse(state, { type: BACK }));
      const expected = { type: 'char', code: '...' };

      expect(actual).toEqual(expected);
    }

    {
      const state = [{ id: '0', type: 'char', code: '.' }];
      const actual = morse(state, { type: BACK });
      const expected = [];

      expect(actual).toEqual(expected);
    }

    {
      const state = [
        { id: '0', type: 'char', code: '...' },
        { id: '1', type: 'break', long: true },
      ];
      const actual = getEssentials(morse(state, { type: BACK }));
      const expected = { type: 'char', code: '...' };

      expect(actual).toEqual(expected);
    }

    {
      const state = [
        { id: '0', type: 'char', code: '...' },
        { id: '1', type: 'break', long: true },
        { id: '2', type: 'char', code: '.' },
      ];
      const actual = getEssentials(morse(state, { type: BACK }));
      const expected = { type: 'break', long: true };

      expect(actual).toEqual(expected);
    }
  });

  it('should not do a thing on "BACK"-event if state is empty', () => {
    const actual = morse([], { type: BACK });
    const expected = [];

    expect(actual).toEqual(expected);
  });

  it('should clear all "CLEAR"-action', () => {
    const actual = morse(initialState, { type: CLEAR });
    const expected = [];

    expect(actual).toEqual(expected);
  });
});
