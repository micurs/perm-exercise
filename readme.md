# Finding Valid English words from an input string

## Build, Test and Interactive demo

We used `pnpm` to manage the dependencies in this project.

* `pnpm install` to get all the required dependencies.
* `pnpm build` to build the source files under `src`.
* `pnpm coverage` to build and run all the tests.
* `pnpm start` to run the interactive demo.

> The interactive demo reads the [`english-large.txt`](https://github.com/dwyl/english-words) dictionary with over 466k English words.

## Description of the algorithm

The findValidPermutations() function employs a novel approach to explore all possible words that can be formed from the letters of a given input string using the IndexTree structure, a specialized Trie. The function works as follows:

1. **Generation of Letter and Remaining String Pairs**: The algorithm starts by creating a list of pairs for each letter in the input string. Each pair consists of a single letter and the remaining string after removing that letter. For instance, the word "dog" results in the pairs [ ['d', 'og'], ['o', 'dg'], ['g', 'do'] ].

2. **Recursive Trie Traversal**: Each letter from these pairs is used to navigate the IndexTree. The algorithm selects the child node corresponding to the letter and passes the remaining string (the second item in the pair) for further recursive search. This step ensures that the algorithm explores different combinations starting from each letter of the input string.

3. **Collection of Valid Words**: During the recursive traversal, whenever a node with a value property (indicating a complete word) is encountered, this word is added to a Set of results. The use of a Set ensures that duplicate words are not included in the final output.

4. **Return of Results**: The function ultimately returns a collection of all unique words found in the IndexTree that can be formed from the input string's letters, considering all possible starting points and combinations.

For example, with the input "dog", the algorithm explores paths starting with 'd', 'o', and 'g', along with their respective remaining strings, enabling it to identify words like "dog", "god", "do", "go", etc.

This approach is efficient in exploring all possible word formations from various letter combinations in the input string, utilizing the Trie structure's inherent efficiency in managing and searching strings.


## Interactive console demo

Use `pnpm start` to run an interactive demo:

```bash
> node dist/index.js

Indexed 466550 words
Enter a word to search for: oogd
Found 17 valid words containing letters from "oogd":  [
  'o',    'oo',  'og',
  'ogo',  'od',  'odo',
  'g',    'go',  'goo',
  'good', 'god', 'gd',
  'd',    'do',  'doo',
  'dog',  'dg'
]
Enter a word to search for: #quit
```

Use the special keyword `#quit` to exit the demo.


