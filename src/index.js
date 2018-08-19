const ansiToSVG = require('ansi-to-svg');
const emphasize = require('emphasize');
// const fs = require('fs');
// const request = require('request');

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

// request(
//   'https://raw.githubusercontent.com/GrabarzUndPartner/gp-vue-boilerplate/master/src/store/index.js',
//   (error, resp) => {
//     const result = codeToSVG(resp.body, 3, 7);
//     fs.writeFile('./test.svg', result, (err) => {
//       if (err) {
//         return console.log(err);
//       }

//       return console.log('The file was saved!');
//     });
//   }
// );
