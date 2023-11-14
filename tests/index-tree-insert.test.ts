import { describe, test, expect } from 'vitest';

import { IndexNode, IndexTree } from '../src/index-tree';

describe('index-tree inserting', () => {

  test('Inserting one word creates a tree with a single branch', () => {
    const word = 'hello';
    const index = new IndexTree();
    index.insert(word);
    let node: IndexNode | undefined = index.root;
    for (const char of word) {
      node = node!.getChild(char);
      expect(node).toBeDefined();
    }
    expect(node).toBeDefined();
    expect(node!.value).toEqual(word);
  });

  test('Inserting two words with the same prefix creates a tree with a single branch', () => {
    const word1 = 'acknowledge';
    const word2 = 'acknowledged';
    const index = new IndexTree();
    index.insert(word1);
    index.insert(word2);
    let node: IndexNode | undefined = index.root;

    expect(node.childrenCount).toEqual(1);
    for (const char of word1) {
      node = node!.getChild(char);
      expect(node).toBeDefined();
    }
    expect(node).toBeDefined();
    expect(node!.value).toEqual(word1);
    expect(node!.getChild('d')).toBeDefined();

    node = index.root;
    for (const char of word2) {
      node = node!.getChild(char);
      expect(node).toBeDefined();
    }
    expect(node).toBeDefined();
    expect(node!.value).toEqual(word2);

    expect(index.wordCount()).toEqual(2);
  });

  test('Inserting the same word twice creates a tree with a single branch and a count of 2 in the leaf node', () => {
    const word = 'hello';
    const index = new IndexTree();
    index.insert(word);
    index.insert(word);
    let node: IndexNode | undefined = index.root;

    expect(node.childrenCount).toEqual(1);
    for (const char of word) {
      node = node!.getChild(char);
      expect(node).toBeDefined();
    }
    expect(node).toBeDefined();
    expect(node!.value).toEqual(word);
    expect(node!.count).toEqual(2);
  });

  test('Inserting two words with different prefix creates a tree with two branches', () => {
    const word1 = 'constantly';
    const word2 = 'necessarily';
    const index = new IndexTree();
    index.insert(word1).insert(word2);
    const rootNode: IndexNode | undefined = index.root;
    expect(rootNode.childrenCount).toEqual(2);
  });
});


describe('index-tree finding', () => {

  test('Finding a word that is not in the tree returns 0 (empty index)', () => {
    const index = new IndexTree();
    expect(index.find('hello')).toEqual(0);
  });

  test('Finding a word that is not in the tree returns 0 (full index)', () => {
    const index = new IndexTree();
    index.insert('try').insert('to').insert('find').insert('me');
    expect(index.find('hello')).toEqual(0);
  });


  test('Finding a word that is in the tree returns the count of the word', () => {
    const index = new IndexTree();
    index.insert('hello');
    expect(index.find('hello')).toEqual(1);
  });

  test('Finding a word that has been inserted twice returns the count of the word', () => {
    const index = new IndexTree();
    index.insert('hello').insert('hello');
    expect(index.find('hello')).toEqual(2);
  });
});
