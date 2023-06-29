/** Command-line tool to generate Markov text. */
const fs = require('fs');
const axios = require('axios');
const MarkovMachine = require('./markov');

// Read command-line arguments
const [, , sourceType, source] = process.argv;

// Function to handle errors
function handleError(error) {
  console.error('Error:', error.message);
  process.exit(1);
}

// Function to read file contents
function readFile(filename) {
  try {
    return fs.readFileSync(filename, 'utf8');
  } catch (error) {
    handleError(error);
  }
}

// Function to fetch content from URL
async function fetchURL(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (error) {
    handleError(error);
  }
}

// Immediately Invoked Async Function Expression (IIFE)
(async function () {
  // Determine the source and retrieve the content
  let content;
  if (sourceType === 'file') {
    content = readFile(source);
  } else if (sourceType === 'url') {
    content = await fetchURL(source);
  } else {
    console.error('Error: Invalid source type');
    process.exit(1);
  }

  // Create a MarkovMachine instance
  const mm = new MarkovMachine(content);

  // Generate and print the random text
  const generatedText = mm.makeText();
  console.log(generatedText);
})();
