const ansiToSVG = require('ansi-to-svg');
const emphasize = require('emphasize');

function extract(content, min = 1, max) {
  return content
    .split('\n')
    .slice(min - 1, max)
    .join('\n');
}

function highlightCode(code, lang) {
  console.log(lang);
  if (lang) {
    return emphasize.highlight(lang, code);
  }
  return emphasize.highlightAuto(code);
}

function codeToSVG(code, min, max, lang) {
  const extractedCode = extract(code, min, max);

  const highlightedCode = highlightCode(extractedCode, lang);
  return ansiToSVG(highlightedCode.value);
}

module.exports = codeToSVG;
