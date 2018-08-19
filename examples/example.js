const fs = require('fs');
const request = require('request-promise');
const codeToSVG = require('../src/index');

const url = 'https://raw.githubusercontent.com/basics/code-snippet-to-svg/blob/master/examples/example.js?range=1-18';
const uri = url.replace(/([\w-]*\/[\w-]*)(\/blob)/, '$1');

request({
  uri
}).then((code) => {
  const result = codeToSVG(code, 3, 7, 'js');
  fs.writeFile('./test.svg', result, (err) => {
    if (err) {
      return console.log(err);
    }
    return console.log('The file was saved!');
  });
});
