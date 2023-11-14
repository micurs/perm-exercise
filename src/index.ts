import { extractAllChars, indexFile } from './utils';
import { IndexNode, IndexTree } from './index-tree';
import promptSync from 'prompt-sync';
import { findValidPermutations } from './finder';

const index = new IndexTree();
const prompt = promptSync();

indexFile(index, 'english-large.txt')
.then((count) => {
  console.log(`Indexed ${count} words`);
  let done = false;
  while(!done) {
    const searchWord = prompt('Enter a word to search for: ');
    if (searchWord && searchWord !== '#quit') {
      console.time('search');
      const matches = findValidPermutations(index, searchWord);
      console.timeEnd('search');
      console.log(`Found ${matches.size} valid words containing letters from "${searchWord}": `, [...matches.values()]);
    } else {
      done = true;
    }
  };

});

