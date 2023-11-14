import { describe, test, expect } from 'vitest';
import { IndexTree } from '../src/index-tree';
import { findValidPermutations } from '../src/finder';

describe('findValidPermutations', () => {

  test('dictionary with 2 words in the index and no valid permutations', () => {
    const index = new IndexTree();
    index.insert('abc').insert('cab');
    const matches = findValidPermutations(index, 'rtk');
    expect(matches.size).toEqual(0);
  });

  test('dictionary with 2 words both valid permutations of the full search', () => {
    const index = new IndexTree();
    index.insert('abc').insert('cab');
    const matches =  findValidPermutations(index, 'abc');
    expect(matches.size).toEqual(2);
  });

  test('dictionary with 2 words both valid permutations of a subset of the search', () => {
    const index = new IndexTree();
    index.insert('abc').insert('cab');
    const matches =  findValidPermutations(index, 'abce');
    expect(matches.size).toEqual(2);
  });

  test('dictionary with 5 words all valid permutations of a subset of the search', () => {
    const index = new IndexTree();
    index.insert('a').insert('b').insert('c').insert('d').insert('e');
    const matches =  findValidPermutations(index, 'abcde');
    expect(matches.size).toEqual(5);
  });

  test('dictionary with 3 words in the index: 2 matches', () => {
    const index = new IndexTree();
    index.insert('ab').insert('ba').insert('bac');
    const matches = findValidPermutations(index, 'ab');
    expect(matches.size).toEqual(2);
  });

  test('dictionary with 3 words in the index: 1 match', () => {
    const index = new IndexTree();
    index.insert('abcd').insert('bac').insert('rtk');
    const matches = findValidPermutations(index, 'abc');
    expect(matches.size).toEqual(1);
  });

  test('dictionary with 3 words with common prefixes', () => {
    const index = new IndexTree();
    index.insert('abc').insert('bca').insert('cab').insert('cba').insert('ab').insert('ac').insert('rtk');
    const matches = findValidPermutations(index, 'cba');
    expect(matches.size).toEqual(6);
  });

  test('dictionary with 6 words with letters from the search', () => {
    const index = new IndexTree();
    index.insert('erde').insert('edre').insert('eder').insert('ered').insert('eerd').insert('dree').insert('rtk');
    const matches = findValidPermutations(index, 'dree');
    expect(matches.size).toEqual(6);
  });



});

