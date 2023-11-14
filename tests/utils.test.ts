import { describe, test, expect } from 'vitest';
import { extractAllChars, indexFile, removeChar } from '../src/utils';
import { IndexTree } from '../src/index-tree';

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
    const result = [
      ['a', 'bc'],
      ['b', 'ac'],
      ['c', 'ab'],
    ];
    expect(extractAllChars(word)).toEqual(result);
  });

  test('extractAllChars - extract all characters from a word with a single character', () => {
    const word = 'a';
    const result = [['a', '']];
    expect(extractAllChars(word)).toEqual(result);
  });

  test('extractAllChars - extract all characters from an empty word', () => {
    const word = '';
    const result = [];
    expect(extractAllChars(word)).toEqual(result);
  });
});

describe('file-utils', () => {
  test('indexFile reads a file with a single word', async () => {
    const index = new IndexTree();
    const count = await indexFile(index, 'tests/assets/one-word.txt');
    expect(count).toEqual(1);
    expect(index.wordCount()).toEqual(count);
  });

  test('indexFile reads a file with multiple words (with empty lines)', async () => {
    const index = new IndexTree();
    const count = await indexFile(index, 'tests/assets/two-words.txt');
    expect(count).toEqual(2);
    expect(index.wordCount()).toEqual(count);
  });

  test('indexFile reads a file with multiple words (with empty lines)', async () => {
    const index = new IndexTree();
    const count = await indexFile(index, 'tests/assets/more-words.txt');
    expect(index.wordCount()).toEqual(count);
  });
});