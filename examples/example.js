const fs = require('fs');
const request = require('request-promise');
const codeToSVG = require('../src/index');

const url = 'https://raw.githubusercontent.com/GrabarzUndPartner/gp-vue-boilerplate/blob/master/src/store/index.js';
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
