const ansiToSVG = require('ansi-to-svg');
const emphasize = require('emphasize');
const path = require('path');
const options = {
  fontSize: 12,
  lineHeight: 25.6,
  paddingTop: 0,
  paddingLeft: 10,
  paddingBottom: 10,
  paddingRight: 10
};

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

function modifySVG(svg) {    
  return svg.replace(/viewBox=\"([0-9\.]+), ([0-9\.]+), ([0-9\.]+), ([0-9\.]+)\"/, (match, g1, g2, g3, g4) => {
    return `height="${g4}" preserveAspectRatio="xMinYMax slice" viewBox="${g1}, ${g2}, 898, ${g4}"`;    
  }).replace(/(\<rect x=\"0\" y=\"0\" width=\")([0-9\.]+)(\")/, (match, g1, g2, g3) => {
    return [g1, 898, g3].join('');
  });  
}

function codeToSVG(code, range, { lang, theme = '3024.night' }) {
  const extractedCode = extract(code, range);
  const highlightedCode = highlightCode(extractedCode, lang);
  return modifySVG(ansiToSVG(highlightedCode.value, Object.assign(options, {    
    colors: path.resolve(__dirname, `../schemes/${theme}.itermcolors`)
  })));  
}

module.exports = codeToSVG;
