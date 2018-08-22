const glob = require('fast-glob');
const fs = require('fs');

const url = 'basics/code-snippet-to-svg/blob/master/examples/example.js';

Promise.all([
  glob('*.itermcolors', {
    cwd: './schemes'
  }).then(entries => entries
    .map((entry) => {
      const name = entry.replace(/(\.[\w]+)$/, '');
      return `[![code preview](https://us-central1-code-snippet-to-svg.cloudfunctions.net/default/${url}?range=1-18&theme=${name}&cachebuster)](https://github.com/${url}#L1L18)`;
    })
    .join('\n')),
  new Promise((resolve, reject) => {
    fs.readFile('./build/head.md', (err, data) => {
      if (err) {
        reject(err);
      }
      resolve(data.toString());
    });
  })
]).then(([schemes, head]) => {
  console.log(head);
  fs.writeFileSync('README.md', `${head}\n${schemes}`);
});
