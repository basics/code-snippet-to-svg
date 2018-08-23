const ansiToSVG = require('ansi-to-svg');
const emphasize = require('emphasize');
const path = require('path');

function extract(content, { min = 1, max }) {
  return content
    .split('\n')
    .slice(min - 1, max)
    .join('\n');
}

function highlightCode(code, lang = '') {
  if (emphasize.getLanguage(lang)) {
    return emphasize.highlight(lang, code);
  }
  return emphasize.highlightAuto(code);
}

function codeToSVG(code, range, { lang, theme = '3024.night' }) {
  const extractedCode = extract(code, range);
  const highlightedCode = highlightCode(extractedCode, lang);
  return ansiToSVG(highlightedCode.value, {
    fontSize: 16,
    lineHeight: 25.6,
    paddingTop: 10,
    paddingLeft: 10,
    paddingBottom: 10,
    paddingRight: 10,
    colors: path.resolve(__dirname, `../schemes/${theme}.itermcolors`)
  });
}

module.exports = codeToSVG;
