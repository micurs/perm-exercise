import promptSync from 'prompt-sync';

import { IndexTree } from './index-tree';
import { indexFile } from './utils';
import { findValidPermutations } from './finder';

const index = new IndexTree();
const prompt = promptSync();

console.time('indexing');
indexFile(index, 'english-large.txt').then((count) => {
  console.timeEnd('indexing');
  console.log(`Indexed ${count} words`);

  let done = false;
  while (!done) {
    const searchWord = prompt('Enter a word to search for: ');
    if (searchWord && searchWord !== '#quit') {
      console.time('search');
      const matches = findValidPermutations(index, searchWord);
      console.timeEnd('search');
      console.log(`Found ${matches.size} valid words containing letters from "${searchWord}": `, [...matches.values()]);
    } else {
      done = true;
    }
  }
});
