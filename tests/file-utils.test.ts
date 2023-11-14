import { describe, test, expect } from 'vitest';
import { IndexTree } from '../src/index-tree';
import { indexFile } from '../dist/utils';

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
  })

});