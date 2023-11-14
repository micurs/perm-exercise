export class IndexNode {
  private _children: Map<string, IndexNode> = new Map();
  private _value: string | null = null; // null means the path to this node is not a word
  private _count: number = 0;           // Number of time the word was inserted

  /**
   * Get the value of this node.
   * The value is null if the path to this node is not a word.
   */
  get value(): string | null {
    return this._value;
  }

  /**
   * Get the number of times the word was inserted
   * @remarks
   * This value is only valid for word nodes (ie. nodes where value !== null)
   */
  get count(): number {
    return this._count;
  }

  /**
   * Return the list of child nodes for this node as a iterable collection
   */
  get childrenList() {
    return this._children.values();
  }

  /**
   * Get the number of child nodes for this node
   */
  get childrenCount(): number {
    return this._children.size;
  }

  /**
   * Determine if this node has a child node for the given character
   * @param char - the char index of the child node
   * @returns true if the child node exists, false otherwise
   */
  hasChild(char: string): boolean {
    return this._children.has(char);
  }

  /**
   * Retrieve a child node by character
   * @param char - the character index of the child node
   * @returns a child node or undefined if the child node does not exist
   */
  getChild(char: string): IndexNode | undefined {
    return this._children.get(char);
  }

  /**
   * Add a child node to this node
   * @remarks
   * This method replaces an existing child node if it exists.
   * @param char - the character to add as a child node
   * @returns the new child node
   */
  addChild(char: string): IndexNode {
    const node = new IndexNode();
    this._children.set(char, node);
    return node;
  }

  /**
   * Set the value of this node as a word node (i.e. the path to this node is a word)
   * @param value - the string value of the word
   * @returns the same node
   */
  setValue(value: string): IndexNode {
    this._value = value;
    this._count++;
    return this;
  }

  /**
   * Scan the tree and return the number of words indexed in it.
   * @returns the number of words indexed in the tree
   */
  wordCount(): number {
    let count = this._count;
    for( let node of this.childrenList) {
      count += node.wordCount();
    }
    return count;
  }

}

/**
 * A prefix-tree that can be used to index words from a dictionary and search for them.
 */
export class IndexTree {
  private _root: IndexNode = new IndexNode();

  constructor() {
  }

  insert(word: string): IndexTree {
    let node = this._root;
    // Add each letter of the word to the tree as a node
    for (const char of word) {
      if (!node.hasChild(char)) {
        node.addChild(char);
      }
      node = node.getChild(char)!;
    }
    node.setValue(word);
    return this;
  }

  get root(): IndexNode  {
    return this._root;
  }

  wordCount(): number {
    return this._root.wordCount();
  }

  find(word: string): number {
    let node = this._root;
    for (const char of word) {
      if (!node.hasChild(char)) {
        return 0;
      }
      node = node.getChild(char)!;
    }
    return node.value===word ? node.count : 0;
  }
}

