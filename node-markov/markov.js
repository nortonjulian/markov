/** Textual markov chain generator */


class MarkovMachine {

  /** build markov machine; read in text.*/

  constructor(text) {
    let words = text.split(/[ \r\n]+/);
    this.words = words.filter(c => c !== "");
    this.makeChains();
  }

  /** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

  makeChains() {
    let chains = new Map();

    for (let i = 0; i < this.words.length; i++) {
      let word = this.words[i];
      let nextWord = this.words[i + 1] || null;

      if (chains.has(word)) {
        chains.get(word).push(nextWord);
      } else {
        chains.set(word, [nextWord]);
      }
    }

    this.chains = chains;
  }


  /** return random text from chains */

  makeText(numWords = 100) {
    let words = [];

    // Get a random starting word
    let startWord = Array.from(this.chains.keys())[Math.floor(Math.random() * this.chains.size)];
    words.push(startWord);

    while (words.length < numWords) {
      let lastWord = words[words.length - 1];
      let possibleNextWords = this.chains.get(lastWord);

      // If the lastWord has no possible next words, break the loop
      if (!possibleNextWords || possibleNextWords.length === 0) {
        break;
      }

      let nextWord = possibleNextWords[Math.floor(Math.random() * possibleNextWords.length)];
      words.push(nextWord);
    }

    return words.join(" ");
  }
}

module.exports = MarkovMachine;
