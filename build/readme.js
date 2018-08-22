const glob = require('fast-glob');
const fs = require('fs');

const url = 'basics/code-snippet-to-svg/blob/master/examples/example.js';

function loadSchemeList() {
  return glob('*.itermcolors', {
    cwd: './schemes'
  });
}

function renderSchemeList(entries) {
  return entries.map((entry) => {
    const name = entry.replace(/(\.[\w]+)$/, '');
    return `
### scheme: ${name}
[![code preview](https://us-central1-code-snippet-to-svg.cloudfunctions.net/default/${url}?range=1-18&theme=${name}&cachebuster)](https://github.com/${url}#L1L18)
      `;
  });
}

function getSchemeInfo() {
  return loadSchemeList().then(entries => renderSchemeList(entries).join('\n'));
}

function getBlueprint() {
  return new Promise((resolve, reject) => {
    fs.readFile('./build/blueprint.md', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.toString());
    });
  });
}

Promise.all([getSchemeInfo(), getBlueprint()]).then(([schemes, head]) => {
  console.log(head);
  fs.writeFileSync('README.md', `${head}\n${schemes}`);
});
