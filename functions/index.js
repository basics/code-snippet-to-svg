process.env.FORCE_COLOR = 1;

const request = require('request-promise');
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const codeToSVG = require('@js-basics/code-snippet-to-svg');

const githubRawUrl = 'https://raw.githubusercontent.com';
const app = express();
app.use(cors({ origin: true }));

function getMinMax(value = '1') {
  return value.split('-');
}

function getCodeAsSVG(path, range = '1', lang = null) {
  const url = githubRawUrl + path;
  return request({ uri: url }).then((code) => {
    const [min, max] = getMinMax(range);
    return codeToSVG(code, min, max, lang);
  });
}

exports.test = functions.https.onRequest((req, res) => {
  const path = '/GrabarzUndPartner/gp-vue-boilerplate/master/src/components/molecules/LinkList.vue';
  getCodeAsSVG(path, req.query.range, req.query.lang).then((svg) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'no-cache');
    res.send(Buffer.from(svg));
  });
});

app.get(['/:foo/:bar/*'], (req, res) => {
  const path = req.path.replace(/([\w-]*\/[\w-]*)(\/blob)/, '$1');
  getCodeAsSVG(path, req.query.range, req.query.lang).then((svg) => {
    res.setHeader('Content-Type', 'image/svg+xml');
    res.setHeader('Cache-Control', 'no-cache');
    res.send(Buffer.from(svg));
  });
});

exports.default = functions.https.onRequest(app);
