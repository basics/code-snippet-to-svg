const ansiToSVG = require('ansi-to-svg');
const emphasize = require('emphasize');

function extract(content, min = 1, max) {
  return content
    .split('\n')
    .slice(min - 1, max)
    .join('\n');
}

function codeToSVG(code, min, max) {
  const extractedCode = extract(code, min, max);
  const highlightedCode = emphasize.highlightAuto(extractedCode);
  return ansiToSVG(highlightedCode.value);
}

module.exports = codeToSVG;
