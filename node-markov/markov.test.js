const { MarkovMachine } = require('./markov');
const { expect } = require('chai');

describe('MarkovMachine', () => {
  describe('makeChains', () => {
    it('should set the markov chains correctly', () => {
      const text = 'the cat in the hat';
      const mm = new MarkovMachine(text);

      const expectedChains = new Map([
        ['the', ['cat', 'hat']],
        ['cat', ['in']],
        ['in', ['the']],
        ['hat', [null]],
      ]);

      expect(mm.chains).to.deep.equal(expectedChains);
    });
  });

  describe('makeText', () => {
    it('should generate random text of the specified length', () => {
      const text = 'the cat in the hat';
      const mm = new MarkovMachine(text);

      const generatedText = mm.makeText(3);
      const generatedWords = generatedText.split(' ');

      expect(generatedWords).to.have.lengthOf(3);
    });
  });
});
