import { IndexNode, IndexTree } from "./index-tree";
import { extractAllChars } from "./utils";


/**
 * Search for words in the indexNode that contain the characters in the search word.
 * @param node - the node of the index tree to search
 * @param searchWord - the search word to find matches for
 * @param out - a Set containing the matches
 * @returns
 */
const searchValidCombinations = (node: IndexNode, searchWord: string, out: Set<string>) => {
  if (node.value) {
    out.add(node.value);
  }
  if (node.childrenCount===0) {
    return
  }
  // Extract all characters from the search word and iterate over them to
  // find matches starting with these characters.
  extractAllChars(searchWord).forEach(([char, remaining]) => {
    // search By Char
    const child = node.getChild(char);
    if (!child) {
      return;
    }
    if (remaining.length > 0) {
      searchValidCombinations(child, remaining, out);
    }
    // This child node represents a valid word so it is a match
    if (child.value) {
      out.add(child.value);
    }
  });
};

/**
 * Finds all valid permutations of the search word in the index
 * @param index
 * @param searchWord
 * @returns
 */
export const findValidPermutations = (index: IndexTree, searchWord: string): Set<string> => {
  const matches = new Set<string>();
  searchValidCombinations(index.root, searchWord, matches);
  return matches;
}

