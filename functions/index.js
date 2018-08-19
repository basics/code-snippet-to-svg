const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({ origin: true }));

exports.helloWorld = functions.https.onRequest((request, response) => {
  response.send('Hello from Firebase!');
});

app.get(['/:foo/:bar/*'], (req, res) => {
  res.send(req.path + req.params.foo);
});

exports.svg = functions.https.onRequest(app);
