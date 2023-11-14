import fse from 'fs-extra';
import { IndexTree } from './index-tree';

/**
 * Create an index tree from a dictionary file containing one word per line
 * @param index - The Index to use to store the words from the file
 * @param filePath - the file path to read
 * @returns a promise with the number of words indexed
 */
export const indexFile = async (index: IndexTree, filePath: string): Promise<number> => {
  return fse.readFile(filePath, 'utf8')
  .then((data) => {
    let w = '';
    let wordCount = 0;
    for (let c of data) {
      if (c === '\n' && w.length > 0) {
        index.insert(w.toLowerCase());
        w = '';
        wordCount++;
      } else if (c !== '\n') {
        w += c;
      }
    }
    // Insert the last word
    if (w.length > 0) {
      index.insert(w.toLowerCase());
      wordCount++;
    }
    return wordCount;
  })
};


/**
 * Remove the character at the specified index from the source string
 * @param source - the source string
 * @param idx - the index of the character to remove (0-based)
 * @returns
 */
export const removeChar = (source: string, idx: number): string => {
  if (idx < 0 || idx >= source.length) {
    throw new Error(`Invalid index ${idx} for string ${source}`);
  }
  return source.slice(0, idx) + source.slice(idx + 1);
}

/**
 * Extract all characters from a word and create a list of tuples
 * containing the character and the remaining characters in the word
 * @param word - the word to extract characters from
 */
export const extractAllChars = (word: string): Array<[string, string]> => {
  return [...word].reduce<Array<[string, string]>>((acc, c, idx) => {
    const remaining = removeChar(word, idx);
    acc.push([c, remaining]);
    return acc;
  },
  []
  );
}