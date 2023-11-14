import { describe, test, expect } from 'vitest';
import { extractAllChars, removeChar } from '../src/utils';


describe('utils - removeChar', () => {

  test('removeChar - remove the first character', () => {
    const source = 'abc';
    const result = 'bc';
    expect(removeChar(source, 0)).toEqual(result);
  });

  test('removeChar - remove the last character', () => {
    const source = 'abc';
    const result = 'ab';
    expect(removeChar(source, 2)).toEqual(result);
  });


  test('removeChar - remove the middle character', () => {
    const source = 'abc';
    const result = 'ac';
    expect(removeChar(source, 1)).toEqual(result);
  });

  test('removeChar - remove character with Invalid index', () => {
    const source = 'abc';
    try {
      removeChar(source, 3);
    } catch (e) {
      expect(e).toBeDefined();
      return;
    }
    expect('It should have failed').toBeUndefined();
  });

});


describe('utils - extractAllChars', () => {

  test('extractAllChars - extract all characters from a word', () => {
    const word = 'abc';
    const result = [['a', 'bc'], ['b', 'ac'], ['c', 'ab']];
    expect(extractAllChars(word)).toEqual(result);
  })


  test('extractAllChars - extract all characters from a word with a single character', () => {
    const word = 'a';
    const result = [['a', '']];
    expect(extractAllChars(word)).toEqual(result);
  })

  test('extractAllChars - extract all characters from an empty word', () => {
    const word = '';
    const result = [];
    expect(extractAllChars(word)).toEqual(result);
  })

});
